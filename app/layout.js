import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "sonner";
import MusicProvider from "@/components/music-provider";
import { useEffect } from "react";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "RevMusic",
  description: "Next.js 14 Music Web - Rev666.",
  icons: "/fav/favicon.png",
  manifest: "/manifest.json",
};

function ZoomBlocker() {
  useEffect(() => {
    // 1. Add viewport meta to disable pinch zoom (iOS + Android)
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(meta);

    // 2. Prevent zoom by Ctrl/Cmd + scroll or keys
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    const preventGesture = (e) => e.preventDefault();

    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key)) {
        e.preventDefault();
      }
    });
    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });

    // 3. Stop iOS zoom when focusing inputs
    const preventIOSZoomOnFocus = (e) => {
      e.target.style.fontSize = "16px";
    };
    document.querySelectorAll("input, textarea, select").forEach((el) => {
      el.addEventListener("focus", preventIOSZoomOnFocus);
    });

    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.querySelectorAll("input, textarea, select").forEach((el) => {
        el.removeEventListener("focus", preventIOSZoomOnFocus);
      });
    };
  }, []);

  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bricolage_grotesque.className}>
        <ZoomBlocker /> {/* 👈 Zoom prevention runs globally */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="hsl(var(--primary))"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px hsl(var(--primary)),0 0 15px hsl(var(--primary))"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
              <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <MusicProvider>
            {children}
          </MusicProvider>
          <Toaster position="top-center" visibleToasts={1} />
        </ThemeProvider>
      </body>
    </html>
  );
}
