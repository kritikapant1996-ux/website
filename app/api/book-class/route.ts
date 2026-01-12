
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentName, grade, confidenceLevel, deviceType, timeZone, preferredDate, email, phone } = body;

        // 1. Save to Supabase
        const { data: dbData, error: dbError } = await supabase
            .from('bookings')
            .insert([
                {
                    student_name: studentName,
                    grade,
                    confidence_level: confidenceLevel,
                    device_type: deviceType,
                    timezone: timeZone,
                    preferred_date: preferredDate,
                    email,
                    phone
                }
            ])
            .select();

        if (dbError) {
            console.error('Supabase Error:', dbError);
            // We continue even if DB fails? Or return error? 
            // Better to return error or at least log it.
            return NextResponse.json({ success: false, error: 'Database error', details: dbError.message }, { status: 500 });
        }

        // 2. Return Success
        return NextResponse.json({
            success: true,
            message: 'Booking created successfully',
            data: {
                bookingId: dbData ? dbData[0]?.id : 'unknown',
                scheduledTime: preferredDate
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
