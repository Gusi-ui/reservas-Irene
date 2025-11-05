'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50 border-b border-neutral-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Irene Nutrición
              </span>
              <span className="text-xs text-neutral-500 -mt-1">Bienestar Integral</span>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-neutral-900 hover:text-primary-600 transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-neutral-900 hover:text-primary-600 transition-colors duration-200"
          >
            Sobre Mí
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold leading-6 text-neutral-900 hover:text-primary-600 transition-colors duration-200"
          >
            Servicios
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold leading-6 text-neutral-900 hover:text-primary-600 transition-colors duration-200"
          >
            Contacto
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            href="/booking"
            className="btn btn-secondary"
          >
            Reservar Consulta
          </Link>
          <Link
            href="/booking"
            className="btn btn-primary"
          >
            Agendar Ahora
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Link
            href="/booking"
            className="btn btn-primary btn-sm"
          >
            Reservar
          </Link>
        </div>
      </nav>
    </header>
  );
}