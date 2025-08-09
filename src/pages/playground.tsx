import { useState } from "react";
import { CodeEditor } from "@/components/playground/code-editor";
import { Preview } from "@/components/playground/preview";
import EditorLayout from "@/components/playground/editor-layout";

export default function PlaygroundPage() {
  const [html, setHtml] = useState("<div class='text-3xl font-bold'>Hola mundo</div>");
  const [css, setCss] = useState("");

  return (
    <main className="">
      <EditorLayout
        htmlEditor={<CodeEditor value={html} onChange={setHtml} languague="html" />}
        cssEditor={<CodeEditor value={css} onChange={setCss} languague="css" />}
      />

      <Preview html={html} css={css} />
    </main>
  );
}
