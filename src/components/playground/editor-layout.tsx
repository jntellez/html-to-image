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
    <Card className="rounded-none border-0 p-0 h-full flex flex-col min-h-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-0 flex-1 min-h-0">
        <TabsList className="rounded-none border-b bg-muted/50 w-full h-11">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="split">Split</TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0 overflow-hidden">
          <TabsContent value="html" className="m-0 h-full flex-1 min-h-0">
            <MonacoEditor value={htmlCode} onChange={onHtmlChange} language="html" />
          </TabsContent>


          <TabsContent value="css" className="m-0 h-full flex-1 min-h-0">
            <MonacoEditor value={cssCode} onChange={onCssChange} language="css" />
          </TabsContent>

          <TabsContent value="split" className="m-0 h-full flex-1 min-h-0">
            <div className="h-full flex flex-col min-h-0">
              <ResizablePanelGroup direction="vertical" className="h-full min-h-0">
                <ResizablePanel minSize={25} className="min-h-0">
                  <div className="h-full flex flex-col min-h-0 border-b">
                    <div className="text-xs font-medium px-3 py-2 bg-muted/50 border-b">HTML</div>
                    <div className="flex-1 min-h-0">
                      <MonacoEditor value={htmlCode} onChange={onHtmlChange} language="html" />
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle transparent />
                <ResizablePanel minSize={25} className="min-h-0">
                  <div className="h-full flex flex-col min-h-0">
                    <div className="text-xs font-medium px-3 py-2 bg-muted/50 border-b">CSS</div>
                    <div className="flex-1 min-h-0">
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
