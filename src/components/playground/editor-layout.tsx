import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { useState } from "react"
import { MonacoEditor } from "./monaco-editor"
import { Card } from "../ui/card"

interface EditorPanelProps {
  htmlCode: string
  cssCode: string
  onHtmlChange: (code: string) => void
  onCssChange: (code: string) => void
}

export function EditorLayout({ htmlCode, cssCode, onHtmlChange, onCssChange }: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState("html")

  return (
    <Card className="rounded-none border-0 border-r p-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col gap-0">
        <TabsList className="rounded-none border-b bg-muted/50">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="split">Split</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="html" className="h-full m-0">
            <MonacoEditor value={htmlCode} onChange={onHtmlChange} language="html" />
          </TabsContent>

          <TabsContent value="css" className="h-full m-0">
            <MonacoEditor value={cssCode} onChange={onCssChange} language="css" />
          </TabsContent>

          <TabsContent value="split" className="h-full m-0">
            <div className="h-full flex flex-col">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel>
                  <div className="h-full flex-1 border-b">
                    <div className="text-xs font-medium p-2 bg-muted/50 border-b">HTML</div>
                    <div className="h-[calc(100%-2rem)] mb-2">
                      <MonacoEditor value={htmlCode} onChange={onHtmlChange} language="html" />
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle transparent />
                <ResizablePanel>
                  <div className="h-full flex-1">
                    <div className="text-xs font-medium p-2 bg-muted/50 border-b">CSS</div>
                    <div className="h-[calc(100%-2rem)]">
                      <MonacoEditor value={cssCode} onChange={onCssChange} language="css" />
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  )
}
