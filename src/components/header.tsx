import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full border-b px-4 py-3 flex items-center justify-between bg-background">
      <Link to="/" className="text-lg font-semibold">
        HTML to Image
      </Link>

      <nav className="flex items-center gap-2">
        <Link to="/playground">
          <Button variant="ghost">Playground</Button>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
