import React, { useState, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

function isBase64(str) {
  try {
    return btoa(atob(str)) === str.replace(/\s/g, "");
  } catch {
    return false;
  }
}

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef();
  const outputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleConvert();
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

  const handleConvert = () => {
    setError("");
    setImagePreview(null);
    try {
      if (mode === "encode") {
        // Text to Base64
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        // Base64 to Text or Image
        if (isBase64(input)) {
          const decoded = decodeURIComponent(escape(atob(input.replace(/\s/g, ""))));
          setOutput(decoded);
          // Try to preview as image
          if (/^data:image\//.test(decoded) || /^\x89PNG/.test(decoded) || /^\xff\xd8/.test(decoded)) {
            setImagePreview("data:image/*;base64," + input.replace(/\s/g, ""));
          }
        } else {
          setError("Invalid Base64 string");
          setOutput("");
        }
      }
    } catch (e) {
      setError("Conversion error: " + (e.message || "Unknown error"));
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) copy(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setImagePreview(null);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(ev.target.result.split(",")[1]);
      setMode("decode");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6 bg-zinc-950">
      <div className="flex flex-row gap-6 flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">Mode</label>
            <select
              className="ml-2 bg-zinc-800 text-zinc-200 rounded px-2 py-1 text-xs border border-zinc-700 focus:outline-none"
              value={mode}
              onChange={e => setMode(e.target.value)}
              title="Encode or decode Base64"
            >
              <option value="encode">Encode (Text → Base64)</option>
              <option value="decode">Decode (Base64 → Text/Image)</option>
            </select>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={handleClear}
              title="Clear all (Ctrl+L)"
            >
              Clear
            </button>
          </div>
          <textarea
            ref={inputRef}
            className="mb-2 flex-1 resize-none bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] max-h-[120px]"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Paste Base64 to decode..."}
            aria-label="Base64 input"
            spellCheck={false}
            autoFocus
          />
          <div className="flex items-center gap-2 mt-2">
            <label className="text-zinc-400 text-xs">Or select image:</label>
            <input
              type="file"
              accept="image/*"
              className="text-xs"
              onChange={handleFile}
              title="Upload image to convert to Base64"
            />
          </div>
          {error && <div className="text-red-500 mt-2 text-xs">{error}</div>}
          <button
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
            onClick={handleConvert}
            title="Convert (Ctrl+Enter)"
          >
            Convert
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-zinc-400 text-sm">Output</label>
            <button
              className="ml-auto px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 border border-zinc-700"
              onClick={handleCopy}
              title="Copy output (Ctrl+C when focused)"
              disabled={!output}
            >
              Copy
            </button>
          </div>
          <textarea
            ref={outputRef}
            className="flex-1 resize-none bg-zinc-900 text-zinc-100 rounded-lg p-3 font-mono text-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] max-h-[120px]"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            aria-label="Base64 output"
            spellCheck={false}
          />
          {imagePreview && (
            <div className="mt-4 flex flex-col items-center">
              <label className="text-zinc-400 text-xs mb-1">Image Preview</label>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-40 rounded border border-zinc-700"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="text-xs text-zinc-500 mt-2">
        <span className="font-mono">Tip: Keyboard: Ctrl+Enter = Convert, Ctrl+C = Copy, Ctrl+L = Clear.</span>
      </div>
    </div>
  );
} 