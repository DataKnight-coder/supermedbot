import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperMedBot Simulator",
  description: "Medical Board Exam Simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-clinical-50 text-clinical-800">
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
