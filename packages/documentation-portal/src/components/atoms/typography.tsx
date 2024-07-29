import { cn } from '@/lib/utils'

export interface TypographyProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  id?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

const styles = {
  h1: 'scroll-m-20 text-4xl font-bold tracking-tight',
  h2: 'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight',
  h3: 'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
  h4: '',
  h5: '',
  h6: '',
  p: 'text-sm text-muted-foreground',
  span: '',
} as const

export default function Typography({
  children,
  variant = 'p',
  className,
  id,
  as: component,
}: TypographyProps) {
  const Component = component ?? variant

  return (
    <Component className={cn(styles[variant] ?? '', className)} id={id}>
      {children}
    </Component>
  )
}
