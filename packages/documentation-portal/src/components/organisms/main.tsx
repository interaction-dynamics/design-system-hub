import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Typography from '../atoms/typography'

export interface MainProps {
  pageSlug?: string
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  rightSideBar: React.ReactNode
}

export default function Main({
  pageSlug,
  title,
  description,
  children,
  rightSideBar,
}: MainProps) {
  return (
    <main className="lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4" />
        <div className="space-y-2">
          <Typography variant="h1">{title}</Typography>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div>{children}</div>
        <div className="mb-10" />
      </div>
      {rightSideBar}
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
    </main>
  )
}
