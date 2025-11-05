import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Consultas de Nutrición - Reservas Online',
  description: 'Reserva tu consulta de nutrición online. Primera visita, seguimiento y consultas especializadas.',
  keywords: 'nutrición, consultas, reservas online, dieta, salud',
  authors: [{ name: 'Tu Nombre' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Consultas de Nutrición - Reservas Online',
    description: 'Reserva tu consulta de nutrición online. Primera visita, seguimiento y consultas especializadas.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultas de Nutrición - Reservas Online',
    description: 'Reserva tu consulta de nutrición online. Primera visita, seguimiento y consultas especializadas.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-neutral-50 font-sans antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}