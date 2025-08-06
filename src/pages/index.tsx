import { TypographyH1, TypographyP } from '@/components/ui/typography'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8 text-center">
      <TypographyH1 className="text-5xl font-bold mb-6">Bienvenido al convertidor HTML → Imagen</TypographyH1>
      <TypographyP className="mb-8 text-lg">
        Convierte código HTML y CSS en imágenes PNG, JPG o SVG de forma sencilla y rápida.
      </TypographyP>
      <Link
        to="/playground"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Ir al Playground
      </Link>
    </main>
  )
}
