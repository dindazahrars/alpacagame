import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpaca Mental Wellness Journey",
  description:
    "Game cerita interaktif berbahasa Indonesia bersama Alpa si alpaca chibi untuk refleksi kesehatan mental yang lembut dan hangat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
