import { toPng } from "html-to-image";

export async function convertHtmlToImage(
  element: HTMLElement
): Promise<string | null> {
  try {
    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: "white", // O puedes usar transparente
    });
    return dataUrl;
  } catch (error) {
    console.error("Error converting to image:", error);
    return null;
  }
}
