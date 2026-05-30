import { components } from '@/lib/data/components';
import { docsData } from '@/lib/data/docs';
import { NextRequest, NextResponse } from 'next/server';

type SearchResult = {
    id: string;
    title: string;
    description: string;
    category: string;
    type: 'component' | 'doc';
    url: string;
    tags?: string[];
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get('q') || '').trim().toLowerCase();
    const type = searchParams.get('type');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(Math.max(Number(limitParam) || 0, 1), 50) : 20;

    if (!query) {
        return NextResponse.json({ results: [], total: 0 });
    }

    const componentResults: SearchResult[] = components
        .filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some((tag) => tag.toLowerCase().includes(query))
        )
        .map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            category: item.category,
            type: 'component',
            url: `/components/${item.slug}`,
            tags: item.tags,
        }));

    const docResults: SearchResult[] = docsData.flatMap((section) =>
        (section.items || [])
            .filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    section.title.toLowerCase().includes(query)
            )
            .map((item) => ({
                id: `${section.slug}-${item.slug}`,
                title: item.title,
                description: item.description,
                category: section.title,
                type: 'doc',
                url: `/docs/${section.slug}/${item.slug}`,
            }))
    );

    const merged = [...componentResults, ...docResults];
    const filteredByType =
        type === 'component' || type === 'doc'
            ? merged.filter((item) => item.type === type)
            : merged;

    const results = filteredByType.slice(0, limit);

    return NextResponse.json({
        results,
        total: filteredByType.length,
    });
}
