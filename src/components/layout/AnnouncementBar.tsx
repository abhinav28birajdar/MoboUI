"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-sm font-medium text-primary relative no-print">
            <p>
                <span className="mr-2">🚀</span>
                <strong>MobileUI v2.0 is live!</strong> Check out the new AI Component Generator.
            </p>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/20 rounded-full transition-colors"
            >
                <X size={14} />
            </button>
        </div>
    );
}
