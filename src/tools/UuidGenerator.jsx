import React, { useState, useRef, useEffect } from "react";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import copy from "copy-to-clipboard";

const UUID_EXPLANATION = `A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information.\n\n- v1: Time-based (includes timestamp and MAC address)\n- v4: Random (fully random or pseudo-random)`;

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [version, setVersion] = useState("v4");
  const uuidRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleGenerate();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        if (document.activeElement === uuidRef.current) {
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

  const handleGenerate = () => {
    setUuid(version === "v1" ? uuidv1() : uuidv4());
  };

  const handleCopy = () => {
    if (uuid) copy(uuid);
  };

  const handleClear = () => {
    setUuid("");
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6 bg-zinc-950">
      <div className="flex flex-row gap-6 flex-1 items-start">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">UUID Version</label>
            <select
              className="ml-2 bg-zinc-800 text-zinc-200 rounded px-2 py-1 text-xs border border-zinc-700 focus:outline-none"
              value={version}
              onChange={e => setVersion(e.target.value)}
              title="Select UUID version"
            >
              <option value="v1">v1 (time-based)</option>
              <option value="v4">v4 (random)</option>
            </select>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={handleClear}
              title="Clear UUID (Ctrl+L)"
            >
              Clear
            </button>
          </div>
          <button
            className="mb-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
            onClick={handleGenerate}
            title="Generate UUID (Ctrl+Enter)"
          >
            Generate
          </button>
          <label className="mb-2 text-zinc-400 text-sm">Generated UUID</label>
          <input
            ref={uuidRef}
            className="mb-2 bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={uuid}
            readOnly
            placeholder="UUID will appear here..."
            aria-label="Generated UUID"
            spellCheck={false}
          />
          <button
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-semibold border border-zinc-700"
            onClick={handleCopy}
            title="Copy UUID (Ctrl+C when focused)"
            disabled={!uuid}
          >
            Copy
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <label className="mb-2 text-zinc-400 text-sm">UUID Format Explanation</label>
          <pre className="flex-1 bg-zinc-900 text-zinc-300 rounded-lg p-4 font-mono text-xs border border-zinc-800 whitespace-pre-wrap">
            {UUID_EXPLANATION}
          </pre>
        </div>
      </div>
      <div className="text-xs text-zinc-500 mt-2">
        <span className="font-mono">Tip: Keyboard: Ctrl+Enter = Generate, Ctrl+C = Copy, Ctrl+L = Clear.</span>
      </div>
    </div>
  );
} 