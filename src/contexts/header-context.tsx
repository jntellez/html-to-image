import { createContext, useContext, useState, type ReactNode } from "react"

interface HeaderContextType {
  isVerticalLayout: boolean
  setIsVerticalLayout: (value: boolean) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)

  return <HeaderContext.Provider value={{ isVerticalLayout, setIsVerticalLayout }}>{children}</HeaderContext.Provider>
}

export function useHeader() {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider")
  }
  return context
}
