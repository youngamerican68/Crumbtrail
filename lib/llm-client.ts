/**
 * LLM Client for analyzing project briefs
 *
 * This module handles the LLM API calls. You can swap between different providers
 * (Anthropic, OpenAI, etc.) by changing the implementation here.
 *
 * Environment variables needed:
 * - LLM_API_KEY: Your API key
 * - LLM_API_ENDPOINT: API endpoint (optional, defaults to Anthropic)
 * - LLM_MODEL: Model name (optional, defaults to Claude 3.5 Sonnet)
 */

import { ExtractedBrief } from './types';

const SYSTEM_PROMPT = `You are an AI assistant specialized in analyzing project briefs, RFPs, and client emails. Your task is to extract structured information from messy, unstructured text.

You must return ONLY valid JSON matching this exact schema:
{
  "projectSummary": "string - A concise 2-3 sentence summary of the project",
  "goals": ["string array - Main objectives/goals of the project"],
  "deliverables": [
    {
      "title": "string - Name of deliverable",
      "description": "string (optional) - Details about this deliverable"
    }
  ],
  "deadlines": [
    {
      "label": "string - What this deadline is for",
      "dateString": "string - The date in ISO format or natural format"
    }
  ],
  "stakeholders": [
    {
      "name": "string (optional) - Person's name",
      "role": "string (optional) - Their role",
      "description": "string (optional) - Additional context"
    }
  ],
  "clarifyingQuestions": ["string array - Questions to ask the client for clarity"]
}

Return ONLY the JSON object, no markdown formatting, no additional text.`;

/**
 * Calls the LLM API to extract structured brief from unstructured text
 */
export async function callLLMForBrief(text: string): Promise<ExtractedBrief> {
  const apiKey = process.env.LLM_API_KEY;

  if (!apiKey) {
    throw new Error('LLM_API_KEY environment variable is not set');
  }

  // You can configure which LLM provider to use via environment variables
  const endpoint = process.env.LLM_API_ENDPOINT || 'https://api.anthropic.com/v1/messages';
  const model = process.env.LLM_MODEL || 'claude-3-5-sonnet-20241022';

  // Determine which provider based on endpoint
  const isAnthropic = endpoint.includes('anthropic.com');
  const isOpenAI = endpoint.includes('openai.com');

  try {
    let response: Response;

    if (isAnthropic) {
      // Anthropic API format
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: `Please analyze this project brief and extract structured information:\n\n${text}`,
            },
          ],
        }),
      });
    } else if (isOpenAI) {
      // OpenAI API format
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: `Please analyze this project brief and extract structured information:\n\n${text}`,
            },
          ],
          temperature: 0.3,
        }),
      });
    } else {
      throw new Error('Unsupported LLM provider. Set LLM_API_ENDPOINT to Anthropic or OpenAI endpoint.');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM API error:', errorText);
      throw new Error(`LLM API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the text content based on provider
    let contentText: string;

    if (isAnthropic) {
      // Anthropic response format
      contentText = data.content[0].text;
    } else if (isOpenAI) {
      // OpenAI response format
      contentText = data.choices[0].message.content;
    } else {
      throw new Error('Could not parse LLM response');
    }

    // Parse the JSON response
    const extractedBrief = JSON.parse(contentText.trim()) as ExtractedBrief;

    // Basic validation
    if (!extractedBrief.projectSummary || !Array.isArray(extractedBrief.goals)) {
      throw new Error('Invalid brief structure returned from LLM');
    }

    return extractedBrief;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse LLM output as JSON');
    }
    throw error;
  }
}
