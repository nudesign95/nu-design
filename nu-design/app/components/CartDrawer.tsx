'use client';

import { useState } from 'react';
import { ShoppingBag, X, Trash2, ShieldCheck, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export interface CartItem {
  id: string;
  name: string;
  code: string;
  price: number;
  preview_url: string;
  formats: string[];
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  theme: 'dark' | 'light';
  lang: 'ES' | 'EN' | 'FR';
}

const translations = {
  ES: {
    cartTitle: 'Tu Carrito Digital',
    emptyCart: 'Tu carrito está vacío.',
    emptyCartSub: 'Explora nuestro catálogo y agrega tus vectores o ilustraciones preferidas.',
    itemFixedQty: 'Licencia Digital (x1)',
    subtotal: 'Total Estimado',
    termsLabel: 'He leído detenidamente los formatos y acepto que debo ajustar el tamaño del arte en mi programa de diseño antes de imprimir.',
    termsAlert: 'Por favor, marca la casilla de términos para proceder con el pedido.',
    checkoutWhatsapp: 'Confirmar e Indicar Pago vía WhatsApp',
    securePurchase: 'Proceso de descarga inmediata post-confirmación.',
  },
  EN: {
    cartTitle: 'Your Digital Cart',
    emptyCart: 'Your cart is empty.',
    emptyCartSub: 'Explore our catalog and add your preferred vectors or illustrations.',
    itemFixedQty: 'Digital License (x1)',
    subtotal: 'Estimated Total',
    termsLabel: 'I have carefully reviewed the formats and agree that I must resize the artwork in my design software before printing.',
    termsAlert: 'Please check the terms box to proceed with your order.',
    checkoutWhatsapp: 'Confirm & Notify via WhatsApp',
    securePurchase: 'Instant download process upon payment confirmation.',
  },
  FR: {
    cartTitle: 'Votre Panier Numérique',
    emptyCart: 'Votre panier est vide.',
    emptyCartSub: 'Explorez notre catalogue et ajoutez vos vectoriels ou illustrations préférés.',
    itemFixedQty: 'Licence Numérique (x1)',
    subtotal: 'Total Estimé',
    termsLabel: 'J\'ai lu attentivement les formats et j\'accepte de devoir ajuster la taille du motif dans mon logiciel de création avant l\'impression.',
    termsAlert: 'Veuillez cocher la case des conditions pour valider votre commande.',
    checkoutWhatsapp: 'Confirmer et Payer via WhatsApp',
    securePurchase: 'Téléchargement immédiat après confirmation.',
  }
};

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onClearCart,
  theme,
  lang,
}: CartDrawerProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const t = translations[lang];

  const totalDOP = cart.reduce((sum, item) => sum + item.price, 0);
  // Conversión estimada a USD para PayPal
  const totalUSD = (totalDOP / 60).toFixed(2);

  // Checkout vía WhatsApp
  const handleWhatsappCheckout = () => {
    if (!acceptedTerms) {
      alert(t.termsAlert);
      return;
    }

    let message = `*NUEVA ORDEN DE TIENDA - NU-DESIGN*\n\n`;
    message += `*Ítems solicitados:* (${cart.length})\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* [${item.code}]\n   Formatos: ${item.formats.join(', ')}\n   Precio: RD$ ${item.price.toFixed(2)}\n\n`;
    });

    message += `*Total a Pagar:* RD$ ${totalDOP.toFixed(2)}\n\n`;
    message += `_Confirmo que he leído los formatos y términos para la edición del tamaño del arte._`;

    const whatsappUrl = `https://wa.me/18294608316?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
        currency: 'USD',
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo Oscuro / Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Lateral Slide-Over */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-full w-full max-w-md z-50 p-6 flex flex-col justify-between shadow-2xl border-l ${
                theme === 'dark'
                  ? 'bg-[#0a0507] border-white/10 text-zinc-100'
                  : 'bg-white border-zinc-300 text-zinc-900'
              }`}
            >
              {/* Header del Carrito */}
              <div className="flex items-center justify-between border-b border-zinc-500/20 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-black">{t.cartTitle} ({cart.length})</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de Ítems */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3 opacity-60">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                    <p className="font-bold text-base">{t.emptyCart}</p>
                    <p className="text-xs max-w-xs mx-auto leading-relaxed">{t.emptyCartSub}</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center gap-4 relative group ${
                        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative">
                        <img src={item.preview_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black text-red-500 block">{item.code}</span>
                        <h4 className="font-bold text-sm truncate">{item.name}</h4>
                        <p className="text-[11px] opacity-60 mt-0.5">{t.itemFixedQty}</p>
                        <p className="text-sm font-black text-emerald-500 mt-1">RD$ {item.price.toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-2 hover:bg-red-500/20 hover:text-red-500 text-zinc-400 rounded-lg transition"
                        title="Eliminar del carrito"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer con Términos y Procesamiento de Pago */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-500/20 pt-4 space-y-4">
                  <div className="flex justify-between items-center text-lg font-black">
                    <span>{t.subtotal}:</span>
                    <span className="text-emerald-500">RD$ {totalDOP.toFixed(2)}</span>
                  </div>

                  {/* Checkbox Obligatorio de Términos */}
                  <div
                    onClick={() => setAcceptedTerms(!acceptedTerms)}
                    className={`p-3 rounded-xl border cursor-pointer text-xs flex items-start gap-3 transition ${
                      acceptedTerms
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-red-500/30 bg-red-500/5 hover:border-red-500/60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-red-500">
                      {acceptedTerms ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                    <p className="leading-relaxed opacity-90 select-none">
                      {t.termsLabel}
                    </p>
                  </div>

                  {/* Botones de Procesamiento Dual */}
                  <div className="space-y-3 pt-1">
                    {/* Botón de PayPal Interactivo cuando se aceptan los términos */}
                    {acceptedTerms ? (
                      <div className="z-0">
                        <PayPalButtons
                          style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              intent: 'CAPTURE',
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: 'USD',
                                    value: totalUSD,
                                  },
                                  description: `Nu-Design Store - ${cart.length} item(s)`,
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            if (actions.order) {
                              const details = await actions.order.capture();
                              const firstItem = cart[0];
                              // Redirección a la página de éxito tras confirmar el cobro real
                              window.location.href = `/tienda/success?item_id=${firstItem.id}&order_id=${details.id}`;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-center text-xs text-zinc-400">
                        Acepta los términos para habilitar el pago con PayPal
                      </div>
                    )}

                    {/* Opción WhatsApp */}
                    <button
                      onClick={handleWhatsappCheckout}
                      disabled={!acceptedTerms}
                      className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                        acceptedTerms
                          ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 cursor-pointer'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span>{t.checkoutWhatsapp}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[10px] text-center opacity-50 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                    {t.securePurchase}
                  </p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </PayPalScriptProvider>
  );
}