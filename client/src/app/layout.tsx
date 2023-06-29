import './globals.css'
import { Inter, Quicksand  } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const quicksand = Quicksand({
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
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  )
}
