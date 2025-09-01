import { useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Monitor } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

interface PreviewPanelProps {
  htmlCode: string
  cssCode: string
  canvasWidth: number
  canvasHeight: number
  backgroundColor: string
  isTransparent: boolean
}

export function Preview({
  htmlCode,
  cssCode,
  canvasWidth,
  canvasHeight,
  backgroundColor,
  isTransparent,
}: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scalerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const updateIframe = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    // get iframe content (html document)
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    // add user options to css styles
    const fullCss = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${canvasWidth}px;
        height: ${canvasHeight}px;
        background: ${isTransparent ? "transparent" : backgroundColor};
        overflow: hidden;
      }
      ${cssCode}
    `

    // gets the styles tag and if it doesn't exist creates it
    let styleTag = doc.getElementById("preview-style") as HTMLStyleElement | null
    if (!styleTag) {
      styleTag = doc.createElement("style")
      styleTag.id = "preview-style"
      doc.head.appendChild(styleTag)
    }
    styleTag.textContent = fullCss

    // add html code to the document
    doc.body.innerHTML = htmlCode
  }, [htmlCode, cssCode, canvasWidth, canvasHeight, backgroundColor, isTransparent])

  const debouncedUpdateIframe = useDebouncedCallback(updateIframe, 200)

  useEffect(() => {
    debouncedUpdateIframe()
  }, [htmlCode, cssCode, canvasWidth, canvasHeight, backgroundColor, isTransparent, debouncedUpdateIframe])

  const updateScale = useCallback(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    const scaler = scalerRef.current
    if (!container || !wrapper || !scaler) return

    // get width & height of the container
    const availableWidth = container.clientWidth
    const availableHeight = container.clientHeight

    // calculate raw scales
    const scaleX = availableWidth / canvasWidth
    const scaleY = availableHeight / canvasHeight

    let scale: number
    let scaledWidth: number
    let scaledHeight: number

    if (scaleY <= scaleX) {
      // limit by height → snap to integer height
      const targetHeight = Math.floor(canvasHeight * scaleY)
      scale = targetHeight / canvasHeight
      scaledHeight = targetHeight
      scaledWidth = Math.round(canvasWidth * scale)
    } else {
      // limit by width → snap to integer width
      const targetWidth = Math.floor(canvasWidth * scaleX)
      scale = targetWidth / canvasWidth
      scaledWidth = targetWidth
      scaledHeight = Math.round(canvasHeight * scale)
    }

    // set scaler size (real unscaled dimensions)
    scaler.style.width = `${canvasWidth}px`
    scaler.style.height = `${canvasHeight}px`
    scaler.style.transform = `scale(${scale})`
    scaler.style.transformOrigin = "top left"
    scaler.style.willChange = "transform"

    // set wrapper size (scaled dimensions, snapped to integers)
    wrapper.style.width = `${scaledWidth}px`
    wrapper.style.height = `${scaledHeight}px`
    wrapper.style.overflow = "hidden"
  }, [canvasWidth, canvasHeight])

  useEffect(() => {
    const obs = new ResizeObserver(() => requestAnimationFrame(updateScale))
    if (containerRef.current) obs.observe(containerRef.current)
    updateScale()
    return () => obs.disconnect()
  }, [updateScale])

  return (
    <Card className="h-full rounded-none border-0 py-0">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex justify-between items-center px-4 py-3 border-b bg-muted/50">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Preview
          </h3>
          <p className="text-xs text-muted-foreground">
            {canvasWidth}×{canvasHeight}px
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex-1 grid place-items-center overflow-hidden relative min-w-0 min-h-0"
        >
          <div id="preview-exportable" ref={wrapperRef} className="block">
            <div ref={scalerRef} className="block">
              <iframe
                ref={iframeRef}
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  display: "block",
                  border: 0,
                  background: isTransparent ? "transparent" : backgroundColor,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
