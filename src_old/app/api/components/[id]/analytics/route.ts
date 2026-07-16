import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await createClient();

    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await db
      .from('component_analytics')
      .select('*')
      .eq('component_id', id);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await createClient();
    const body = await request.json();

    const { data, error } = await db
      .from('component_analytics')
      .insert({
        component_id: id,
        event_type: body.event_type || 'view',
        user_id: body.user_id || null,
        session_id: body.session_id || null,
        framework: body.framework || null,
        device_type: body.device_type || null,
        country: body.country || null,
      })
      .select()
      .single();

    if (error) throw error;

    // Trigger atomic updates
    if (body.event_type === 'view') {
      await db.rpc('increment_view_count', { c_id: id });
    } else if (body.event_type === 'copy') {
      await db.rpc('increment_copy_count', { c_id: id });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
