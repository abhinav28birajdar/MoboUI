import { NextResponse } from 'next/server';
import { components } from '@/lib/data/components';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const normalized = decodeURIComponent(id).toLowerCase();

    const component = components.find(
        (c) => c.id.toLowerCase() === normalized || c.slug.toLowerCase() === normalized
    );

    if (!component) {
        return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
}
