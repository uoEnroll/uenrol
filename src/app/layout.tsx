import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "uEnroll",
  description: "A modern course selection tool for uOttawa students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "w-[90%]",
        }}
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
