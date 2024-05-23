import LeftSideBar from './left-sidebar'

export interface Layout3ColumnsProps {
  slug: string
  section: string
  leftSidebar: React.ReactNode
  rightSidebar: React.ReactNode
  children: React.ReactNode
}

export default function Layout3Columns({
  leftSidebar,
  children,
}: Layout3ColumnsProps) {
  return (
    <div className="relative container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {leftSidebar}
      <main className="relative pt-8">{children}</main>
    </div>
  )
}
