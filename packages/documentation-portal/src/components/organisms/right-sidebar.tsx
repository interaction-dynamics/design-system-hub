import { PropsWithChildren } from 'react'

export default function RightSideBar({ children }: PropsWithChildren) {
  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-16 -mt-10 pt-4">
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  )
}
