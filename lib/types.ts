/**
 * Shared type definitions for the RFP Analyzer
 */

export type ExtractedBrief = {
  projectSummary: string;
  goals: string[];
  deliverables: {
    title: string;
    description?: string;
  }[];
  deadlines: {
    label: string;
    dateString: string;
  }[];
  stakeholders: {
    name?: string;
    role?: string;
    description?: string;
  }[];
  clarifyingQuestions: string[];
};

/**
 * API Request/Response types
 */

export type AnalyzeBriefRequest = {
  text: string;
};

export type AnalyzeBriefResponse = ExtractedBrief | { error: string };

export type CreateTasksRequest = {
  brief: ExtractedBrief;
  clickupToken: string;
  listId: string;
};

export type CreateTasksResponse =
  | { success: true; createdCount: number; taskIds: string[] }
  | { success: false; error: string };
