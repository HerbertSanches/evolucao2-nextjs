import React from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import '../app/globals.css';
import { Footer } from './Footer';
import Head from 'next/head';

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
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head> */}
      <body>
        <AuthProvider>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <div className='mb-[57px]'>
            {children}
          </div>
       </AuthProvider>
      </body>

    </html>
  )
}
