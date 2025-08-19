import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { useHeader } from "@/contexts/header-context";
import { Columns, Rows } from "lucide-react";

export function Header() {
  const { isVerticalLayout, setIsVerticalLayout } = useHeader()
  const location = useLocation()

  const isPlaygroundPage = location.pathname === "/playground"

  return (
    <header className="w-full border-b px-4 py-3 flex items-center justify-between bg-background">
      <Link to="/" className="text-lg font-semibold">
        HTML to Image
      </Link>

      <nav className="flex items-center gap-2">
        <Link to="/playground">
          <Button variant="ghost">Playground</Button>
        </Link>
        {isPlaygroundPage && (
          <Button variant="secondary" size="icon" onClick={() => setIsVerticalLayout(!isVerticalLayout)}>
            {isVerticalLayout ?
              <Columns className="h-4 w-4" />
              :
              <Rows className="h-4 w-4" />
            }
          </Button>
        )}
        <ModeToggle />
      </nav>
    </header>
  );
}
