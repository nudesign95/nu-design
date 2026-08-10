'use client';
import Image from 'next/image';
import Link from 'next/link';

interface WordmarkLogoProps {
  className?: string;
}

export default function WordmarkLogo({ className = 'h-6 sm:h-8 w-auto' }: WordmarkLogoProps) {
  return (
    <Link href="/" className="flex items-center shrink-0 hover:opacity-85 transition-opacity">
      <Image
        src="/wordmark-blanco.svg"
        alt="NU-DESIGN Agency"
        width={160}
        height={36}
        className={`${className} object-contain dark:invert-0 invert transition-all duration-300`}
        priority
      />
    </Link>
  );
}