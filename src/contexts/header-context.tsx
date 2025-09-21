import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type handleDownloadProps } from "@/lib/html-to-image";

const initialDownloadOptions: handleDownloadProps = {
  canvasWidth: 1920,
  canvasHeight: 1080,
  backgroundColor: "#ffffff",
  isTransparent: false,
  exportFormat: "png",
  fileName: "html-image",
};

interface HeaderContextType {
  isVerticalLayout: boolean;
  setIsVerticalLayout: Dispatch<SetStateAction<boolean>>;
  downloadOptions: handleDownloadProps;
  setDownloadOptions: Dispatch<SetStateAction<handleDownloadProps>>;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  const [downloadOptions, setDownloadOptions] = useState<handleDownloadProps>(initialDownloadOptions);

  return (
    <HeaderContext.Provider
      value={{
        isVerticalLayout,
        setIsVerticalLayout,
        downloadOptions,
        setDownloadOptions
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeader() {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider")
  }
  return context
}
