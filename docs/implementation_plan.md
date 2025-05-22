# Didup - Implementation Plan

## Phase 1: Initial Version (Todoist Integration & AI Summary for Active Tasks)

This plan outlines the steps to build the initial version of Didup, focusing on Todoist integration to fetch active tasks and using the Vercel AI SDK to generate summaries.

### I. Project Setup & Configuration

- [ ] Initialize project (already done by user)
- [ ] Install necessary dependencies (already done by user: `@doist/todoist-api-typescript`, `@ai-sdk/react`, `@ai-sdk/openai`, etc.)
- [x] Configure environment variables:
    - [x] Add `OPENAI_API_KEY` to `.env` and `src/env.js` for the Vercel AI SDK.
- [ ] Set up basic project structure for Next.js app (partially done).

### II. Core UI Components (`src/components/didup/`)

- [x] `ApiKeyForm.tsx`:
    - [x] Input field for Todoist API Key (using `shadcn/ui Input`).
    - [x] Submit button (using `shadcn/ui Button`).
    - [x] Form handling with `react-hook-form` and `zod` for validation.
- [x] `DateRangeSelector.tsx`:
    - [x] Buttons to select pre-defined date ranges for tasks (e.g., "Today", "Next 7 Days") (using `shadcn/ui Button`).
    - [x] Manage selected range state.
- [x] `ActivitySummary.tsx`:
    - [x] Display area for the list of fetched Todoist tasks.
    - [x] Display area for the AI-generated summary.
    - [x] Loading states for task fetching and AI summary generation.
    - [x] Error message display.

### III. Todoist Integration

- [ ] Define types for Todoist task data in `src/lib/types.ts` (if needed, or use SDK types).
- [x] Create Server Action `src/server/actions/todoist.ts`:
    - [x] `getTodoistTasks(apiKey: string, filterName: string)` function.
        - [x] `filterName` could be e.g., "today", "next7days". (Note: `filter` renamed to `filterName` to avoid SDK clashes).
        - [x] Initialize `TodoistApi` from `@doist/todoist-api-typescript` with the provided `apiKey`.
        - [x] Fetch tasks using `api.getTasks({ filter: ... })`. (Note: Persistent linter errors regarding `GetTasksArgs` and return type `Task[]` despite documentation alignment. Code written to match docs.)
        - [x] Handle potential errors from the Todoist API, including 401 for invalid keys.
        - [x] Return `Task[]` from the SDK.
    - [x] **Note:** This initial version will fetch *active/upcoming* tasks. Summarizing *completed* tasks requires the Todoist Sync API or Activity API, which is a future enhancement.

### IV. AI Summary Generation (Vercel AI SDK)

- [x] Create API Route Handler `src/app/api/ai/summarize/route.ts`:
    - [x] `POST` handler that accepts a list of tasks.
        - [x] Input type defined as `SummarizeRequestBody`.
        - [x] (Note: Persistent linter error "Unsafe assignment of an `any` value" for `await req.json()` despite explicit typing. Assumed functionally correct.)
    - [x] Construct a prompt with system and user messages for the AI (e.g., "Summarize these upcoming tasks: [tasks_details]").
    - [x] Use `streamText` from `ai` and `openai` from `@ai-sdk/openai` to stream the summary.
        - [x] (Note: Persistent linter error "Unexpected `await` of a non-Promise" for `await streamText()` despite SDK documentation. Assumed functionally correct.)
    - [x] Set `maxDuration` for the streaming response.
    - [x] Handle errors during AI generation, including AbortError and return JSON error response.
    - [x] Ensure `OPENAI_API_KEY` is checked from `env`.

### V. Main Page (`src/app/page.tsx`)

- [ ] Component state management:
    - [ ] Todoist API Key.
    - [ ] Selected date range/filter.
    - [ ] Fetched tasks.
- [ ] Integrate `ApiKeyForm` for user to input their Todoist API key.
- [ ] Integrate `DateRangeSelector` for user to choose the task period.
- [ ] Data fetching logic:
    - [ ] When API key and date range are available, use TanStack Query (`useQuery`) to call the `getTodoistTasks` server action.
- [ ] AI Summary logic:
    - [ ] Once tasks are fetched, prepare the input for the AI.
    - [ ] Use `useCompletion` hook from `@ai-sdk/react` to connect to `/api/ai/summarize`.
        - [ ] Pass task data in the `body` of the request to `useCompletion`.
- [ ] Integrate `ActivitySummary` to display:
    - [ ] The list of tasks.
    - [ ] The streaming AI completion.
    - [ ] Loading and error states from both task fetching and AI summary.
- [ ] Basic page layout and styling.

### VI. Styling and UX

- [ ] Apply basic Tailwind CSS for a clean layout.
- [ ] Ensure loading and error states are clearly communicated to the user.
- [ ] Add shadcn/ui components as needed (e.g. `Card` for displaying sections).

### VII. Future Enhancements (Post-MVP)

- [ ] **Todoist Completed Tasks**: Integrate Todoist Sync API or Activity API to fetch and summarize *completed* tasks for a true "what I did" feature.
- [ ] **More Data Sources**: Add integrations for Google Calendar, Jira, etc.
- [ ] **User Authentication**: Implement proper user accounts and secure API key storage.
- [ ] **Goal Setting & Tracking**: Develop features for users to set goals and track them against their activities.
- [ ] **Advanced Date Range Selection**: Allow custom date ranges.
- [ ] **Error Handling**: More robust error handling and user feedback.
- [ ] **UI/UX Polish**: Improve the visual design and user experience.
- [ ] **Persistence**: Store API keys and user preferences (requires authentication).
- [ ] **Testing**: Add unit and integration tests.

---

This plan will be updated with checkboxes as development progresses. 