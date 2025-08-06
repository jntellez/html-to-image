import { useState } from 'react'

export default function Playground() {
  const [html, setHtml] = useState('<div>Hello World</div>')
  const [css, setCss] = useState('div { color: red; }')

  return (
    <main className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">HTML</h2>
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <h2 className="text-2xl font-semibold mt-6 mb-4">CSS</h2>
        <textarea
          className="w-full h-48 p-2 border rounded"
          value={css}
          onChange={(e) => setCss(e.target.value)}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Previsualización</h2>
        <iframe
          title="preview"
          sandbox="allow-scripts allow-same-origin"
          srcDoc={`<style>${css}</style>${html}`}
          className="w-full h-80 border rounded"
        />
      </section>
    </main>
  )
}
