import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Component } from '@/domain/entities/component'

interface Props {
  component: Component
}

export function PropertiesTable({ component }: Props) {
  return (
    <div className="rounded-md border mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {component.properties.map((property) => (
            <TableRow key={property.name}>
              <TableCell className="font-semibold">{property.name}</TableCell>
              <TableCell>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {property.type}
                </code>
              </TableCell>
              <TableCell>{property.defaultValue}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                <div className="flex flex-col gap-1">
                  <span>{property.description}</span>
                  {property.optional && (
                    <span className="font-medium">Optional</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
