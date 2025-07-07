import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import copy from "copy-to-clipboard";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";

const DEFAULT_MD = `# Markdown Previewer\n\n- Live preview\n- **Bold**, *italic*, [link](https://example.com)\n- Code block:\n\n\u0060\u0060\u0060js\nconsole.log('Hello, world!');\n\u0060\u0060\u0060\n`;

function CodeBlock({ className, children }) {
  const lang = className ? className.replace("language-", "") : "";
  const code = String(children).trim();
  return (
    <pre className={`rounded bg-zinc-900 p-3 overflow-x-auto text-xs mb-2`}>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang || "javascript")
        }}
        className={`language-${lang} font-mono`}
      />
    </pre>
  );
}

export default function MarkdownPreviewer() {
  const [input, setInput] = useState(DEFAULT_MD);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        if (document.activeElement === previewRef.current) {
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

  const handleCopy = () => {
    copy(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleClear = () => {
    setInput("");
    setError("");
  };

  return (
    <div className="flex flex-row w-full h-full p-6 gap-6 bg-zinc-950">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center mb-2 gap-2">
          <label className="text-zinc-400 text-sm">Markdown Input</label>
          <button
            className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
            onClick={handleClear}
            title="Clear input (Ctrl+L)"
          >
            Clear
          </button>
        </div>
        <textarea
          ref={inputRef}
          className="flex-1 resize-none bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[180px] max-h-[400px]"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type Markdown here..."
          aria-label="Markdown input"
          spellCheck={false}
          autoFocus
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center mb-2 gap-2">
          <label className="text-zinc-400 text-sm">Preview</label>
          <button
            className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
            onClick={handleCopy}
            title="Copy Markdown (Ctrl+C when focused)"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div
          ref={previewRef}
          className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 overflow-auto p-4 text-zinc-100 prose prose-invert max-w-none min-h-[180px] max-h-[400px] outline-none"
          tabIndex={0}
          aria-label="Markdown preview"
        >
          <ReactMarkdown
            children={input}
            components={{ code: CodeBlock }}
            linkTarget="_blank"
            skipHtml={false}
          />
        </div>
      </div>
    </div>
  );
} 