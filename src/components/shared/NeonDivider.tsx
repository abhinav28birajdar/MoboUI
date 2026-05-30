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
                "bg-border",
                className
            )}
        >
            {glow && (
                <div
                    className={cn(
                        "absolute inset-0 bg-primary/30 blur-[2px]",
                        vertical ? "w-[2px]" : "h-[2px]"
                    )}
                />
            )}
        </div>
    );
};
