import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restaurant Booking Manager",
  description: "Manage your restaurant table bookings efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body style={{ backgroundColor: '#f5f5f5', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
