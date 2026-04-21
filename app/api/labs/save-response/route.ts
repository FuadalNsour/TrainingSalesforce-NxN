import { NextRequest, NextResponse } from 'next/server';
import { saveLabResponse } from '@/lib/response-logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { labId, labTitle, context, situation, question, userResponse } = body;

    if (!labId || !userResponse) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = saveLabResponse({
      labId,
      labTitle: labTitle || 'Unknown Lab',
      context: context || '',
      situation: situation || '',
      question: question || '',
      userResponse,
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Error saving response:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
