import { LayoutWithLeftSidebar } from '@/components/organisms/layout-with-left-sidebar'
import Main from '@/components/organisms/main'
import { Skeleton } from '@/components/ui/skeleton'

export default async function LoadingLayout() {
  return (
    <LayoutWithLeftSidebar
      slug={''}
      section=""
      leftSidebar={
        <div className="flex flex-col gap-3 top-14 pt-8">
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
        </div>
      }
    >
      <Main
        title={<Skeleton className="w-[100px] h-[20px] rounded-md" />}
        description={<Skeleton className="w-[100px] h-[20px] rounded-md" />}
        rightSideBar={<></>}
      >
        <Skeleton className="w-[100px] h-[20px] rounded-full mt-2" />
      </Main>
    </LayoutWithLeftSidebar>
  )
}
