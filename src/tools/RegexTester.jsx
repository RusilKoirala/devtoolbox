import React, { useState, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

function highlightMatches(text, regex) {
  if (!regex) return text;
  let lastIndex = 0;
  let result = [];
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    result.push(
      <mark key={key++} className="bg-yellow-600/40 text-yellow-200 rounded px-0.5">
        {match[0]}
      </mark>
    );
    lastIndex = regex.lastIndex;
    if (!regex.global) break;
    if (match[0].length === 0) regex.lastIndex++;
  }
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  return result;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");
  const [matches, setMatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const testRef = useRef();
  const resultRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleTest();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        if (document.activeElement === resultRef.current) {
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

  const handleTest = () => {
    setError("");
    setMatches([]);
    setGroups([]);
    try {
      const re = new RegExp(pattern, flags);
      let m, all = [], groupList = [];
      let i = 0;
      while ((m = re.exec(testString)) !== null) {
        all.push({
          match: m[0],
          index: m.index,
          groups: m.groups || {},
        });
        if (m.groups) {
          groupList.push({
            match: m[0],
            ...m.groups,
            index: m.index,
          });
        }
        if (!re.global) break;
        if (m[0].length === 0) re.lastIndex++;
        i++;
        if (i > 1000) break; // avoid infinite loop
      }
      setMatches(all);
      setGroups(groupList);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCopy = () => {
    if (!matches.length) return;
    const text = matches.map(m => m.match).join("\n");
    copy(text);
  };

  const handleClear = () => {
    setPattern("");
    setFlags("g");
    setTestString("");
    setError("");
    setMatches([]);
    setGroups([]);
  };

  let regex = null;
  try {
    regex = pattern ? new RegExp(pattern, flags) : null;
  } catch {}

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6 bg-zinc-950">
      <div className="flex flex-row gap-6 flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">Pattern</label>
            <input
              className="ml-2 bg-zinc-800 text-zinc-200 rounded px-2 py-1 text-xs border border-zinc-700 focus:outline-none w-32"
              value={flags}
              onChange={e => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
              placeholder="Flags (gimsyu)"
              maxLength={6}
              title="Regex flags (g, i, m, s, u, y)"
            />
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={handleClear}
              title="Clear all (Ctrl+L)"
            >
              Clear
            </button>
          </div>
          <input
            className="mb-2 bg-zinc-900 text-zinc-100 rounded-lg p-2 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            aria-label="Regex pattern"
            spellCheck={false}
            autoFocus
          />
          <label className="mb-2 text-zinc-400 text-sm">Test String</label>
          <textarea
            ref={testRef}
            className="flex-1 resize-none bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] max-h-[120px]"
            value={testString}
            onChange={e => setTestString(e.target.value)}
            placeholder="Enter test string..."
            aria-label="Test string"
            spellCheck={false}
          />
          {error && <div className="text-red-500 mt-2 text-xs">{error}</div>}
          <button
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
            onClick={handleTest}
            title="Test regex (Ctrl+Enter)"
          >
            Test
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">Matches</label>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={handleCopy}
              title="Copy matches (Ctrl+C when focused)"
              disabled={!matches.length}
            >
              Copy
            </button>
          </div>
          <div
            ref={resultRef}
            className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 overflow-auto p-3 font-mono text-sm text-zinc-100 min-h-[80px] max-h-[120px] outline-none"
            tabIndex={0}
            aria-label="Regex match results"
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {testString && regex ? highlightMatches(testString, regex) : <span className="text-zinc-500">No matches</span>}
          </div>
          {matches.length > 0 && (
            <div className="mt-2 text-xs text-zinc-400">
              <div>Matches: {matches.length}</div>
              <ul className="list-disc ml-4">
                {matches.map((m, i) => (
                  <li key={i}>
                    <span className="text-zinc-200">{JSON.stringify(m.match)}</span> at <span className="text-blue-400">{m.index}</span>
                    {m.groups && Object.keys(m.groups).length > 0 && (
                      <span> | Groups: {JSON.stringify(m.groups)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="text-xs text-zinc-500 mt-2">
        <span className="font-mono">Tip: Use <b>g</b> for global, <b>i</b> for ignore case, <b>m</b> for multiline, etc. Keyboard: Ctrl+Enter = Test, Ctrl+C = Copy, Ctrl+L = Clear.</span>
      </div>
    </div>
  );
} 