import type { Metadata } from 'next';
import { Fredoka, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sweet House Candy Store 🍭 | Cajas de Dulces, Chocolates y Golosinas',
  description: 'Tienda en línea de dulces, gomitas y chocolates gourmet en cajas sorpresa. Más de 100 cajas con efectos visuales y confeti.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fredoka.variable} ${outfit.variable}`}>
      <body className="bg-white text-stone-900 antialiased min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

