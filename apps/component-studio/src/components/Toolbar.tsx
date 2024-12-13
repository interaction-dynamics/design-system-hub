export interface ToolbarProps extends React.PropsWithChildren {}

export function Toolbar({ children }: ToolbarProps) {
  return <div className="border-b px-4 py-2">{children}</div>
}
