import { Spinner } from '@/components/atoms/spinner'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-backgroun z-50 flex text-foreground items-center justify-center">
      <Spinner className="w-6 h-6" />
    </div>
  )
}
