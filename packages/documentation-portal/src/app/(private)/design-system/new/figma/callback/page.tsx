import { generateAccessToken } from '@/adapters/providers/figma/actions/generate-access-token'
import { callbackUrl } from '../connect/_components/connect-figma-button'

export default async function Page({
  searchParams,
}: {
  searchParams: { code: string }
}) {
  const response = await generateAccessToken(callbackUrl, searchParams.code)

  console.log('response', response)

  return (
    <div className="fixed inset-0 bg-backgroun z-50 flex text-foreground items-center justify-center">
      Done
    </div>
  )
}
