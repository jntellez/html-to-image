import FeatureCarousel from "@/components/feature-carousel"
import { Button } from "@/components/ui/button"
import ExternalLink from "@/components/ui/external-link"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { ExternalLinkIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="h-[calc(100vh-61px)] flex items-center justify-center">
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-4 space-y-8">
          <TypographyH1 className="font-bold tracking-tighter">
            Convert Code <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent pr-1">HTML to Image</span>
          </TypographyH1>
          <TypographyP className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your HTML and CSS code into high-quality images quickly and easily.<br />
            The perfect tool for creating social media cards, code-driven logos, component previews, and beautiful screenshots.
          </TypographyP>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/playground")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white cursor-pointer text-md px-6 py-3"
            >
              Get started
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 max-w-3xl mx-auto">
          <FeatureCarousel />
        </section>

        {/* Footer Section */}
        <footer className="mx-auto text-sm mb-9">
          <ExternalLink className="flex gap-1 items-center jusify-center" href="https://github.com/jntellez">
            <TypographyP>Made by jntellez</TypographyP>
            <ExternalLinkIcon className="w-4 h-4" />
          </ExternalLink>
        </footer>
      </div>
    </main>
  )
}