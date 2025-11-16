/**
 * API Route: POST /api/analyze-brief
 *
 * Accepts raw text (client email, RFP, project brief) and returns
 * a structured ExtractedBrief using an LLM.
 */

import { NextRequest, NextResponse } from 'next/server';
import { callLLMForBrief } from '@/lib/llm-client';
import { AnalyzeBriefRequest, ExtractedBrief } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: AnalyzeBriefRequest = await request.json();

    // Validate input
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "text" field in request body' },
        { status: 400 }
      );
    }

    if (body.text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text cannot be empty' },
        { status: 400 }
      );
    }

    // Enforce a reasonable length limit (adjust as needed)
    if (body.text.length > 50000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 50,000 characters allowed.' },
        { status: 400 }
      );
    }

    // Call LLM to analyze the brief
    const extractedBrief: ExtractedBrief = await callLLMForBrief(body.text);

    // Return the structured brief
    return NextResponse.json(extractedBrief, { status: 200 });
  } catch (error) {
    console.error('Error in /api/analyze-brief:', error);

    // Return appropriate error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: `Failed to analyze brief: ${errorMessage}` },
      { status: 500 }
    );
  }
}
