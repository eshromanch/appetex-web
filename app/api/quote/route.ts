import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Quote from '@/models/Quote';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { firstName, lastName, email, company, phone, country, items, notes } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total items
    const totalItems = items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);

    // Create new quote submission
    const quote = new Quote({
      firstName,
      lastName,
      email,
      company,
      phone,
      country,
      items,
      totalItems,
      notes,
    });

    await quote.save();

    return NextResponse.json(
      { message: 'Quote request submitted successfully', id: quote._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const quotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
