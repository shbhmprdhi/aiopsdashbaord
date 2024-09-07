import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Dashboard for AIOps",
  description: "Custom Dashboard for AIOps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="dashboard-theme"
            // disableTransitionOnChange
          >
            <Navbar/>
            <section className="pt-24 flex">
              <div className="h-[100vh] mx-4">
                <Sidebar/>
              </div>
              <div className="p-5 w-full max-w-[90%]">
                {children}
              </div>
            </section>
          </ThemeProvider>
      </body>
    </html>
  );
}
