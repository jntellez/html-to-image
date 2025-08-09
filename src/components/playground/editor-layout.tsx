import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { useState } from "react"
import { FileCode, Palette } from "lucide-react"

type EditorLayoutProps = {
  htmlEditor: React.ReactNode
  cssEditor: React.ReactNode
}

export default function EditorLayout({ htmlEditor, cssEditor }: EditorLayoutProps) {
  const [view, setView] = useState<"html" | "css" | "split">("html")

  return (
    <div className="flex flex-col w-full h-full">
      <Tabs value={view} onValueChange={(val) => setView(val as typeof view)} className="w-full gap-0">
        <TabsList className="">
          <TabsTrigger
            value="html"
            className="border-r-[1px] border-r-background/50 flex items-center gap-2"
          >
            <FileCode className="w-4 h-4" />
            html
          </TabsTrigger>
          <TabsTrigger
            value="css"
            className="border-r-[1px] border-r-background/50 flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            css
          </TabsTrigger>
          <TabsTrigger value="split" className="">Split View</TabsTrigger>
        </TabsList>

        <TabsContent value="html" className="">
          {htmlEditor}
        </TabsContent>

        <TabsContent value="css" className="">
          {cssEditor}
        </TabsContent>

        <TabsContent value="split" className="h-[600px]">
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={50} minSize={20}>
              {htmlEditor}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
              {cssEditor}
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </div>
  )
}
