import { components } from '@/lib/data/components';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(components);
}
