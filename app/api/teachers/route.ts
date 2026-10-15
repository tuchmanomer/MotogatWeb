import { NextResponse } from 'next/server';
import { getTeachers } from '@/lib/teachersSheet';

export const dynamic = 'force-dynamic';

export async function GET() {
    const teachers = await getTeachers();
    return NextResponse.json({ teachers });
}
