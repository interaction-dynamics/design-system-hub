import { currentUser } from '@clerk/nextjs/server'
import { SignOutButton } from '@clerk/nextjs'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export async function UserMenu() {
  const user = await currentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-9 h-9">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>
          <div>{user?.fullName ?? 'John Doe'}</div>
          <div className="font-light text-muted-foreground max-w-44 truncate">
            {user?.primaryEmailAddress?.emailAddress ?? 'john.doe@bar.com'}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild disabled>
          <Link className="cursor-pointer" href="/settings">
            Account settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild disabled={!user}>
          <Link
            href="/dashboard"
            className="cursor-pointer flex justify-between gap-4"
          >
            Switch Design System
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/new">
            Create Design System
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            className="cursor-pointer"
            href="mailto:support@interaction-dynamics.io"
          >
            Support
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/">
            Home Page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full cursor-pointer"
          disabled={!user}
          asChild
        >
          <SignOutButton redirectUrl="/">Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
