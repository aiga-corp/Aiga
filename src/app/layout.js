"use client"
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import dynamic from 'next/dynamic'



const DynamicProviders = dynamic(
  () => import('./components/providers/index'),
  { ssr: false }
)



export default function RootLayout({ children }) {


  return (

      <html lang="en" suppressHydrationWarning>
        <head>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
  <link rel="manifest" href="/site.webmanifest"/>

      <meta name="description" content="Voidback - Create communities and contribute to machine learning models all from your browser." />
      <meta name="keywords" content="Voidback, Rooms, In Browser AI, In Browser Machine Learning, Models, ML, AI, Communities, Discussions " />

  </head>

        <body>

          <main>
           <DynamicProviders>
              {children}
            </DynamicProviders>
          </main>

          <Toaster />

        </body>

      </html>
  );
}
