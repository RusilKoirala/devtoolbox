import React, { useState, useRef, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import copy from "copy-to-clipboard";

function highlight(code) {
  return Prism.highlight(code, Prism.languages.json, "json");
}

function decodeJwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error("JWT must have 3 parts");
  const decode = (str) => {
    try {
      return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
      throw new Error("Invalid base64 or JSON");
    }
  };
  return {
    header: decode(parts[0]),
    payload: decode(parts[1]),
    signature: parts[2],
  };
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();
  const headerRef = useRef();
  const payloadRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleDecode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        if (document.activeElement === headerRef.current) {
          e.preventDefault();
          copy(header);
        }
        if (document.activeElement === payloadRef.current) {
          e.preventDefault();
          copy(payload);
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

  const handleDecode = () => {
    try {
      const decoded = decodeJwt(input.trim());
      setHeader(JSON.stringify(decoded.header, null, 2));
      setPayload(JSON.stringify(decoded.payload, null, 2));
      setError("");
    } catch (e) {
      setHeader("");
      setPayload("");
      setError(e.message || "Invalid JWT");
    }
  };

  const handleClear = () => {
    setInput("");
    setHeader("");
    setPayload("");
    setError("");
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6 bg-zinc-950">
      <div className="flex flex-row gap-6 flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">JWT Token</label>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={handleClear}
              title="Clear input and output (Ctrl+L)"
            >
              Clear
            </button>
          </div>
          <textarea
            ref={inputRef}
            className="flex-1 resize-none bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] max-h-[120px]"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste JWT token here..."
            aria-label="JWT input"
            spellCheck={false}
            autoFocus
          />
          {error && <div className="text-red-500 mt-2 text-xs">{error}</div>}
          <button
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
            onClick={handleDecode}
            title="Decode JWT (Ctrl+Enter)"
          >
            Decode
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">Header</label>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={() => copy(header)}
              title="Copy header JSON (Ctrl+C when focused)"
              disabled={!header}
            >
              Copy
            </button>
          </div>
          <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden">
            <Editor
              value={header}
              onValueChange={() => {}}
              highlight={highlight}
              padding={12}
              textareaId="jwt-header"
              textareaRef={headerRef}
              className="font-mono text-sm min-h-[80px] max-h-[120px] outline-none text-zinc-100 bg-zinc-900"
              placeholder="Decoded header..."
              readOnly
              aria-label="JWT header output"
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">Payload</label>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={() => copy(payload)}
              title="Copy payload JSON (Ctrl+C when focused)"
              disabled={!payload}
            >
              Copy
            </button>
          </div>
          <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden">
            <Editor
              value={payload}
              onValueChange={() => {}}
              highlight={highlight}
              padding={12}
              textareaId="jwt-payload"
              textareaRef={payloadRef}
              className="font-mono text-sm min-h-[80px] max-h-[120px] outline-none text-zinc-100 bg-zinc-900"
              placeholder="Decoded payload..."
              readOnly
              aria-label="JWT payload output"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
      <div className="text-xs text-zinc-500 mt-2">
        <span className="font-mono">Tip: JWTs are not validated or verified. This tool only decodes the token structure.</span>
      </div>
    </div>
  );
} 