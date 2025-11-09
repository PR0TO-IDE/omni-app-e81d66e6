import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RideConnect Minimal",
  description: "A minimalist, light-first RideConnect experience",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <div className="mx-auto max-w-md px-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
