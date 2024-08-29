import React from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import '../app/globals.css';
import { Footer } from './Footer';

export const metadata = {
  title: 'Ev 2',
  description: 'Dashboard Evolução Sistemas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <div className='mb-[57px]'>
            {children}
          </div>
       </AuthProvider>
      </body>

    </html>
  )
}
