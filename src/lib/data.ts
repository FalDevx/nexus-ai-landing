import {
  Brain,
  Zap,
  Shield,
  Layers,
  BarChart3,
  Cpu,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  label?: string;
}

export interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  highlighted?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/#about" },
];

export const heroContent = {
  headline: "The AI Dashboard That Thinks Before You Ask",
  subheadline:
    "A complete AI dashboard template that predicts user behavior, automates workflows, and helps teams make decisions faster — ready to deploy in minutes.",
  primaryCta: { label: "Get the Template", href: "#pricing" },
  secondaryCta: { label: "Live Demo →", href: "/dashboard" },
};

export const features: Feature[] = [
  {
    title: "Neural Intent Engine",
    description:
      "Predictive modeling that understands not just what you're doing, but what you intend to achieve next.",
    icon: "brain",
    label: "COGNITION",
  },
  {
    title: "Autonomous Workflows",
    description:
      "System-level automation that handles complex multi-step processes across your entire tech stack.",
    icon: "workflow",
    label: "EFFICIENCY",
  },
  {
    title: "Institutional Guardrails",
    description:
      "Enterprise-grade security and ethical AI compliance built into every interaction and data point.",
    icon: "shield-check",
    label: "SECURITY",
  },
  {
    title: "Real-time Synthesis",
    description:
      "Instant processing of millions of data points into actionable executive-level summaries and briefs.",
    icon: "sparkles",
    label: "INSIGHT",
  },
  {
    title: "Predictive Scaling",
    description:
      "Infrastructure that automatically adjusts to your computational needs before spikes even happen.",
    icon: "gauge",
    label: "PERFORMANCE",
  },
  {
    title: "Decision Intelligence",
    description:
      "Advanced analytics that provide probability-based recommendations for high-stakes business decisions.",
    icon: "line-chart",
    label: "STRATEGY",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Standard",
    price: { monthly: 79, yearly: 69 },
    description: "Ideal for growing teams seeking to automate core internal processes.",
    features: [
      "Core Neural Intent Engine",
      "Up to 10 Autonomous Workflows",
      "Standard Security Protocol",
      "Email & Chat Support",
      "Basic Analytics Dashboard",
    ],
    cta: { label: "Start free trial", href: "/register" },
  },
  {
    name: "Enterprise",
    price: { monthly: 199, yearly: 179 },
    description: "Advanced intelligence for organizations requiring absolute precision and scale.",
    features: [
      "Full Cognitive Suite",
      "Unlimited Autonomous Workflows",
      "Institutional Guardrails (SLA)",
      "Dedicated AI Architect",
      "Custom Model Training",
      "White-glove Implementation",
    ],
    cta: { label: "Contact sales", href: "/register" },
    highlighted: true,
  },
  {
    name: "Institutional",
    price: { monthly: 499, yearly: 449 },
    description: "The ultimate tier for global enterprises operating at the edge of possibility.",
    features: [
      "Quantum-ready Architecture",
      "Private Air-gapped Deployment",
      "Full Regulatory Compliance Pack",
      "24/7/365 Elite Response Team",
      "Unlimited Scale & Performance",
    ],
    cta: { label: "Inquire now", href: "/register" },
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Nexus AI has fundamentally changed how we approach decision making. It's no longer about finding data, but about acting on it.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Synthetix",
    initials: "SC",
  },
  {
    quote: "The only AI that actually feels like a partner, not just a tool. It understands our context better than we do sometimes.",
    name: "Marcus Thorne",
    role: "Chief Digital Officer",
    company: "Global Logistics",
    initials: "MT",
  },
  {
    quote: "Implementation was seamless, and the results were immediate. We've seen a 40% increase in operational velocity.",
    name: "Elena Rodriguez",
    role: "Director of Innovation",
    company: "Horizon Health",
    initials: "ER",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "How does the 'Intent Engine' differ from regular LLMs?",
    answer: "Unlike standard LLMs that generate text based on prompts, our Intent Engine analyzes systemic signals, past workflows, and real-time context to predict the outcome you want to achieve, often before a prompt is even written.",
  },
  {
    question: "Is our institutional data used to train public models?",
    answer: "Absolutely not. Nexus AI follows a strict privacy-first architecture. Any training or fine-tuning occurs within your private, encrypted instance. Your data never leaves your environment.",
  },
  {
    question: "What does 'Institutional Guardrails' actually mean?",
    answer: "It's our suite of enterprise-grade security protocols, including SOC2 Type II compliance, localized data residency, and automated ethical AI filtering to prevent bias and ensure regulatory adherence.",
  },
  {
    question: "Can we integrate Nexus with our existing legacy systems?",
    answer: "Yes. Nexus was built with an API-first philosophy. We have pre-built connectors for major ERP, CRM, and cloud platforms, and a robust SDK for custom integrations.",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/" },
      { label: "Architecture", href: "/#architecture" },
      { label: "Security", href: "/#pricing" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/blog" },
      { label: "Contact", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API reference", href: "/docs" },
      { label: "Status", href: "/" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/" },
      { label: "Terms", href: "/" },
      { label: "DPA", href: "/" },
      { label: "Cookies", href: "/" },
    ],
  },
];
