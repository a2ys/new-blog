"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/core";

const LANGUAGES = [
  { value: "plaintext", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "tsx", label: "TSX / JSX" },
  { value: "python", label: "Python" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "json", label: "JSON" },
  { value: "bash", label: "Bash / Shell" },
  { value: "sql", label: "SQL" },
  { value: "markdown", label: "Markdown" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "r", label: "R" },
];

export function CodeBlockComponent({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className="my-6 border-2 border-black overflow-hidden">
      <div
        contentEditable={false}
        className="flex items-center justify-between bg-gray-950 border-b border-white/10 px-4 py-2"
      >
        <select
          value={node.attrs.language ?? "plaintext"}
          onChange={(e) => updateAttributes({ language: e.target.value })}
          className="text-xs bg-transparent text-gray-400 border-none focus:outline-none cursor-pointer hover:text-white transition-colors"
        >
          {LANGUAGES.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              className="bg-gray-900 text-gray-200"
            >
              {label}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-700 select-none font-mono">
          code
        </span>
      </div>
      <pre className="!m-0 !rounded-none !border-none bg-gray-950 px-5 py-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
        <NodeViewContent className="font-mono text-gray-100 !bg-transparent" />
      </pre>
    </NodeViewWrapper>
  );
}
