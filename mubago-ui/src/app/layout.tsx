import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mubago",
  description: "Secure Google Sign-in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}