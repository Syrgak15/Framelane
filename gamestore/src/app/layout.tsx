import "./globals.css";
import {Comfortaa} from 'next/font/google'
import React from 'react'
import Header from '../components/header/header';
import Reviews from "../floating-widgets/reviews/reviews";
import Wishlists from "../floating-widgets/wishlists/wishlists";
import { ReduxProvider } from '../app/provider/provider';
import Footer from "../components/footer/footer";
import Newsletter from "../components/newsletter/newsletter";


export const comfortaa = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={comfortaa.className}>
    <body
        className="global-wrapper"
    >
    <ReduxProvider>
      <Header/>
      {children}
      <Reviews/>
      <Wishlists/>
      <Newsletter/>
      <Footer/>
    </ReduxProvider>
    </body>
    </html>
  );
}
