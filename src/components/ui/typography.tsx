import * as React from "react"

import { cn } from "@/lib/utils"

export function TypographyH1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-5xl md:text-7xl font-extrabold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function TypographyH4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function TypographyP({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7", className)} {...props} />
  )
}

export function TypographyBlockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  )
}

export function TypographyList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  )
}
