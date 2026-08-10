export type Language = 'ES' | 'EN' | 'FR';

export const translations = {
  ES: {
    nav: {
      home: 'Inicio',
      portfolio: 'Portafolio',
      hire: 'Contratar',
      contact: 'Contacto',
      utilities: 'Utilidades',
      quote: 'Cotización',
    },
    utilities: {
      title: 'Simulador de Pliegos & Multi-Impresión',
      subtitle: 'Calcula y visualiza la cantidad exacta de piezas que rinde tu pliego de papel',
      dpiChecker: 'Verificador de Resolución / DPI',
      cmykSimulator: 'Simulador RGB → CMYK (Gama de Color)',
    },
  },
  EN: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      hire: 'Hire Us',
      contact: 'Contact',
      utilities: 'Utilities',
      quote: 'Get Quote',
    },
    utilities: {
      title: 'Sheet & Multi-Print Simulator',
      subtitle: 'Calculate and visualize exact yield per paper sheet',
      dpiChecker: 'Resolution / DPI Checker',
      cmykSimulator: 'RGB → CMYK Color Gamut Simulator',
    },
  },
  FR: {
    nav: {
      home: 'Accueil',
      portfolio: 'Portfolio',
      hire: 'Engager',
      contact: 'Contact',
      utilities: 'Outils',
      quote: 'Devis',
    },
    utilities: {
      title: 'Simulateur de Feuilles & Multi-Impression',
      subtitle: 'Calculez et visualisez le rendement exact par feuille de papier',
      dpiChecker: 'Vérificateur de Résolution / DPI',
      cmykSimulator: 'Simulateur Gamme de Couleurs RGB → CMYK',
    },
  },
};