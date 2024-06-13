import { Skeleton } from '@/components/ui/skeleton'
import Main from '../../../../components/organisms/main'

export default async function LoadingComponentPage() {
  return (
    <Main
      title={<Skeleton className="h-[40px] w-[250px]" />}
      description={<Skeleton className="h-[28px] w-[250px]" />}
      rightSideBar={<></>}
    >
      <Skeleton className="h-[28px] mt-10 w-[250px]" />
    </Main>
  )
}
