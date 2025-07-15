import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const itemsParam = searchParams.get("items");

    if (!itemsParam) {
        return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    let itemsArray;
    try {
        itemsArray = JSON.parse(itemsParam);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Data received', data: itemsArray });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('Received:', body);
    return NextResponse.json({ message: 'Data received' });
}
