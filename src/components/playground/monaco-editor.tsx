import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"
import type * as monaco from "monaco-editor"

const getActualTheme = (theme: string): "custom-dark" | "custom-light" => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "custom-dark"
      : "custom-light"
  }
  return theme === "dark" ? "custom-dark" : "custom-light"
}

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
        const monaco = await import("monaco-editor")

        // define custom themes
        monaco.editor.defineTheme("custom-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#18181B",
            "scrollbarSlider.background": "#44444488",
            "scrollbarSlider.hoverBackground": "#555555aa",
            "scrollbarSlider.activeBackground": "#666666aa",
          },
        })

        monaco.editor.defineTheme("custom-light", {
          base: "vs",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#ffffff",
            "scrollbarSlider.background": "#cccccc88",
            "scrollbarSlider.hoverBackground": "#bbbbbbaa",
            "scrollbarSlider.activeBackground": "#aaaaaa",
          },
        })

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
            if (monacoRef.current) {
              onChange(monacoRef.current.getValue())
            }
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
  }, [])

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

  return <div ref={editorRef} className="flex-1 min-h-0 min-w-0 w-full h-full" />
}
