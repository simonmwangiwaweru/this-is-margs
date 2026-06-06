import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollReveal from "@/components/ScrollReveal";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "THIS IS MARGS | Premium Health & Wellness Supplements",
  description:
    "Kenya's premier health supplement shop. Alkaline water products, vitamins, detox, immunity boosters and gut health solutions. Fuel your body. Elevate your life.",
  keywords:
    "health supplements Kenya, alkaline water, vitamins, detox, immunity boosters, gut health, moringa, Nairobi health shop",
  openGraph: {
    title: "THIS IS MARGS | Premium Health & Wellness",
    description: "Fuel your body. Elevate your life. Kenya's finest health supplements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
