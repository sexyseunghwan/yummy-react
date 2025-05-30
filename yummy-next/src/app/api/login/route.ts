// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const clientIp = req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown'
    const body = await req.json()

    try {
        const apiRes = await axios.post(
            `${apiBaseUrl}/login/standardLogin`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Forwarded-For': clientIp,
                },
                withCredentials: true,
            });
        
        const setCookieHeader = apiRes.headers['set-cookie'];
    
        const response = NextResponse.json(apiRes.data, { status: 200 });
        
        if (setCookieHeader) {
            response.headers.set('set-cookie', setCookieHeader.toString());
        }
        
        return response;
    } catch (err) {
        console.error('백엔드 로그인 오류:', err)
        return NextResponse.json('FAIL', { status: 500 })
    }
}