"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/lib/stores/favorites-store";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        useFavoritesStore.persist.rehydrate();
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // or a loading skeleton
    }

    return <>{children}</>;
}
