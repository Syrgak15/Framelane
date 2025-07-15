import "./globals.css";
import React from 'react'
import Header from '@/components/header/header';
import Head from 'next/head'
import Reviews from "@/floating-widgets/reviews/reviews";
import Wishlists from "@/floating-widgets/wishlists/wishlists";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
    <Head>
        <link
            href="@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Inconsolata:wght@200..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');"
            rel="stylesheet"
        />
    </Head>
    <body
        className="global-wrapper"
    >
      <Header/>
      {children}
      <Reviews/>
      <Wishlists/>
    </body>
    </html>
  );
}
