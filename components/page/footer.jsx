"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Footer() {
    useEffect(() => {
        // Add viewport meta to disable pinch zoom on mobile
        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(meta);

        // Prevent zoom on desktop (Ctrl/Cmd + scroll or keys)
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

        // Prevent iOS zoom on input focus
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

    return (
        <footer className="py-5 backdrop-blur-3xl mt-8 px-6 md:px-20 lg:px-32">
            <p className="text-sm text-muted-foreground">
                Built for Personal purpose. Made with ❤︎ by{" "}
                <a
                    className="underline no-underline text-primary hover:text-primary"
                    href="https://github.com/ItsIsmailRobin"
                >
                    Rev666
                </a>.
            </p>
            <div className="flex gap-3 items-center mt-3">
                <Link
                    target="_blank"
                    className="text-sm opacity-80 font-light underline no-underline hover:opacity-100"
                    href="https://rev71.netlify.app/"
                >
                    Rev Portfolio
                </Link>
                <Link
                    target="_blank"
                    className="text-sm opacity-80 font-light underline no-underline hover:opacity-100"
                    href="https://instagram.com/ig_ismailrobin"
                >
                    Instagram
                </Link>
            </div>
        </footer>
    );
}
