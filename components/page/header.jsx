"use client";
import { useEffect } from "react";
import { ModeToggle } from "../ModeToggle";
import Logo from "./logo";
import { Button } from "../ui/button";
import Search from "./search";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const path = usePathname();

    useEffect(() => {
        // 1. Add viewport meta tag to block pinch zoom on mobile (iOS/Android)
        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(meta);

        // 2. Prevent zoom on desktop (Ctrl + scroll, Ctrl + +/-) & touch gesture zoom
        const preventZoom = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };
        const preventGesture = (e) => e.preventDefault();

        document.addEventListener("wheel", preventZoom, { passive: false });
        document.addEventListener("keydown", (e) => {
            if (
                (e.ctrlKey || e.metaKey) &&
                (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")
            ) {
                e.preventDefault();
            }
        });
        document.addEventListener("gesturestart", preventGesture, { passive: false });
        document.addEventListener("gesturechange", preventGesture, { passive: false });

        return () => {
            document.removeEventListener("wheel", preventZoom);
            document.removeEventListener("gesturestart", preventGesture);
            document.removeEventListener("gesturechange", preventGesture);
        };
    }, []);

    return (
        <header className="grid gap-2 pt-5 px-5 pb-5 md:px-20 lg:px-32">
            <div className="flex items-center sm:justify-between w-full gap-2">
                {path === "/" ? (
                    <div className="flex items-center gap-1">
                        <Logo />
                        <ModeToggle />
                    </div>
                ) : (
                    <div className="flex justify-between w-full items-center gap-1">
                        <Logo />
                        <Button
                            className="rounded-full sm:hidden h-8 px-3"
                            asChild
                        >
                            <Link href="/" className="flex items-center gap-1">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </Link>
                        </Button>
                    </div>
                )}
                <div className="hidden sm:flex items-center gap-3 w-full max-w-md">
                    <Search />
                    {path !== "/" && (
                        <Button className="h-10 px-3" asChild>
                            <Link href="/" className="flex items-center gap-1">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
