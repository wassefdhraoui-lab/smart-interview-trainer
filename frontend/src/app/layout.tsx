import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
  
export const metadata: Metadata = {
  title: "Smart Interview Trainer",
  description: "Interview training app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        
      </body>
    </html>
  );
}