import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log('--- OFFLINE CONTACT SIMULATOR ---');
      console.log(`From: ${name} (${email})`);
      console.log(`Topic: ${topic || 'General Inquiry'}`);
      console.log(`Message: ${message}`);
      console.log('---------------------------------');

      return NextResponse.json({
        success: true,
        message: 'Message captured successfully! (Offline simulation mode)',
      }, { status: 201 });
    }

    // Direct HTTP POST to Resend API to send mail
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MoboUI Contact <onboarding@resend.dev>',
        to: 'abhinav28birajdar@gmail.com', // fallback/recipient address
        subject: `[MOBOUI Contact Form] - ${topic || 'General inquiry'}`,
        html: `
          <h3>New Message from MoboUI Contact Form</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Topic:</strong> ${topic || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      throw new Error(errorData.message || 'Resend API returned an error');
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit contact request' },
      { status: 500 }
    );
  }
}
