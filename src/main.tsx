import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from './components/header'
import Playground from "@/pages/playground"
import Home from '@/pages/index'
import '@/index.css'
import { HeaderProvider } from './contexts/header-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HeaderProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </BrowserRouter>
      </HeaderProvider>
    </ThemeProvider>
  </StrictMode>,
)
