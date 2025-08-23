import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Download, Palette, Settings } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

interface OptionsPanelProps {
  canvasWidth: number
  canvasHeight: number
  backgroundColor: string
  isTransparent: boolean
  exportFormat: string
  fileName: string
  onCanvasWidthChange: (width: number) => void
  onCanvasHeightChange: (height: number) => void
  onBackgroundColorChange: (color: string) => void
  onTransparentChange: (transparent: boolean) => void
  onExportFormatChange: (format: string) => void
  onFileNameChange: (name: string) => void
  htmlCode: string
  cssCode: string
}

export default function OptionsPanel({
  canvasWidth,
  canvasHeight,
  backgroundColor,
  isTransparent,
  exportFormat,
  fileName,
  onCanvasWidthChange,
  onCanvasHeightChange,
  onBackgroundColorChange,
  onTransparentChange,
  onExportFormatChange,
  onFileNameChange,
  htmlCode,
  cssCode,
}: OptionsPanelProps) {
  const handleExport = () => {
    return { htmlCode, cssCode }
  }

  return (
    <Card className="h-full rounded-none border-0 flex flex-col p-0 gap-0">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Options
        </h3>
      </div>

      <ScrollArea className="flex-1 px-4 overflow-hidden">
        <div className="space-y-4">
          {/* Canvas/Resolution */}
          <div className="space-y-4 mt-4">
            <h4 className="text-sm font-medium">Canvas / Resolution</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="width" className="text-sm">
                  Width
                </Label>
                <Input
                  id="width"
                  type="number"
                  value={canvasWidth}
                  onChange={(e) => onCanvasWidthChange(Number(e.target.value))}
                  className="h-8"
                  min="100"
                  max="4000"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="height" className="text-sm">
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={canvasHeight}
                  onChange={(e) => onCanvasHeightChange(Number(e.target.value))}
                  className="h-8"
                  min="100"
                  max="4000"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Background/Render */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Background / Render
            </h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="transparent" className="text-sm">
                Transparent
              </Label>
              <Switch id="transparent" checked={isTransparent} onCheckedChange={onTransparentChange} />
            </div>

            {!isTransparent && (
              <div className="space-y-1">
                <Label htmlFor="bg-color" className="text-sm">
                  Background Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => onBackgroundColorChange(e.target.value)}
                    className="h-8 w-12 p-1"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => onBackgroundColorChange(e.target.value)}
                    className="h-8 flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Export */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </h4>

            <div className="space-y-2 mb-4">
              <div className="space-y-1">
                <Label htmlFor="format" className="text-sm">
                  Format
                </Label>
                <Select value={exportFormat} onValueChange={onExportFormatChange}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="filename" className="text-sm">
                  File Name
                </Label>
                <Input
                  id="filename"
                  value={fileName}
                  onChange={(e) => onFileNameChange(e.target.value)}
                  className="h-8"
                  placeholder="image"
                />
              </div>

              <Button onClick={handleExport} className="w-full h-8 text-sm cursor-pointer" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Export Image
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};