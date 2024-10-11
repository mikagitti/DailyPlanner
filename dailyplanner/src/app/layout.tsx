import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css"; //Note! Using css files in this order. Globals.css overwrites bootstrap styles.


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
