import { Button, type ButtonProps } from '../ui/button'
import { Spinner } from './spinner'

interface Props extends ButtonProps {
  loading?: boolean
}

export function LoadingButton({ loading, children, ...props }: Props) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Spinner className="animate-spin h-5 w-5 -ml-1 mr-2" />}
      {children}
    </Button>
  )
}
