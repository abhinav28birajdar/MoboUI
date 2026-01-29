"use client";

import React from 'react';
import { components } from '@/lib/data/components';
import ComponentCard from './ComponentCard';

export default function ComponentGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
                <ComponentCard key={component.id} component={component} />
            ))}
        </div>
    );
}
