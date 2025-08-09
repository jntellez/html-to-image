import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useTheme } from "@/components/theme-provider";

interface HtmlCodeProps {
  value: string;
  onChange: (value: string) => void;
  languague: "html" | "css"
}

const getActualTheme = (theme: string): "light" | "dark" => {
  if (theme === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  return theme === "dark" ? "dark" : "light";
};

export function CodeEditor({ value, onChange, languague }: HtmlCodeProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);
  const { theme } = useTheme();

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;

    monacoInstance.editor.defineTheme("customLight", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#ffffff",
        "editor.lineHighlightBackground": "#F4F4F5",
      },
    });

    monacoInstance.editor.defineTheme("customDark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#27272a", // bg-muted
        "editor.lineHighlightBackground": "#37373A",
      },
    });

    monacoInstance.editor.setTheme(getActualTheme(theme) === "dark" ? "customDark" : "customLight");
  };

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(getActualTheme(theme) === "dark" ? "customDark" : "customLight");
    }
  }, [theme]);

  return (
    <div className="pt-6 dark:bg-muted bg-white">
      <Editor
        height="300px"
        defaultLanguage={languague}
        theme={getActualTheme(theme) === "dark" ? "customDark" : "customLight"}
        value={value}
        onChange={(newValue) => onChange(newValue ?? "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          codeLens: true,
          contextmenu: false,
        }}
        onMount={handleEditorMount}
      />
    </div>
  );
}
