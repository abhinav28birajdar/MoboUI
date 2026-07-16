import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await db
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Retrieve stats counts
    const [usersRes, compsRes, projsRes, salesRes] = await Promise.all([
      db.from('profiles').select('id', { count: 'exact', head: true }),
      db.from('components').select('id', { count: 'exact', head: true }),
      db.from('projects').select('id', { count: 'exact', head: true }),
      db.from('marketplace_listings').select('price'),
    ]);

    const totalUsers = usersRes.count || 0;
    const totalComponents = compsRes.count || 0;
    const totalProjects = projsRes.count || 0;
    const totalRevenue = (salesRes.data || []).reduce((acc: number, curr: any) => acc + Number(curr.price || 0), 0);

    return NextResponse.json({
      totalUsers,
      totalComponents,
      totalProjects,
      revenue: totalRevenue,
      frameworkBreakdown: {
        react_native: 12,
        flutter: 8,
        expo: 5,
        web: 3
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
