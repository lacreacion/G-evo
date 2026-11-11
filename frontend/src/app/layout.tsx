import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'G-evo | Tarjetas Digitales Inteligentes & Catálogos E-commerce Autónomos',
  description: 'Ecosistema de digitalización comercial de alto impacto. Tarjetas inteligentes con tecnología URL y QR dinámico, catálogos e-commerce autogestionables y agentes de soporte con Inteligencia Artificial 24/7.',
  keywords: ['tarjetas digitales', 'catálogos virtuales', 'url', 'qr dinámico', 'e-commerce whatsapp', 'inteligencia artificial soporte', 'g-evo'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'G-evo | Ecosistema Comercial de Nueva Generación',
    description: 'Haz que tu negocio evolucione con tarjetas URL/QR de lujo y catálogos e-commerce autónomos.',
    url: 'https://g-evo.com',
    siteName: 'G-evo',
    locale: 'es_CO',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen gevo-forest-bg text-[#F3F4F6] selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
