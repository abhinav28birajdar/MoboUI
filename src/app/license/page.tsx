export default function LicensePage() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-[60vh] max-w-4xl space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-text-primary">
                    License
                </h1>
                <p className="text-text-secondary text-lg">
                    Information regarding the usage, distribution, and modification of MOBOUI components.
                </p>
            </div>
            
            <div className="space-y-6 text-text-secondary leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-text-primary">Standard License</h2>
                    <p>
                        MOBOUI provides a standard commercial license for all components. You are permitted to use the components in unlimited personal and commercial projects.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>You may use the components in end products for sale.</li>
                        <li>You may modify the components to fit your needs.</li>
                        <li>You may not redistribute the components as a UI kit or template.</li>
                    </ul>
                </section>
                
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-text-primary">Restrictions</h2>
                    <p>
                        You are strictly prohibited from redistributing, reselling, leasing, or licensing the components as standalone assets, even if they have been modified.
                    </p>
                </section>
            </div>
        </div>
    );
}
