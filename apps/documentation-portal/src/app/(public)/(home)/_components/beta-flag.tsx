import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { cn } from '@/lib/utils'

export function BetaFlag() {
  return (
    <AnimatedGradientText className="inline-flex gap-2">
      🎉
      <span
        className={cn(
          `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
        )}
      >
        Beta
      </span>
    </AnimatedGradientText>
  )
}
