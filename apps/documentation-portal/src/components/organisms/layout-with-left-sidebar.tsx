interface Props {
  slug: string
  section: string
  leftSidebar: React.ReactNode
  children: React.ReactNode
}

export function LayoutWithLeftSidebar({ leftSidebar, children }: Props) {
  return (
    <div className="relative container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {leftSidebar}
      <main className="relative pt-8">{children}</main>
    </div>
  )
}
