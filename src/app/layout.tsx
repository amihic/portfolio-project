import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Aleksa Mihic | Software Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
