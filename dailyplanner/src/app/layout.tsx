import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
     title: "Timetable",
     description: "A simple timetable app.",
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body>{children}</body>
          </html>
     );
}
