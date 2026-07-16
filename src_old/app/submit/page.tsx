export default function SubmitPage() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-text-primary">
                Submit a Component
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
                Have you built something amazing with MOBOUI? Submit your component or showcase to be featured on our platform.
            </p>
            <div className="mt-8 p-12 border border-border-subtle rounded-2xl bg-bg-surface/50 w-full max-w-md flex flex-col gap-4 items-center justify-center">
                <p className="text-text-muted font-mono text-sm mb-4">Submission form is currently under construction.</p>
                <button className="px-6 py-3 bg-accent text-white font-bold rounded-lg uppercase tracking-widest text-xs opacity-50 cursor-not-allowed">
                    Coming Soon
                </button>
            </div>
        </div>
    );
}
