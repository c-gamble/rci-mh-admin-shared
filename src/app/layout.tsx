export const metadata = {
  title: 'RCI Mental Health Admin'
}

import './global.css';
import Navbar from "@/components/navbar"
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/assets/favicon.ico" />
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
