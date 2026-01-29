import ComponentGrid from "@/components/component-library/ComponentGrid";
import FilterSidebar from "@/components/component-library/FilterSidebar";

export default function ComponentsPage() {
    return (
        <div className="container px-4 py-8 mx-auto flex flex-col md:flex-row gap-8 min-h-screen">
            <aside className="w-full md:w-64 flex-shrink-0">
                <FilterSidebar />
            </aside>
            <main className="flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Component Library</h1>
                    <p className="text-muted-foreground">Browse our collection of 100+ production-ready mobile components.</p>
                </div>
                <ComponentGrid />
            </main>
        </div>
    );
}
