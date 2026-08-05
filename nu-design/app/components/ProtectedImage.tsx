'use client';
import Image, { ImageProps } from 'next/image';

interface ProtectedImageProps extends ImageProps {
  wrapperClassName?: string;
}

export default function ProtectedImage({ wrapperClassName = '', alt, ...props }: ProtectedImageProps) {
  return (
    <div className={`relative overflow-hidden select-none pointer-events-auto ${wrapperClassName}`}>
      {/* Imagen real protegida contra arrastre */}
      <Image
        {...props}
        alt={alt}
        draggable={false}
        className={`${props.className || ''} pointer-events-none select-none`}
      />
      {/* Capa invisible (Overlay) encima de la foto */}
      <div 
        className="absolute inset-0 z-10 bg-transparent select-none cursor-default"
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
    </div>
  );
}