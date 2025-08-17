import { useState } from "react";
import { Preview } from "@/components/playground/preview";
import { EditorLayout } from "@/components/playground/editor-layout";

export default function PlaygroundPage() {
  const [html, setHtml] = useState("<div class='text-3xl font-bold'>Hola mundo</div>");
  const [css, setCss] = useState("");

  return (
    <main className="min-h-[calc(100vh-61px)] flex flex-row">
      <EditorLayout
        htmlCode={html}
        cssCode={css}
        onHtmlChange={setHtml}
        onCssChange={setCss}
      />

      <Preview html={html} css={css} />
    </main>
  );
}
