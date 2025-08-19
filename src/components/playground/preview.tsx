import { useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Monitor } from "lucide-react"

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
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

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

  const debouncedUpdate = useCallback(() => {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current)
    updateTimeoutRef.current = setTimeout(updateIframe, 200)
  }, [updateIframe])

  useEffect(() => {
    debouncedUpdate()
    return () => updateTimeoutRef.current && clearTimeout(updateTimeoutRef.current)
  }, [debouncedUpdate])

  const updateScale = useCallback(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    const scaler = scalerRef.current
    if (!container || !wrapper || !scaler) return

    // get width & height of the container
    const availableWidth = container.clientWidth
    const availableHeight = container.clientHeight

    const scaleX = availableWidth / canvasWidth
    const scaleY = availableHeight / canvasHeight
    const scale = Math.min(scaleX, scaleY, 1) // return smaller

    // set scaler size
    scaler.style.width = `${canvasWidth}px`
    scaler.style.height = `${canvasHeight}px`
    // set scaler scale
    scaler.style.transform = `scale(${scale})`
    scaler.style.transformOrigin = "top left"

    // set scaled size (calc)
    wrapper.style.width = `${canvasWidth * scale}px`
    wrapper.style.height = `${canvasHeight * scale}px`
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
        <div className="flex justify-between items-center p-4 border-b bg-muted/50">
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
          <div ref={wrapperRef} className="block">
            <div ref={scalerRef} className="block">
              <iframe
                ref={iframeRef}
                style={{ width: "100%", height: "100%", display: "block" }}
                className={isTransparent ? "" : "bg-white"}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
