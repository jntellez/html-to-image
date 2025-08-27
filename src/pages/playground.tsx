import { useState } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { EditorLayout } from "@/components/playground/editor-layout"
import OptionsPanel from "@/components/playground/options-panel"
import { Preview } from "@/components/playground/preview"
import { useHeader } from "@/contexts/header-context"

const defaultHtml = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #000; color: white; font-family: Arial, sans-serif;">
  <svg width="75" height="65" viewBox="0 0 75 65" fill="#000" style="margin-bottom: 20px;">
    <path d="M37.59 25136.95 64H.64136.95-64Z" fill="white"/>
  </svg>
  <div style="font-size: 32px; font-weight: 600;">Hello, World</div>
</div>`

const defaultCss = `body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}`

export default function Playground() {
  const [htmlCode, setHtmlCode] = useState(defaultHtml)
  const [cssCode, setCssCode] = useState(defaultCss)
  const { isVerticalLayout } = useHeader()
  const [canvasWidth, setCanvasWidth] = useState(800)
  const [canvasHeight, setCanvasHeight] = useState(400)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [isTransparent, setIsTransparent] = useState(false)
  const [exportFormat, setExportFormat] = useState("png")
  const [fileName, setFileName] = useState("html-image")

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full min-h-0 min-w-0">
          <ResizablePanel
            defaultSize={50}
            minSize={25}
            maxSize={65}
            className="flex flex-col min-h-0 min-w-0"
          >
            <EditorLayout htmlCode={htmlCode} cssCode={cssCode} onHtmlChange={setHtmlCode} onCssChange={setCssCode} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction={isVerticalLayout ? "horizontal" : "vertical"} className="h-full">
              <ResizablePanel defaultSize={50} minSize={isVerticalLayout ? 50 : 40}>
                <Preview
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  canvasWidth={canvasWidth}
                  canvasHeight={canvasHeight}
                  backgroundColor={backgroundColor}
                  isTransparent={isTransparent}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={47} minSize={25}>
                <OptionsPanel
                  canvasWidth={canvasWidth}
                  canvasHeight={canvasHeight}
                  backgroundColor={backgroundColor}
                  isTransparent={isTransparent}
                  exportFormat={exportFormat}
                  fileName={fileName}
                  onCanvasWidthChange={setCanvasWidth}
                  onCanvasHeightChange={setCanvasHeight}
                  onBackgroundColorChange={setBackgroundColor}
                  onTransparentChange={setIsTransparent}
                  onExportFormatChange={setExportFormat}
                  onFileNameChange={setFileName}
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
