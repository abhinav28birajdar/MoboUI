import { cn } from "@/lib/utils/cn";

interface NeonDividerProps {
    className?: string;
    vertical?: boolean;
    glow?: boolean;
}

export const NeonDivider = ({
    className,
    vertical = false,
    glow = true,
}: NeonDividerProps) => {
    return (
        <div
            className={cn(
                "relative",
                vertical ? "h-full w-px" : "h-px w-full",
                "bg-gradient-to-r from-transparent via-neutral-800 to-transparent",
                className
            )}
        >
            {glow && (
                <div
                    className={cn(
                        "absolute inset-0 bg-amber-500/50 blur-[2px]",
                        vertical ? "w-[2px]" : "h-[2px]"
                    )}
                />
            )}
        </div>
    );
};
