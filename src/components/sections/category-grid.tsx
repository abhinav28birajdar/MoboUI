import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/constants/categories';

export function CategoryGrid() {
  return (
    <section className="py-20 bg-[#0f0f14]">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse by Category</h2>
            <p className="text-slate-400 text-lg">Find exactly what you need from our extensive collection.</p>
          </div>
          <Link href="/categories" className="hidden md:flex text-fuchsia-600 hover:text-fuchsia-500 font-bold items-center transition-colors">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((cat) => (
            <Link key={cat.id} href={`/components?category=${cat.slug}`} className="group block">
              <div className="rounded-xl border border-[#2a2a38] bg-[#1a1a24] p-6 hover:border-fuchsia-600 transition-all duration-300 hover:shadow-[0_4px_20px_rgb(192,38,211,0.1)] hover:-translate-y-1 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#0f0f14] border border-[#2a2a38] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{cat.icon_name === 'button' ? '🔘' : cat.icon_name === 'card' ? '🎴' : cat.icon_name === 'form' ? '📋' : '✨'}</span>
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-fuchsia-400 transition-colors">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/categories" className="text-fuchsia-600 hover:text-fuchsia-500 font-bold transition-colors">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
