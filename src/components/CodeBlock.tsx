"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  filename,
}: CodeBlockProps) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    codeToHtml(code, {
      lang: language,
      theme: "github-dark",
    }).then(setHtml);
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-[var(--color-border)] my-6 bg-[#0d1117]">
      {filename && (
        <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-2.5 text-xs text-[var(--color-text-muted)] flex items-center pr-16 gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
          {filename}
        </div>
      )}
      
      <button
        onClick={handleCopy}
        className={`absolute right-2 flex items-center gap-1 bg-[#1a1a1a] border border-[#333333] rounded-lg p-1.5 text-gray-400 hover:text-white transition z-10 ${
          filename ? "top-1.5" : "top-2"
        }`}
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium px-1 text-green-500">Copied!</span>
          </>
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <div
        className="text-sm overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
