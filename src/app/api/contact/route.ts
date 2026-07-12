import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const db = await createClient();
    const { error } = await db
      .from('contact_submissions')
      .insert({ name, email, subject, message, status: 'new' });

    if (error) throw error;

    // Optional: Send alert via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'MoboUI Contact Form <onboarding@resend.dev>',
            to: 'admin@moboui.com',
            subject: `New Contact Submission: ${subject || 'General Info'}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
          }),
        });
      } catch (emailErr) {
        console.warn('Failed to dispatch alert email:', emailErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
