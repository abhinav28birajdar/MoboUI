import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const id = (await params).id;

    if (!id) {
      return new NextResponse('Missing ID', { status: 400 });
    }

    const { data, error } = await supabase
      .from('playground_sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching playground session:', error);
      return new NextResponse('Session not found', { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Fetch error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}