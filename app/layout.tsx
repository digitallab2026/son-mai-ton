import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sơn Chống Nóng Gold Rober Thăng Long JV - Hạ Nhiệt 5-25°C",
  description: "Giải pháp bảo vệ công trình kiên cố chống dột thấm và bức xạ ánh nắng tối đa từ Sơn Thăng Long.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`scroll-smooth ${montserrat.variable}`}>
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}

