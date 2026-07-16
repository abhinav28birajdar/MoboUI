import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <div className="bg-primary/10 p-4 rounded-full mb-4 animate-spin">
                <Loader2 size={32} className="text-primary" />
            </div>
            <p className="text-muted-foreground animate-pulse text-sm font-bold uppercase tracking-widest">
                Initializing MobileUI...
            </p>
        </div>
    );
}
