import React from "react";

const tools = [
  { key: "json", label: "JSON", tooltip: "JSON Formatter" },
  { key: "jwt", label: "JWT", tooltip: "JWT Decoder" },
  { key: "regex", label: "Regex", tooltip: "Regex Tester" },
  { key: "uuid", label: "UUID", tooltip: "UUID Generator" },
  { key: "base64", label: "B64", tooltip: "Base64 Encoder/Decoder" },
  { key: "markdown", label: "MD", tooltip: "Markdown Previewer" },
];

export default function Sidebar({ selected, onSelect }) {
  return (
    <aside className="bg-zinc-900 text-zinc-200 w-20 flex flex-col items-center py-4 h-full border-r border-zinc-800 select-none">
      {tools.map((tool) => (
        <button
          key={tool.key}
          className={`my-2 w-12 h-12 flex items-center justify-center rounded-lg transition-colors relative group ${selected === tool.key ? "bg-zinc-800 text-blue-400" : "hover:bg-zinc-800"}`}
          onClick={() => onSelect(tool.key)}
          title={tool.tooltip}
          tabIndex={0}
        >
          <span className="text-lg font-semibold">{tool.label}</span>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-zinc-800 text-xs text-zinc-100 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
            {tool.tooltip}
          </span>
        </button>
      ))}
      <div className="flex-1" />
    </aside>
  );
} 