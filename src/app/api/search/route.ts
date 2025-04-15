'use server'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const books = searchParams.get('books');
        const limit = searchParams.get('limit');
        const url = `https://api.aozora.gr.jp/v1/search?books=${books}&limit=${limit}`;
        axios.get(url)
            .then((responce) => {
                return NextResponse.json(responce.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
}
