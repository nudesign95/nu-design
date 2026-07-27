import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'NU-Design | Portfolio & Creative Studio',
  description: 'Design by Garic Edume',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${poppins.variable} font-sans min-h-screen flex flex-col justify-between bg-[#050000] text-zinc-100 selection:bg-red-500 selection:text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}