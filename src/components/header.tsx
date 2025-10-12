import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { useHeader } from "@/contexts/header-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Columns, Download, Image, Rows } from "lucide-react"
import { handleDownload } from "@/lib/html-to-image";
import { TypographyH1, TypographyP } from "./ui/typography";

export function Header() {
  const { isVerticalLayout, setIsVerticalLayout, downloadOptions } = useHeader()
  const location = useLocation()

  const isPlaygroundPage = location.pathname === "/playground"

  return (
    <header className="w-full border-b px-4 py-3 flex items-center justify-between bg-muted/70">
      <Link to="/" className="flex items-center gap-2 text-lg font-bold">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md">
          <Image className="h-4 w-4" />
        </div>
        {
          isPlaygroundPage
            ? <TypographyH1 className="text-md md:text-md font-bold tracking-normal">HTML to Image</TypographyH1>
            : <TypographyP>HTML to Image</TypographyP>
        }
      </Link>

      <nav className="flex items-center gap-2">
        {isPlaygroundPage && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer" variant="secondary">
                  <Download className="h-4 w-4" />
                  Export Image
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDownload({ ...downloadOptions, exportFormat: "png" })}>
                  PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload({ ...downloadOptions, exportFormat: "jpeg" })}>
                  JPEG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload({ ...downloadOptions, exportFormat: "svg" })}>
                  SVG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => setIsVerticalLayout(!isVerticalLayout)}>
              {isVerticalLayout ?
                <Columns className="h-4 w-4" />
                :
                <Rows className="h-4 w-4" />
              }
            </Button>
          </>
        )}
        <ModeToggle />
      </nav>
    </header>
  );
}
