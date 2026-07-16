export function PlaygroundLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row overflow-hidden">
            {children}
        </div>
    );
}
