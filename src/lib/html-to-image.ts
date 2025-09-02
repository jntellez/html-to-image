import * as htmlToImage from "html-to-image";

interface ConvertOptions {
  node: HTMLElement;
  format: "png" | "jpeg" | "svg";
  backgroundColor?: string | null;
  width?: number;
  height?: number;
  quality?: number; // JPEG
  pixelRatio?: number;
}

interface HtmlToImageOptions {
  backgroundColor?: string;
  width?: number;
  height?: number;
  quality?: number;
  pixelRatio?: number;
  type?: string;
}

export async function convertToImage({
  node,
  format,
  backgroundColor = null,
  width,
  height,
  quality = 1,
  pixelRatio = 1,
}: ConvertOptions): Promise<Blob | null> {
  const options: HtmlToImageOptions = {
    backgroundColor: backgroundColor ?? undefined,
    width,
    height,
    quality,
    pixelRatio,
  };

  switch (format) {
    case "png": {
      return (await htmlToImage.toBlob(node, {
        ...options,
        type: "image/png",
      }))!;
    }
    case "jpeg": {
      const jpegDataUrl = await htmlToImage.toJpeg(node, {
        ...options,
        quality,
      });
      return await (await fetch(jpegDataUrl)).blob();
    }
    case "svg": {
      const svgDataUrl = await htmlToImage.toSvg(node, options);

      const commaIndex = svgDataUrl.indexOf(",");
      const svgContent = decodeURIComponent(svgDataUrl.slice(commaIndex + 1));

      return new Blob([svgContent], { type: "image/svg+xml" });
    }

    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
}

export interface handleDownloadProps {
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  isTransparent: boolean;
  exportFormat: "png" | "jpeg" | "svg";
  fileName: string;
}

export async function handleDownload({
  canvasWidth,
  canvasHeight,
  backgroundColor,
  isTransparent,
  exportFormat,
  fileName,
}: handleDownloadProps) {
  try {
    const iframe = document.querySelector("iframe");
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    const previewNode = iframeDoc.body;

    const blob = await convertToImage({
      node: previewNode,
      format: exportFormat,
      backgroundColor: isTransparent ? "transparent" : backgroundColor,
      width: canvasWidth,
      height: canvasHeight,
      quality: 1,
      pixelRatio: 1,
    });

    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${exportFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al exportar la imagen:", error);
  }
}
