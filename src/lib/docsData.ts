export interface DocItem {
  title: string;
  slug: string;
  content: string;
  codeExample?: string;
}

export interface DocSection {
  title: string;
  slug: string;
  items: DocItem[];
}

export const docsData: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      {
        slug: "introduction",
        title: "Introduction to Nexus AI",
        content: `Nexus AI is a persistent intelligence layer that unifies your company's knowledge. Unlike traditional chat assistants that forget context between sessions, Nexus maintains a continuous knowledge graph of your operations, enabling proactive insights and deep reasoning.\n\nWhether you are integrating through our dashboard or building custom workflows via the API, the core primitive remains the same: context. Nexus connects to your data sources, interprets relationships, and surfaces answers before you even ask the question.`,
      },
      {
        slug: "quickstart",
        title: "Quickstart Guide",
        content: `To get started with Nexus, you first need an API key. Navigate to your dashboard, select 'Developer Settings', and generate a new key. We recommend keeping this key secure and using environment variables.\n\nOnce you have your key, you can initialize the client and make your first inference request. The Context Layer will automatically begin indexing any connected data sources immediately.`,
        codeExample: `import { NexusClient } from '@nexus-ai/client';

const client = new NexusClient(process.env.NEXUS_API_KEY);

const response = await client.reason({
  query: "What is stalling the current quarter renewals?",
  useContext: true
});

console.log(response.synthesis);`,
      },
      {
        slug: "authentication",
        title: "Authentication",
        content: `All API requests must be authenticated via a Bearer token in the Authorization header. If a request is unauthenticated or uses an expired token, the API will return a 401 Unauthorized response.\n\nFor enterprise customers, we also support OAuth 2.0 flows for securely delegating access to third-party applications without exposing root keys.`,
        codeExample: `// Example HTTP request with standard fetch
const req = await fetch('https://api.nexus.ai/v1/context', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  }
});`,
      },
    ],
  },
  {
    title: "Core Concepts",
    slug: "core-concepts",
    items: [
      {
        slug: "context-layer",
        title: "The Context Layer",
        content: `The Context Layer is the beating heart of Nexus. It is a multimodal vector database fused with a structured knowledge graph. Every document, chat message, and ticket you connect is mapped not just by semantic similarity, but by entity relationships.\n\nThis architecture ensures that when Nexus reasons across thousands of documents, it doesn't just surface text snippets — it navigates the actual operational structure of your business.`,
      },
      {
        slug: "proactive-agents",
        title: "Proactive Agents",
        content: `While you can prompt Nexus manually, its true power lies in Proactive Agents. These are asynchronous workers that continuously monitor your Context Layer for specific signal patterns.\n\nFor example, an agent can be configured to monitor Salesforce and Jira simultaneously, alerting the account manager when a high-value customer with an upcoming renewal submits a critical bug report.`,
        codeExample: `// Defining a proactive trigger
client.agents.create({
  name: "Churn Risk Monitor",
  triggers: ["Salesforce.Renewal < 30d", "Jira.Priority == Blocker"],
  action: {
    type: "slack_alert",
    channel: "#revenue-risks"
  }
});`,
      },
      {
        slug: "tracing",
        title: "Inference Tracing",
        content: `To ensure trust and compliance, every decision made by Nexus is fully traceable. The tracing engine captures the exact state of the Context Layer at the time of inference, the reasoning steps taken, and the data sources cited.\n\nTraces can be exported in our open-source format, making it easy for compliance teams to audit AI actions long after they occur.`,
      },
    ],
  },
  {
    title: "API Reference",
    slug: "api-reference",
    items: [
      {
        slug: "reasoning-api",
        title: "Reasoning API",
        content: `The Reasoning API is the primary endpoint for querying the Context Layer. It accepts a natural language query and an optional set of constraints, returning a synthesized response alongside citation metadata.\n\nThe API supports streaming responses via Server-Sent Events (SSE) for low-latency integrations.`,
        codeExample: `POST /v1/reason
{
  "query": "Summarize Q3 board feedback on pricing",
  "stream": true,
  "filters": {
    "sources": ["notion", "gdrive"],
    "dateRange": "2025-Q3"
  }
}`,
      },
      {
        slug: "ingestion-api",
        title: "Ingestion API",
        content: `Use the Ingestion API to push custom data into your Context Layer in real-time. This is ideal for internal tools that aren't supported by our native integrations.\n\nPayloads are processed asynchronously. You will receive a job ID to poll for status, though most small documents are indexed within milliseconds.`,
        codeExample: `POST /v1/ingest
{
  "type": "document",
  "title": "Internal Strategy Memo",
  "content": "...raw text...",
  "metadata": {
    "department": "exec",
    "confidentiality": "high"
  }
}`,
      },
      {
        slug: "webhooks",
        title: "Webhooks",
        content: `Webhooks allow your system to receive real-time HTTP push notifications when Proactive Agents triggered or when large ingestion jobs complete.\n\nAlways verify the webhook signature using your workspace secret to prevent spoofing attacks. We use standard HMAC-SHA256 signing.`,
      },
    ],
  },
  {
    title: "Integrations",
    slug: "integrations",
    items: [
      {
        slug: "slack",
        title: "Slack Integration",
        content: `The Slack integration allows your team to query Nexus directly from any channel using the /nexus command or by mentioning the bot. Nexus automatically scopes its answers based on the permission level of the user asking the question.\n\nAdditionally, Proactive Agents can route alerts and daily briefings directly to specific Slack channels or DMs.`,
      },
      {
        slug: "salesforce",
        title: "Salesforce CRM",
        content: `Connect Salesforce to allow Nexus to monitor pipeline health, account histories, and customer interactions. Nexus links this CRM data with external communications (like emails) to build a complete picture of an account.\n\nInstallation requires Salesforce Admin privileges to configure the connected app and assign integration permissions.`,
      },
      {
        slug: "github",
        title: "GitHub",
        content: `By connecting GitHub, Nexus can reason over code repositories, pull requests, and issues. This allows engineering managers to ask complex questions like "Which team is currently working on the caching layer?" or "Summarize the architectural changes in the last sprint."\n\nWe support both GitHub Cloud and GitHub Enterprise Server.`,
      },
    ],
  },
];
