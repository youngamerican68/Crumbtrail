# Project Brief Analyst / RFP De-Coder

An AI-powered web application that analyzes project briefs, RFPs, and client emails to extract structured information and automatically create tasks in ClickUp.

## Features

- **Smart Text Analysis**: Paste any project brief or RFP and get structured output
- **LLM Integration**: Uses Claude or GPT to extract:
  - Project summary
  - Goals
  - Deliverables
  - Deadlines
  - Stakeholders
  - Clarifying questions
- **Markdown Export**: Copy structured tasks as Markdown
- **ClickUp Integration**: Automatically create tasks in ClickUp from deliverables

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **LLM**: Anthropic Claude or OpenAI GPT (configurable)
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# For Anthropic Claude (recommended)
LLM_API_KEY=your_anthropic_api_key_here
LLM_API_ENDPOINT=https://api.anthropic.com/v1/messages
LLM_MODEL=claude-3-5-sonnet-20241022

# OR for OpenAI
# LLM_API_KEY=your_openai_api_key_here
# LLM_API_ENDPOINT=https://api.openai.com/v1/chat/completions
# LLM_MODEL=gpt-4-turbo-preview
```

**Getting API Keys:**

- **Anthropic**: Get your API key at https://console.anthropic.com/
- **OpenAI**: Get your API key at https://platform.openai.com/api-keys

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Build for Production

```bash
npm run build
npm start
```

## How to Use

### Analyzing a Brief

1. **Paste Text**: Copy and paste your project brief, RFP, or client email into the text area
2. **Click "Analyze Brief"**: The AI will extract structured information
3. **Review Results**: See the analyzed data organized into sections

### Exporting to Markdown

Click the "Copy Tasks as Markdown" button to copy a formatted task list to your clipboard.

### Creating ClickUp Tasks

1. **Get ClickUp Credentials**:
   - API Token: Go to ClickUp Settings → Apps → Generate API Token
   - List ID: Open your ClickUp list in a browser, the ID is in the URL
     - Example: `https://app.clickup.com/12345/v/li/901234567` → List ID is `901234567`

2. **Enter Credentials**: Paste your API token and List ID into the form

3. **Create Tasks**: Click "Create Tasks in ClickUp" to automatically generate tasks for each deliverable

## Project Structure

```
/
├── app/
│   ├── api/
│   │   ├── analyze-brief/
│   │   │   └── route.ts          # LLM analysis endpoint
│   │   └── clickup/
│   │       └── create-tasks/
│   │           └── route.ts      # ClickUp task creation endpoint
│   ├── globals.css               # Tailwind styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main UI page
├── lib/
│   ├── llm-client.ts             # LLM API integration
│   └── types.ts                  # Shared TypeScript types
├── .env.local.example            # Environment variable template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## API Routes

### POST `/api/analyze-brief`

Analyzes raw text and returns structured brief.

**Request:**
```json
{
  "text": "string"
}
```

**Response:**
```json
{
  "projectSummary": "string",
  "goals": ["string"],
  "deliverables": [
    {
      "title": "string",
      "description": "string (optional)"
    }
  ],
  "deadlines": [
    {
      "label": "string",
      "dateString": "string"
    }
  ],
  "stakeholders": [
    {
      "name": "string (optional)",
      "role": "string (optional)",
      "description": "string (optional)"
    }
  ],
  "clarifyingQuestions": ["string"]
}
```

### POST `/api/clickup/create-tasks`

Creates tasks in ClickUp from an analyzed brief.

**Request:**
```json
{
  "brief": { ... },
  "clickupToken": "string",
  "listId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "createdCount": 3,
  "taskIds": ["task_id_1", "task_id_2", "task_id_3"]
}
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `LLM_API_KEY`
   - `LLM_API_ENDPOINT` (optional)
   - `LLM_MODEL` (optional)

### Environment Variables in Vercel

Go to your project in Vercel → Settings → Environment Variables:

- `LLM_API_KEY`: Your Anthropic or OpenAI API key
- `LLM_API_ENDPOINT`: (Optional) Override the default endpoint
- `LLM_MODEL`: (Optional) Override the default model

## Customization

### Switching LLM Providers

The LLM client in `lib/llm-client.ts` supports both Anthropic and OpenAI. To switch:

1. Update your `.env.local` file with the appropriate endpoint and API key
2. The system auto-detects the provider based on the endpoint URL

### Modifying the Extraction Schema

To change what information is extracted:

1. Update the `ExtractedBrief` type in `lib/types.ts`
2. Update the `SYSTEM_PROMPT` in `lib/llm-client.ts`
3. Update the UI in `app/page.tsx` to display new fields

### ClickUp Task Mapping

To customize how deliverables map to ClickUp tasks, edit the task creation logic in `app/api/clickup/create-tasks/route.ts`.

## Future Enhancements (v2+)

- [ ] File upload support (PDF, DOCX)
- [ ] Custom field mapping for ClickUp
- [ ] Save/load analyzed briefs
- [ ] Team collaboration features
- [ ] Multi-project support
- [ ] Integration with other project management tools (Asana, Jira, etc.)

## Troubleshooting

### "LLM_API_KEY environment variable is not set"

Make sure you've created a `.env.local` file with your API key. Restart the dev server after creating the file.

### "Failed to parse LLM output as JSON"

The LLM sometimes returns text that isn't valid JSON. Try:
- Simplifying your input text
- Checking that your API key is valid
- Using a more capable model (e.g., Claude 3.5 Sonnet or GPT-4)

### ClickUp tasks not creating

- Verify your API token is valid
- Check that the List ID is correct
- Ensure you have permission to create tasks in that list

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
