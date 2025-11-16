/**
 * API Route: POST /api/clickup/create-tasks
 *
 * Creates tasks in ClickUp from an extracted brief.
 * Requires ClickUp API token and List ID from the client.
 */

import { NextRequest, NextResponse } from 'next/server';
import { CreateTasksRequest } from '@/lib/types';

const CLICKUP_API_BASE = 'https://api.clickup.com/api/v2';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CreateTasksRequest = await request.json();

    // Validate inputs
    if (!body.brief || !body.clickupToken || !body.listId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: brief, clickupToken, or listId' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.brief.deliverables) || body.brief.deliverables.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No deliverables found in brief' },
        { status: 400 }
      );
    }

    const { brief, clickupToken, listId } = body;

    // Create tasks for each deliverable
    const createdTaskIds: string[] = [];
    const errors: string[] = [];

    for (const deliverable of brief.deliverables) {
      try {
        // Build task description
        const descriptionParts = [
          '**From Project Brief Analyst**\n',
          `**Project Summary:** ${brief.projectSummary}\n`,
        ];

        if (deliverable.description) {
          descriptionParts.push(`**Deliverable Notes:** ${deliverable.description}\n`);
        }

        if (brief.clarifyingQuestions.length > 0) {
          descriptionParts.push('\n**Clarifying Questions:**');
          brief.clarifyingQuestions.forEach((q) => {
            descriptionParts.push(`- ${q}`);
          });
        }

        const description = descriptionParts.join('\n');

        // Prepare task payload
        const taskPayload: any = {
          name: deliverable.title,
          description,
          markdown_description: description,
        };

        // Optional: Add due date if there's a deadline
        // For v1, we'll use the first deadline if it exists
        if (brief.deadlines.length > 0) {
          const deadline = brief.deadlines[0];
          const dueDate = parseDateString(deadline.dateString);

          if (dueDate) {
            // ClickUp expects due_date as Unix timestamp in milliseconds
            taskPayload.due_date = dueDate.getTime();
          }
        }

        // Create the task via ClickUp API
        const response = await fetch(`${CLICKUP_API_BASE}/list/${listId}/task`, {
          method: 'POST',
          headers: {
            'Authorization': clickupToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`ClickUp API error for "${deliverable.title}":`, errorText);
          errors.push(`Failed to create task "${deliverable.title}": ${response.statusText}`);
          continue;
        }

        const responseData = await response.json();
        createdTaskIds.push(responseData.id);
      } catch (error) {
        console.error(`Error creating task for "${deliverable.title}":`, error);
        errors.push(`Error creating task "${deliverable.title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Return results
    if (createdTaskIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to create any tasks. Errors: ${errors.join('; ')}`,
        },
        { status: 500 }
      );
    }

    if (errors.length > 0) {
      // Partial success
      return NextResponse.json(
        {
          success: true,
          createdCount: createdTaskIds.length,
          taskIds: createdTaskIds,
          warnings: errors,
        },
        { status: 200 }
      );
    }

    // Full success
    return NextResponse.json(
      {
        success: true,
        createdCount: createdTaskIds.length,
        taskIds: createdTaskIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/clickup/create-tasks:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { success: false, error: `Failed to create tasks: ${errorMessage}` },
      { status: 500 }
    );
  }
}

/**
 * Attempts to parse a date string into a Date object.
 * Supports ISO format and common natural formats.
 */
function parseDateString(dateString: string): Date | null {
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch {
    // Fall through
  }

  // Could add more sophisticated date parsing here
  // For now, just return null if Date constructor fails
  return null;
}
