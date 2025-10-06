import { useState } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { EditorLayout } from "@/components/playground/editor-layout"
import OptionsPanel from "@/components/playground/options-panel"
import { Preview } from "@/components/playground/preview"
import { useHeader } from "@/contexts/header-context"

const defaultHtml = `<div class="container">
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  </div>
  <div class="text-group">
    <p class="text">HTML to Image</p>
    <p class="description">Transform your HTML and CSS code into high-quality images</p>
  </div>
</div>
`;

const defaultCss = `.container {
  display: flex;
  height: 100%;
  gap: 16px;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(38, 19, 0, 1) 1%, rgba(0, 0, 0, 1) 52%);
  font-family: Arial, sans-serif;
}

.logo {
  border-radius: 99px;
  background: linear-gradient(90deg, rgba(255, 105, 0, 1) 10%, rgba(255, 185, 0, 1) 100%);
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.text {
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}

.description {
  color: #ccc;
  font-size: 13px;
  margin: 0;
}
`;

export default function Playground() {
  const [htmlCode, setHtmlCode] = useState(defaultHtml)
  const [cssCode, setCssCode] = useState(defaultCss)
  const { isVerticalLayout } = useHeader()
  const [canvasWidth, setCanvasWidth] = useState(800)
  const [canvasHeight, setCanvasHeight] = useState(400)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [isTransparent, setIsTransparent] = useState(false)
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "svg">("png");
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
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
