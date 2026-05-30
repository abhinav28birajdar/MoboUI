import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const framework = searchParams.get('framework');
        const query = searchParams.get('q');
        const limitParam = searchParams.get('limit');
        const offset = searchParams.get('offset') || '0';
        const limit = limitParam ? Math.min(Math.max(Number(limitParam) || 0, 1), 100) : 50;

        let queryBuilder = supabase
            .from('components')
            .select('*', { count: 'exact' })
            .eq('status', 'published')
            .range(Number(offset), Number(offset) + limit - 1)
            .order('created_at', { ascending: false });

        // Apply filters
        if (category) {
            const { data: categoryData } = await supabase
                .from('categories')
                .select('id')
                .eq('slug', category)
                .single();

            if (categoryData) {
                queryBuilder = queryBuilder.eq('category_id', categoryData.id);
            }
        }

        if (framework) {
            queryBuilder = queryBuilder.or(`framework.eq.${framework},framework.eq.both`);
        }

        if (query) {
            queryBuilder = queryBuilder.or(
                `name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{"${query}"}`
            );
        }

        const { data: components, error, count } = await queryBuilder;

        if (error) {
            throw error;
        }

        // Increment view count
        if (components && components.length > 0) {
            components.forEach((component: any) => {
                supabase
                    .from('components')
                    .update({ view_count: (component.view_count || 0) + 1 })
                    .eq('id', component.id)
                    .then();
            });
        }

        return NextResponse.json({
            components: components || [],
            total: count || 0,
            limit,
            offset: Number(offset),
        });
    } catch (error) {
        console.error('Error fetching components:', error);
        return NextResponse.json(
            { error: 'Failed to fetch components' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const { data: component, error } = await supabase
            .from('components')
            .insert({
                ...body,
                creator_id: session.user.id,
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(component, { status: 201 });
    } catch (error) {
        console.error('Error creating component:', error);
        return NextResponse.json(
            { error: 'Failed to create component' },
            { status: 500 }
        );
    }
}
