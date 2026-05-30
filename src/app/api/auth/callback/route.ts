import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handle OAuth callback
 * This route processes the callback from OAuth providers
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') || '/account';

    if (code) {
      // Exchange code for session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Auth error:', error);
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
        );
      }
    }

    // Redirect to dashboard or next URL
    return NextResponse.redirect(new URL(next, request.url));
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/login?error=callback_failed', request.url));
  }
}
