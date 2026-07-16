import React, { Suspense } from 'react'
import { CategorySidebar } from '@/components/component-library/CategorySidebar'
import { FilterBar } from '@/components/component-library/FilterBar'
import { ComponentGrid } from '@/components/component-library/ComponentGrid'

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-8">
      <Suspense fallback={<div className="w-64" />}>
        <CategorySidebar />
      </Suspense>
      
      <div className="flex-1 min-w-0">
        <FilterBar />
        <Suspense fallback={<div className="h-[500px]" />}>
          <ComponentGrid />
        </Suspense>
      </div>
    </div>
  )
}
