import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const books = searchParams.get('books');
        const limit = searchParams.get('limit');
        const url = `https://api.aozora.gr.jp/v1/search?books=${books}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from Aozora API' }, { status: 500 });
        }
        const data = await response.json();
        return NextResponse.json(data);
    }
}