import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { components as mockComponents } from '@/lib/data/components';

/**
 * GET /api/components/[id]
 * Fetches details of a specific component by its ID (UUID) or slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const normalized = decodeURIComponent(id).toLowerCase();

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        let queryBuilder = db.from('components').select('*');

        // Check if id is a UUID format or a slug string
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized);
        if (isUuid) {
          queryBuilder = queryBuilder.eq('id', normalized);
        } else {
          queryBuilder = queryBuilder.eq('slug', normalized);
        }

        const { data: component, error } = await queryBuilder.maybeSingle();

        if (error) {
          throw error;
        }

        if (component) {
          return NextResponse.json(component);
        }
      } catch (dbError) {
        console.warn('Database details query failed, falling back to mock data:', dbError);
      }
    }

    // Fallback: Query local mock data list
    const component = mockComponents.find(
      (c) => c.id.toLowerCase() === normalized || c.slug.toLowerCase() === normalized
    );

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error('Error fetching component details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch component details' },
      { status: 500 }
    );
  }
}
