import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, ImageIcon, Zap, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Convierte <span className="text-primary">HTML</span> a Imagen
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transforma tu código HTML y CSS en imágenes de alta calidad de forma rápida y sencilla. Perfecto para generar
          previsualizaciones, capturas de pantalla y contenido visual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/playground")} className="text-lg px-8">
            Comenzar Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <Code className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Editor en Vivo</CardTitle>
            <CardDescription>Editor Monaco integrado con resaltado de sintaxis para HTML y CSS</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <ImageIcon className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>Visualiza tus cambios en tiempo real con nuestra vista previa interactiva</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Rápido y Eficiente</CardTitle>
            <CardDescription>Conversión instantánea sin necesidad de configuración adicional</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Download className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Múltiples Formatos</CardTitle>
            <CardDescription>Exporta en PNG, JPG, WebP con opciones de calidad personalizables</CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* How it Works Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">¿Cómo Funciona?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-xl font-semibold">Escribe tu Código</h3>
            <p className="text-muted-foreground">
              Ingresa tu HTML y CSS en nuestro editor con autocompletado y resaltado de sintaxis
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-xl font-semibold">Personaliza</h3>
            <p className="text-muted-foreground">
              Ajusta las dimensiones, fondo y opciones de exportación según tus necesidades
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-xl font-semibold">Descarga</h3>
            <p className="text-muted-foreground">Exporta tu imagen en el formato deseado con un solo clic</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">¿Listo para Comenzar?</h2>
        <p className="text-muted-foreground">Únete a miles de desarrolladores que ya usan nuestra herramienta</p>
        <Button size="lg" onClick={() => navigate("/playground")}>
          Probar Gratis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
