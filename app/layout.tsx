import React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "H.V. Electricals & Engineering Services - Solar Products",
  description:
    "Authorized Renew Power Dealer providing solar panels, inverters, ACDB-DCDB boxes, cables, and solar structures",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
