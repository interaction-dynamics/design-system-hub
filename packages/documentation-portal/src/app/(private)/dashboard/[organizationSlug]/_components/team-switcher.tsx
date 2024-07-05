'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Organization } from '@/domain/entities/organization'

interface Props {
  organizations: Organization[]
  organizationSlug: string
}

export function TeamSwitcher({ organizations, organizationSlug }: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(organizationSlug)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {organizationSlug
            ? organizations.find((org) => org.slug === organizationSlug)?.name
            : 'Select Team...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Team..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {organizations.map((org) => (
              <CommandItem
                key={org.slug}
                value={org.slug}
                className="cursor-pointer"
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === org.slug ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {org.name}
              </CommandItem>
            ))}
            <CommandSeparator />
            <CommandItem className="cursor-pointer">
              <CirclePlus className={cn('mr-2 h-4 w-4 opacity-100')} />
              Create new team
            </CommandItem>
          </CommandList>
          {/* <CommandEmpty>No framework found.</CommandEmpty> */}
          <CommandGroup>
            {/* <CommandItem
              value={'foo'}
              onSelect={(currentValue: string) => {
                // setValue(currentValue === value ? '' : currentValue)
                // setOpen(false)
              }}
            ></CommandItem> */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
