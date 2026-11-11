'use client';

import { useState } from 'react';

type File = { name: string; lang: string; code: string };

const files: File[] = [
  {
    name: 'agent.py',
    lang: 'python',
    code: `from fastapi import FastAPI
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma

app = FastAPI(title="NEXUS")

@app.post("/analyze")
async def analyze(question: str):
    chain = RetrievalQA.from_chain_type(
        llm=llm, retriever=retriever
    )
    return {"answer": chain.run(question)}
`,
  },
  {
    name: 'rag.ts',
    lang: 'typescript',
    code: `export async function retrieve(q: string) {
  const emb = await embed(q);
  const hits = await vector.search(emb, 8);
  return hits.map(h => h.text);
}
`,
  },
  {
    name: 'schema.sql',
    lang: 'sql',
    code: `CREATE TABLE metrics (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  value numeric,
  source text,
  verified boolean DEFAULT false
);
`,
  },
];

export default function CursorEditor() {
  const [active, setActive] = useState(0);
  const [panel, setPanel] = useState(true);
  const [selected] = useState(true);

  const file = files[active];

  return (
    <section id="editor" className="px-6 md:px-16 py-24 border-t border-[#29272A]">
      <div className="text-xs tracking-[.24em] text-[#929095] uppercase mb-10">
        <span className="text-[#F12B43]">07</span> · Cursor-style Editor
      </div>
      <h2 className="text-[clamp(40px,7vw,104px)] leading-[.92] uppercase font-black mb-12">
        Code like a product.
      </h2>

      <div className="glass rounded-2xl overflow-hidden border border-[#29272A] shadow-2xl">
        {/* title bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#29272A] bg-[#080809]/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F12B43]" />
            <span className="w-3 h-3 rounded-full bg-[#929095]" />
            <span className="w-3 h-3 rounded-full bg-[#29272A]" />
          </div>
          <div className="text-xs uppercase tracking-[.2em] text-[#929095]">samyak-anand-portfolio</div>
          <button
            onClick={() => setPanel((p) => !p)}
            className="text-xs uppercase tracking-[.2em] border border-[#29272A] px-3 py-1 hover:border-[#F12B43] hover:text-[#F12B43]"
          >
            {panel ? 'Hide AI' : 'Show AI'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* sidebar */}
          <aside className="md:w-56 border-b md:border-b-0 md:border-r border-[#29272A] bg-[#080809]/40 p-3">
            <div className="text-[10px] uppercase tracking-[.2em] text-[#929095] mb-2">Explorer</div>
            <ul className="space-y-1">
              {files.map((f, i) => (
                <li key={f.name}>
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full text-left px-2 py-1 text-sm font-mono rounded ${
                      i === active ? 'bg-[#F12B43]/20 text-[#F12B43]' : 'text-[#929095] hover:text-white'
                    }`}
                  >
                    {f.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* editor */}
          <div className="flex-1 relative">
            {/* tabs */}
            <div className="flex border-b border-[#29272A] bg-[#080809]/40">
              {files.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2 text-xs font-mono border-r border-[#29272A] ${
                    i === active ? 'bg-[#12121b] text-white' : 'text-[#929095] hover:text-white'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
            {/* code */}
            <div className="relative p-4 font-mono text-sm leading-6 overflow-auto max-h-[420px]">
              <pre className="m-0">
                {file.code.split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-8 text-right pr-3 text-[#929095] select-none">{idx + 1}</span>
                    <span className={selected && idx >= 2 && idx <= 5 ? 'bg-[#F12B43]/20' : ''}>{line || ' '}</span>
                  </div>
                ))}
              </pre>
              {/* floating toolbar */}
              {selected && (
                <div className="absolute top-16 right-6 glass border border-[#F12B43]/40 rounded-lg px-3 py-2 flex gap-2 text-xs">
                  <button className="hover:text-[#F12B43]">Explain</button>
                  <button className="hover:text-[#F12B43]">Refactor</button>
                  <button className="hover:text-[#F12B43]">Tests</button>
                </div>
              )}
            </div>
            {/* status bar */}
            <div className="flex items-center justify-between px-4 py-1 border-t border-[#29272A] bg-[#080809]/60 text-[10px] uppercase tracking-[.2em] text-[#929095]">
              <span>{file.lang} · UTF-8</span>
              <span>Ln 3, Col 12</span>
            </div>
          </div>

          {/* AI panel */}
          {panel && (
            <aside className="md:w-72 border-t md:border-t-0 md:border-l border-[#29272A] bg-[#080809]/40 p-4">
              <div className="text-[10px] uppercase tracking-[.2em] text-[#F12B43] mb-3">AI Assistant</div>
              <div className="glass rounded-lg p-3 text-sm text-[#929095] mb-3">
                Selected block looks like a RAG retrieval step. Want me to add caching + retries?
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-xs uppercase tracking-[.2em] border border-[#29272A] py-2 hover:border-[#F12B43] hover:text-[#F12B43]">Accept</button>
                <button className="flex-1 text-xs uppercase tracking-[.2em] border border-[#29272A] py-2 hover:border-[#F12B43] hover:text-[#F12B43]">Reject</button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
