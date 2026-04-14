export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; initials: string };
  date: string;
  category: "Product" | "Engineering" | "Company";
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-nexus-context-layer",
    title: "Introducing the Nexus Context Layer: Reasoning That Never Forgets",
    excerpt:
      "Today we're launching the Context Layer — a persistent knowledge graph that fuses your tools, documents, and live signals into a single coherent model of your business. It's the foundation for proactive intelligence.",
    content: `For years, AI assistants have operated in a stateless world. You ask a question, get an answer, and the system immediately forgets everything. The Nexus Context Layer changes that paradigm entirely.\n\nOur engineering team spent eighteen months building a persistent knowledge graph that continuously ingests signals from your connected tools — email, CRM, project management, internal wikis, and more. The result is a living model of your organization that updates in real time and reasons across boundaries that previously required manual synthesis.\n\nWhat makes the Context Layer unique is its ability to surface connections that humans routinely miss. When a support ticket references a feature request from six months ago, Nexus links them automatically. When a contract renewal coincides with declining engagement metrics, you'll know before the quarterly review.\n\nWe're rolling out the Context Layer to all Pro and Enterprise customers starting this week, with Starter plans gaining access in Q2. If you're interested in an early walkthrough, reach out to your account team or book a session through the dashboard.`,
    author: { name: "Elena Vasquez", initials: "EV" },
    date: "2026-03-28",
    category: "Product",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "scaling-inference-at-the-edge",
    title: "Scaling Inference at the Edge: How We Cut Latency by 60%",
    excerpt:
      "Our infrastructure team redesigned the inference pipeline to route queries across regional endpoints. The result: 60% lower latency and a 40% reduction in compute costs for Enterprise customers.",
    content: `Latency is the silent killer of AI adoption. When an executive asks a question and waits four seconds for a response, trust erodes. Our goal was to bring median response times under 800 milliseconds without sacrificing reasoning quality.\n\nThe breakthrough came from rethinking how we route inference requests. Rather than funneling everything through a central cluster, we deployed lightweight reasoning nodes across twelve regional endpoints. Each node maintains a compressed copy of the customer's context graph, enabling local reasoning for 70% of common query patterns.\n\nFor complex multi-hop queries that require the full context layer, we implemented a speculative execution strategy. The regional node begins generating a response while simultaneously forwarding the query to the central cluster. In most cases, the local response is sufficient; when it isn't, the central response arrives with minimal perceived delay.\n\nThe numbers speak for themselves: median latency dropped from 2.1 seconds to 780 milliseconds across our Enterprise cohort. We also observed a 40% reduction in compute costs thanks to the distributed workload. These improvements are live for all customers — no configuration changes required.`,
    author: { name: "Marcus Chen", initials: "MC" },
    date: "2026-03-15",
    category: "Engineering",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "nexus-ai-series-b-announcement",
    title: "Nexus AI Raises $120M Series B to Accelerate Enterprise Intelligence",
    excerpt:
      "We're thrilled to announce our $120M Series B led by Meridian Ventures. This funding accelerates our mission to make proactive AI the default operating layer for knowledge work.",
    content: `Today marks a milestone in the Nexus AI journey. We've closed a $120M Series B round led by Meridian Ventures, with participation from our existing investors at Foundry Capital and new strategic partners.\n\nThis funding validates what our customers have been telling us for months: the era of reactive, prompt-driven AI is ending. Organizations need intelligence that anticipates, synthesizes, and acts — not just responds. Our Context Layer and proactive briefing engine represent the first generation of this new paradigm.\n\nThe capital will be deployed across three priorities. First, we're doubling our engineering team to accelerate the roadmap for workflow orchestration and multi-agent collaboration. Second, we're expanding our go-to-market presence in Europe and Asia-Pacific. Third, we're investing in foundational research around reasoning architectures that can operate over longer time horizons.\n\nTo our customers, partners, and team: this is just the beginning. The vision for Nexus has always been larger than any single product. We're building the intelligence layer that makes every organization smarter, faster, and more aware.`,
    author: { name: "Priya Nair", initials: "PN" },
    date: "2026-02-20",
    category: "Company",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "building-trust-with-observability",
    title: "Building Trust with Observability: Why We Open-Sourced Our Trace Format",
    excerpt:
      "Enterprises need to audit every inference. We've open-sourced our trace format so teams can prove lineage, compare prompt versions, and build confidence in AI-driven decisions.",
    content: `In regulated industries, trust isn't built on demos — it's built on audit trails. When a compliance officer asks "why did the system recommend this action?", the answer needs to be specific, verifiable, and reproducible.\n\nThat's why we designed our observability suite from day one with full inference tracing. Every query that flows through Nexus generates a structured trace that captures the input context, reasoning steps, model selection, and output generation. These traces are immutable, timestamped, and stored in customer-controlled infrastructure.\n\nToday we're taking the next step by open-sourcing our trace format specification. By standardizing how AI reasoning is recorded, we hope to accelerate industry-wide adoption of responsible AI practices. The specification is available on our GitHub and includes reference implementations in Python, TypeScript, and Go.\n\nWe've also shipped a new Trace Explorer in the Nexus dashboard. Teams can search, filter, and compare traces across time periods, models, and prompt versions. It's the kind of tooling that turns black-box AI into something your risk and compliance teams can actually endorse.`,
    author: { name: "Marcus Chen", initials: "MC" },
    date: "2026-01-30",
    category: "Engineering",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "proactive-briefings-for-executives",
    title: "Proactive Briefings: How AI Prepares Your Morning Before You Do",
    excerpt:
      "Our newest feature delivers curated daily briefings that flag risks, highlight opportunities, and surface action items — all before your first meeting starts.",
    content: `The most valuable information in any organization is the connection between data points that no single person has time to make. A delayed shipment in one region, a spike in support tickets for a specific product line, and a competitor announcement — individually routine, collectively urgent.\n\nProactive Briefings is our answer to information overload. Every morning (or on-demand), Nexus synthesizes signals from your connected tools and generates a prioritized digest tailored to your role. A COO sees supply chain anomalies. A VP of Sales sees pipeline risks. A Head of Product sees feature adoption trends.\n\nWhat sets Briefings apart from traditional dashboards is the reasoning layer. Nexus doesn't just aggregate metrics — it interprets them. When revenue from a key account drops, the briefing doesn't just flag the number. It correlates the drop with reduced login frequency, an unresolved support escalation, and an upcoming renewal date. The result is a briefing that reads like it was written by a chief of staff who knows your business intimately.\n\nProactive Briefings are available now for all Pro and Enterprise customers. Starter customers can access a weekly digest version. Configuration takes less than five minutes in the dashboard.`,
    author: { name: "Elena Vasquez", initials: "EV" },
    date: "2025-12-12",
    category: "Product",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "nexus-ai-culture-and-values",
    title: "The Culture Behind the Code: How We Build at Nexus AI",
    excerpt:
      "Great products come from great teams. Here's a look inside our engineering culture — from architecture reviews to Friday demos — and the values that guide how we ship.",
    content: `Behind every feature we ship is a set of principles that guide how we work. We don't have a manifesto pinned to the wall — instead, these values live in our code reviews, architecture decisions, and the conversations we have when things go wrong.\n\nFirst: we optimize for reversibility. In a fast-moving domain like AI, the cost of being wrong is lower than the cost of being slow. Our architecture is designed around feature flags, gradual rollouts, and instant rollback. This lets us ship with confidence without requiring certainty.\n\nSecond: we write for the reader. Code is read far more than it is written, and our codebase is our primary documentation. Every pull request includes context about why a change was made, not just what changed. Architecture Decision Records capture the tradeoffs we considered and the alternatives we rejected.\n\nThird: we demo every Friday. Every team presents what they shipped that week to the entire company. There's no slide deck, no rehearsal — just live product. This ritual keeps us honest, creates cross-team visibility, and ensures that every engineer sees the impact of their work in context. It's also the most fun hour of the week.`,
    author: { name: "Priya Nair", initials: "PN" },
    date: "2025-11-05",
    category: "Company",
    readTime: "5 min read",
    featured: false,
  },
];
