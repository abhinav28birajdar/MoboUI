import { useEffect, useMemo, useState } from 'react';
import type { Component } from '@/lib/types/component';
import { useFrontendAppStore } from '@/lib/store/frontend-app-store';

export function useComponents() {
    const components = useFrontendAppStore((state) => state.components);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate network fetch for realistic UX behavior.
        const timer = setTimeout(() => {
            setLoading(false);
            setError(null);
        }, 450);

        return () => clearTimeout(timer);
    }, [components.length]);

    return { components, loading, error };
}

export function useComponent(slug: string) {
    const components = useFrontendAppStore((state) => state.components);
    const [loading, setLoading] = useState(true);

    const component = useMemo(
        () => components.find((item) => item.slug === slug || item.id === slug) || null,
        [components, slug]
    );

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, [slug, components.length]);

    const error = !loading && !component ? 'Component not found' : null;

    return { component: component as Component | null, loading, error };
}
