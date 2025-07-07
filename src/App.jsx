import { useState } from 'react';
import Sidebar from './components/Sidebar';
import JsonFormatter from './tools/JsonFormatter';
import JwtDecoder from './tools/JwtDecoder';
import RegexTester from './tools/RegexTester';
import UuidGenerator from './tools/UuidGenerator';
import Base64Converter from './tools/Base64Converter';
import MarkdownPreviewer from './tools/MarkdownPreviewer';
import './App.css';

const TOOL_COMPONENTS = {
  json: JsonFormatter,
  jwt: JwtDecoder,
  regex: RegexTester,
  uuid: UuidGenerator,
  base64: Base64Converter,
  markdown: MarkdownPreviewer,
};

function App() {
  const [selectedTool, setSelectedTool] = useState('json');
  const ToolComponent = TOOL_COMPONENTS[selectedTool] || (() => <div className="text-zinc-400 p-8">Coming soon…</div>);

  return (
    <div className="w-screen h-screen flex bg-zinc-950 text-zinc-100">
      <aside className="bg-zinc-900 text-zinc-200 w-20 flex flex-col items-center py-4 h-full border-r border-zinc-800 select-none">
        <Sidebar selected={selectedTool} onSelect={setSelectedTool} />
      </aside>
      <main className="flex-1 h-full overflow-hidden">
        <ToolComponent />
      </main>
    </div>
  );
}

export default App;
