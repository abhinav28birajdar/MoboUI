import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === 'checkout.session.completed') {
    // Retrieve the user ID from the metadata or client_reference_id
    const userId = session.client_reference_id || session.metadata?.userId;

    if (userId) {
      // Update the user's plan to 'pro' in the database
      const { error } = await supabaseAdmin
        .from('users')
        .update({ plan: 'pro', updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        return new NextResponse('Database Error', { status: 500 });
      }
    }
  }

  return new NextResponse('OK', { status: 200 });
}
