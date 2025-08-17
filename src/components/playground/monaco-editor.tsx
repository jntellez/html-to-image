"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"
import type * as monaco from "monaco-editor";

const getActualTheme = (theme: string): "vs" | "vs-dark" => {
  if (theme === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "vs-dark" : "vs";
  return theme === "dark" ? "vs-dark" : "vs";
};

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function MonacoEditor({ value, onChange, language }: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const loadMonaco = async () => {
      if (typeof window !== "undefined") {
        // Load Monaco Editor dynamically
        const monaco = await import("monaco-editor")

        if (editorRef.current && !monacoRef.current) {
          monacoRef.current = monaco.editor.create(editorRef.current, {
            value,
            language,
            theme: getActualTheme(theme),
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            automaticLayout: true,
            wordWrap: "on",
          })

          monacoRef.current.onDidChangeModelContent(() => {
            if (monacoRef.current)
              onChange(monacoRef.current.getValue())
          })
        }
      }
    }

    loadMonaco()

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose()
        monacoRef.current = null
      }
    }
  })

  useEffect(() => {
    if (monacoRef.current && monacoRef.current.getValue() !== value) {
      monacoRef.current.setValue(value)
    }
  }, [value])

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.updateOptions({
        theme: getActualTheme(theme),
      })
    }
  }, [theme])

  return <div ref={editorRef} className="h-full w-full" />
}
