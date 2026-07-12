import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'avatars';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Size checks
    const maxLimits: Record<string, number> = {
      avatars: 2 * 1024 * 1024,
      'component-previews': 10 * 1024 * 1024,
      'project-covers': 10 * 1024 * 1024,
      'blog-images': 10 * 1024 * 1024,
    };
    const limit = maxLimits[bucket] || 2 * 1024 * 1024;
    if (file.size > limit) {
      return NextResponse.json({ error: 'File size limit exceeded' }, { status: 400 });
    }

    // Type checks
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are permitted' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
    const arrayBuffer = await file.arrayBuffer();

    const { data, error } = await db.storage
      .from(bucket)
      .upload(fileName, new Uint8Array(arrayBuffer), {
        contentType: file.type,
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = db.storage.from(bucket).getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
export const runtime = 'nodejs';
