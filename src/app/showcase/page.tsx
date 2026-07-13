export default function ShowcasePage() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-text-primary">
                Showcase
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
                Explore beautiful applications and projects built using MOBOUI components.
                Our community is creating amazing experiences.
            </p>
            <div className="mt-8 p-12 border border-border-subtle rounded-2xl bg-bg-surface/50 w-full flex items-center justify-center">
                <p className="text-text-muted font-mono text-sm">More showcases coming soon.</p>
            </div>
        </div>
    );
}
