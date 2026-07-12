import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await createClient();
    const body = await request.json();
    const { id, user_id, session_token, code_flutter, code_react_native, code_expo, code_web, active_framework, device_type, device_skin, theme } = body;

    if (!session_token) {
      return NextResponse.json({ error: 'Missing session_token' }, { status: 400 });
    }

    const payload = {
      user_id: user_id || null,
      session_token,
      code_flutter: code_flutter || null,
      code_react_native: code_react_native || null,
      code_expo: code_expo || null,
      code_web: code_web || null,
      active_framework: active_framework || 'react_native',
      device_type: device_type || 'phone',
      device_skin: device_skin || 'iphone15pro',
      theme: theme || 'vs-dark',
      last_saved: new Date().toISOString(),
    };

    let result;
    if (id) {
      const { data, error } = await db
        .from('playground_sessions')
        .upsert({ id, ...payload })
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await db
        .from('playground_sessions')
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}