import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OnekoCat from "../components/OnekoCat";
import TitleWatcher from "../components/TitleWatcher";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Utkal",
  description: "The coolest portfolio you've ever seen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`}>
        <TitleWatcher />
        {children}
        <OnekoCat />
      </body>
    </html>
  );
}
