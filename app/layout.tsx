import type { Metadata } from "next";
import { Jost, Crimson_Text } from "next/font/google";
import "./globals.css";
import { GlobalCursor } from "@/components/cursor";
import { Navbar } from "@/components/Navbar";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

const headingFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bodyFont = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: "Sneha Sharma | Product Designer",
  description: "Portfolio of Sneha Sharma",
};

