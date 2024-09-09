import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";


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
