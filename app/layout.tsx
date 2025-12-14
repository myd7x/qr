import Navbar from "@/components/Navbar";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <ScrollProgress />
         <CustomCursor/>
        <Navbar />
        <main className="pt-20">{children}</main>
         <Footer />
      </body>
    </html>
  );
}
