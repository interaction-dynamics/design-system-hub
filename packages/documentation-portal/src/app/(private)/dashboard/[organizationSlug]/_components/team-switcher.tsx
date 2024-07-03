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

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

export function TeamSwitcher() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('next.js')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Select framework...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                className="cursor-pointer"
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
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
