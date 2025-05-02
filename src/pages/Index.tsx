
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { toast } from "sonner";
import { useEffect } from "react";

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Welcome toast
    toast.success("Welcome to QR Codemz!");
    
    // Notify users their preferences will be saved
    setTimeout(() => {
      toast.info("Your preferences are automatically saved");
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-10">
      {/* Header */}
      <header className="w-full py-6 md:py-8 px-4 md:px-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="gradient-purple text-white font-bold text-xl p-2 rounded-lg mr-3">
              QR
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              QR Codemz
            </h1>
          </div>

          <div className="flex items-center space-x-2">

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 md:py-10 animate-fade-in">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Create Beautiful, Custom QR Codes
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Design pixel-perfect QR codes with advanced customization options for
              colors, shapes, and logos.
            </p>
          </section>

          {/* QR Code Generator */}
          <section>
            <QRCodeGenerator />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mt-20 px-4 py-6 text-center text-sm text-muted-foreground">
      <p className="text-sm text-muted-foreground">
        Created with ❤️ by{" "}
        <a
          href="https://mohamed.codemz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          Mohamed Hamed
        </a>
      </p>
        <p>© 2025 QR Codemz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
