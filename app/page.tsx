'use client';

/**
 * Main page for Project Brief Analyst
 *
 * User flow:
 * 1. Paste text into textarea
 * 2. Click "Analyze Brief" to call /api/analyze-brief
 * 3. View structured results
 * 4. Copy as Markdown or create tasks in ClickUp
 */

import { useState } from 'react';
import { ExtractedBrief } from '@/lib/types';

export default function Home() {
  // Input state
  const [inputText, setInputText] = useState('');

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [brief, setBrief] = useState<ExtractedBrief | null>(null);

  // ClickUp state
  const [clickupToken, setClickupToken] = useState('');
  const [clickupListId, setClickupListId] = useState('');
  const [isCreatingTasks, setIsCreatingTasks] = useState(false);
  const [clickupError, setClickupError] = useState<string | null>(null);
  const [clickupSuccess, setClickupSuccess] = useState<string | null>(null);

  // Copy state
  const [copySuccess, setCopySuccess] = useState(false);

  /**
   * Handle "Analyze Brief" button click
   */
  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setAnalyzeError('Please paste some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAnalyzeError(null);
    setBrief(null);

    try {
      const response = await fetch('/api/analyze-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze brief');
      }

      setBrief(data);
    } catch (error) {
      setAnalyzeError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Copy tasks as Markdown to clipboard
   */
  const handleCopyMarkdown = async () => {
    if (!brief) return;

    // Build Markdown
    const lines = [
      `# Project: ${brief.projectSummary.substring(0, 50)}...`,
      '',
      '## Deliverables',
      '',
    ];

    brief.deliverables.forEach((deliverable, index) => {
      const deadline = brief.deadlines[0]?.dateString || '';
      const deadlineStr = deadline ? ` – due: ${deadline}` : '';
      lines.push(`${index + 1}. **${deliverable.title}**${deadlineStr}`);
      if (deliverable.description) {
        lines.push(`   - ${deliverable.description}`);
      }
    });

    if (brief.goals.length > 0) {
      lines.push('', '## Goals', '');
      brief.goals.forEach((goal) => lines.push(`- ${goal}`));
    }

    if (brief.clarifyingQuestions.length > 0) {
      lines.push('', '## Clarifying Questions', '');
      brief.clarifyingQuestions.forEach((q) => lines.push(`- ${q}`));
    }

    const markdown = lines.join('\n');

    try {
      await navigator.clipboard.writeText(markdown);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  /**
   * Create tasks in ClickUp
   */
  const handleCreateTasks = async () => {
    if (!brief) return;

    if (!clickupToken.trim() || !clickupListId.trim()) {
      setClickupError('Please provide both ClickUp API token and List ID');
      return;
    }

    setIsCreatingTasks(true);
    setClickupError(null);
    setClickupSuccess(null);

    try {
      const response = await fetch('/api/clickup/create-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brief,
          clickupToken,
          listId: clickupListId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create tasks');
      }

      setClickupSuccess(`Successfully created ${data.createdCount} task(s) in ClickUp!`);
    } catch (error) {
      setClickupError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsCreatingTasks(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Project Brief Analyst</h1>
          <p className="text-slate-600 mt-1">AI-powered RFP analyzer and task generator</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel: Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Input</h2>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste client email, RFP, or project brief here…"
                className="w-full h-96 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                disabled={isAnalyzing}
              />

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Brief'}
              </button>

              {analyzeError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{analyzeError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Output */}
          <div className="space-y-6">
            {!brief ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center text-slate-500 py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg">No analysis yet</p>
                  <p className="text-sm mt-2">Paste text and click "Analyze Brief"</p>
                </div>
              </div>
            ) : (
              <>
                {/* Project Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">Project Summary</h2>
                  <p className="text-slate-700">{brief.projectSummary}</p>
                </div>

                {/* Goals */}
                {brief.goals.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">Goals</h2>
                    <ul className="space-y-2">
                      {brief.goals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-slate-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deliverables */}
                {brief.deliverables.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">Deliverables</h2>
                    <div className="space-y-3">
                      {brief.deliverables.map((deliverable, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                          <h3 className="font-semibold text-slate-900">{deliverable.title}</h3>
                          {deliverable.description && (
                            <p className="text-slate-600 text-sm mt-1">{deliverable.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deadlines */}
                {brief.deadlines.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">Deadlines</h2>
                    <ul className="space-y-2">
                      {brief.deadlines.map((deadline, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-slate-700">
                            <span className="font-semibold">{deadline.label}:</span>{' '}
                            {deadline.dateString}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stakeholders */}
                {brief.stakeholders.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">Stakeholders</h2>
                    <div className="space-y-2">
                      {brief.stakeholders.map((stakeholder, index) => (
                        <div key={index} className="text-slate-700">
                          {stakeholder.name && <span className="font-semibold">{stakeholder.name}</span>}
                          {stakeholder.role && (
                            <span className="text-slate-600">
                              {stakeholder.name ? ' - ' : ''}
                              {stakeholder.role}
                            </span>
                          )}
                          {stakeholder.description && (
                            <p className="text-sm text-slate-600 mt-1">{stakeholder.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clarifying Questions */}
                {brief.clarifyingQuestions.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">
                      Clarifying Questions
                    </h2>
                    <ul className="space-y-2">
                      {brief.clarifyingQuestions.map((question, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">?</span>
                          <span className="text-slate-700">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">Actions</h2>

                  {/* Copy Markdown */}
                  <button
                    onClick={handleCopyMarkdown}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {copySuccess ? '✓ Copied!' : 'Copy Tasks as Markdown'}
                  </button>

                  {/* ClickUp Integration */}
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="font-semibold text-slate-900 mb-3">Create Tasks in ClickUp</h3>

                    <input
                      type="text"
                      value={clickupToken}
                      onChange={(e) => setClickupToken(e.target.value)}
                      placeholder="ClickUp API Token"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                      disabled={isCreatingTasks}
                    />

                    <input
                      type="text"
                      value={clickupListId}
                      onChange={(e) => setClickupListId(e.target.value)}
                      placeholder="ClickUp List ID"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                      disabled={isCreatingTasks}
                    />

                    <button
                      onClick={handleCreateTasks}
                      disabled={isCreatingTasks || !clickupToken.trim() || !clickupListId.trim()}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      {isCreatingTasks ? 'Creating Tasks...' : 'Create Tasks in ClickUp'}
                    </button>

                    {clickupError && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{clickupError}</p>
                      </div>
                    )}

                    {clickupSuccess && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">{clickupSuccess}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
