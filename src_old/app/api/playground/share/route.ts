import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    const body = await req.json();
    const { code, framework, deviceType, deviceSkin, theme } = body;

    if (!code || !framework) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Generate a unique short ID (8 characters)
    const sessionId = nanoid(8);

    const playgroundSessionData = {
      id: sessionId,
      user_id: user?.id || null, // Allow anonymous saves for now
      session_token: sessionId, // Used for quick access without full auth
      code_flutter: framework === 'flutter' ? code : '',
      code_react_native: framework === 'react-native' ? code : '',
      code_expo: framework === 'expo' ? code : '',
      code_web: framework === 'web' ? code : '',
      active_framework: framework,
      device_type: deviceType || 'iphone-15-pro',
      device_skin: deviceSkin || 'default',
      theme: theme || 'dark',
      last_saved: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('playground_sessions')
      .insert(playgroundSessionData);

    if (error) {
      console.error('Error saving playground session:', error);
      // Fallback: If table doesn't exist, just return the ID for client-side routing mock
      if (error.code === '42P01') { 
        console.warn('Table playground_sessions does not exist, proceeding without DB persist.');
        return NextResponse.json({ id: sessionId, success: true, warning: 'Table not found' });
      }
      return new NextResponse('Database error', { status: 500 });
    }

    return NextResponse.json({ id: sessionId, success: true });
  } catch (error: any) {
    console.error('Share error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
