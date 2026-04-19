import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperMedBot Simulator",
  description: "Medical Board Exam Simulator",
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-brand-light text-brand-dark font-body">
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
