'use client';

import { SessionProvider } from "next-auth/react"

import './globals.css'
import { Inter, Montserrat  } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const montserrat = Montserrat({
  weight: ['400' , '500'],
  subsets: ['latin']
})

export const metadata = {
  title: 'CropTrace',
  description: 'Know more about you local products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}
