import React, { useState, useRef, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import copy from "copy-to-clipboard";

const TEMPLATES = [
  {
    name: "User Profile",
    value: `{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "roles": ["user", "admin"]
}`
  },
  {
    name: "Product Schema",
    value: `{
  "id": 101,
  "name": "Widget",
  "price": 19.99,
  "tags": ["gadget", "tool"]
}`
  },
  {
    name: "Empty Object",
    value: `{

}`
  }
];

function highlight(code) {
  return Prism.highlight(code, Prism.languages.json, "json");
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [template, setTemplate] = useState("");
  const inputRef = useRef();
  const outputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleFormat();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        if (document.activeElement === outputRef.current) {
          e.preventDefault();
          handleCopy();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError("");
    } catch (e) {
      setOutput("");
      setError(e.message || "Invalid JSON");
    }
  };

  const handleCopy = () => {
    if (output) copy(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleTemplate = (e) => {
    const val = e.target.value;
    setTemplate(val);
    setInput(val);
    setOutput("");
    setError("");
  };

  return (
    <div className="flex flex-row w-full h-full p-6 gap-6 bg-zinc-950">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center mb-2 gap-2">
          <label className="text-zinc-400 text-sm">Input JSON</label>
          <select
            className="ml-2 bg-zinc-800 text-zinc-200 rounded px-2 py-1 text-xs border border-zinc-700 focus:outline-none"
            value={template}
            onChange={handleTemplate}
            title="Insert JSON template"
          >
            <option value="">Templates…</option>
            {TEMPLATES.map((tpl) => (
              <option key={tpl.name} value={tpl.value}>{tpl.name}</option>
            ))}
          </select>
          <button
            className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
            onClick={handleClear}
            title="Clear input and output (Ctrl+L)"
          >
            Clear
          </button>
        </div>
        <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden">
          <Editor
            value={input}
            onValueChange={setInput}
            highlight={highlight}
            padding={12}
            textareaId="json-input"
            textareaRef={inputRef}
            className="font-mono text-sm min-h-[180px] max-h-[400px] outline-none text-zinc-100 bg-zinc-900"
            placeholder="Paste or type JSON here..."
            style={{ minHeight: 180, background: "#18181b" }}
            aria-label="JSON input"
            spellCheck={false}
            autoFocus
          />
        </div>
        {error && <div className="text-red-500 mt-2 text-xs">{error}</div>}
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors mb-2"
          onClick={handleFormat}
          title="Format JSON (Ctrl+Enter)"
        >
          Format →
        </button>
        <button
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-semibold border border-zinc-700"
          onClick={handleCopy}
          title="Copy formatted JSON (Ctrl+C)"
          disabled={!output}
        >
          Copy
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <label className="mb-2 text-zinc-400 text-sm">Formatted Output</label>
        <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden">
          <Editor
            value={output}
            onValueChange={() => {}}
            highlight={highlight}
            padding={12}
            textareaId="json-output"
            textareaRef={outputRef}
            className="font-mono text-sm min-h-[180px] max-h-[400px] outline-none text-zinc-100 bg-zinc-900"
            placeholder="Formatted JSON will appear here..."
            style={{ minHeight: 180, background: "#18181b" }}
            readOnly
            aria-label="Formatted JSON output"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
} 