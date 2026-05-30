import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Home, Layers } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[150px] -z-10 rounded-full pointer-events-none" />

            <div className="bg-primary/10 p-8 rounded-full mb-8 animate-float border border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <Ghost size={64} className="text-primary" />
            </div>

            <h1 className="text-8xl md:text-9xl font-heading font-black mb-4 text-primary tracking-tighter drop-shadow-2xl">
                404
            </h1>

            <h2 className="text-3xl font-heading font-bold mb-4 text-white uppercase  tracking-widest">
                Page Not Found
            </h2>

            <p className="text-neutral-400 mb-10 max-w-md mx-auto text-lg">
                The component or page you are looking for has evaporated into the digital ether.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary flex items-center gap-2 px-8 h-12 text-base cursor-pointer">
                    <Link href="/"><Home className="w-4 h-4" /> Go Home</Link>
                </Button>
                <Button asChild variant="outline" className="btn-secondary flex items-center gap-2 px-8 h-12 text-base border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer">
                    <Link href="/components"><Layers className="w-4 h-4" /> Browse Library</Link>
                </Button>
            </div>
        </div>
    );
}
