'use client'

import { AnimatedBeam } from '@/components/magicui/animated-beam'
import { cn } from '@/lib/utils'
import React, { forwardRef, useRef } from 'react'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title: string }
>(({ className, children, title }, ref) => {
  return (
    <div className="flex flex-col items-center">
      <div
        ref={ref}
        className={cn(
          'z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
          className
        )}
      >
        {children}
      </div>
      <div className="text-muted-foreground text-xs font-semibold text-center mt-1">
        {title}
      </div>
    </div>
  )
})

export function Synchronization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const figmaRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const designerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={figmaRef} className="h-16 w-16" title="Design">
            <FigmaIcon />
          </Circle>
          <Circle ref={codeRef} className="h-16 w-16" title="Code">
            <GithubIcon />
          </Circle>
          {/* <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle> */}
          {/* <Circle ref={div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.notion />
          </Circle> */}
        </div>
        <div className="flex flex-col justify-center">
          <Circle
            ref={productRef}
            className="h-16 w-16"
            title="Design System Manager"
          >
            <OpenAiIcon />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={userRef} className="h-16 w-16" title="Developer">
            <DeveloperIcon />
          </Circle>
          <Circle ref={designerRef} className="h-16 w-16" title="Designer">
            <UserIcon />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={figmaRef}
        toRef={productRef}
        pathWidth={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeRef}
        toRef={productRef}
        pathWidth={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={productRef}
        toRef={userRef}
        pathWidth={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={productRef}
        toRef={designerRef}
        pathWidth={3}
      />
    </div>
  )
}

function FigmaIcon() {
  return (
    <svg
      width="42"
      height="61"
      viewBox="0 0 42 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 30.5C21 27.9804 22.0009 25.5641 23.7825 23.7825C25.5641 22.0009 27.9804 21 30.5 21C33.0196 21 35.4359 22.0009 37.2175 23.7825C38.9991 25.5641 40 27.9804 40 30.5C40 33.0196 38.9991 35.4359 37.2175 37.2175C35.4359 38.9991 33.0196 40 30.5 40C27.9804 40 25.5641 38.9991 23.7825 37.2175C22.0009 35.4359 21 33.0196 21 30.5V30.5Z"
        stroke="#1E1E1E"
        stroke-width="3.5"
      />
      <path
        d="M2 49.5C2 46.9804 3.00089 44.5641 4.78249 42.7825C6.56408 41.0009 8.98044 40 11.5 40H21V49.5C21 52.0196 19.9991 54.4359 18.2175 56.2175C16.4359 57.9991 14.0196 59 11.5 59C8.98044 59 6.56408 57.9991 4.78249 56.2175C3.00089 54.4359 2 52.0196 2 49.5Z"
        stroke="#1E1E1E"
        stroke-width="3.5"
      />
      <path
        d="M21 2V21H30.5C33.0196 21 35.4359 19.9991 37.2175 18.2175C38.9991 16.4359 40 14.0196 40 11.5C40 8.98044 38.9991 6.56408 37.2175 4.78249C35.4359 3.00089 33.0196 2 30.5 2L21 2Z"
        stroke="#1E1E1E"
        stroke-width="3.5"
      />
      <path
        d="M2 11.5C2 14.0196 3.00089 16.4359 4.78249 18.2175C6.56408 19.9991 8.98044 21 11.5 21H21V2H11.5C8.98044 2 6.56408 3.00089 4.78249 4.78249C3.00089 6.56408 2 8.98044 2 11.5Z"
        stroke="#1E1E1E"
        stroke-width="3.5"
      />
      <path
        d="M2 30.5C2 33.0196 3.00089 35.4359 4.78249 37.2175C6.56408 38.9991 8.98044 40 11.5 40H21V21H11.5C8.98044 21 6.56408 22.0009 4.78249 23.7825C3.00089 25.5641 2 27.9804 2 30.5Z"
        stroke="#1E1E1E"
        stroke-width="3.5"
      />
    </svg>
  )
}

function DeveloperIcon() {
  return (
    <svg
      width="24"
      height="30"
      viewBox="0 0 24 30"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <svg viewBox="0 0 430 431" x="-12" y="-5" width="42" height="42">
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M224.33 311.051L202.33 327.261L224.33 343.471"
          stroke="#000000"
          stroke-width="12"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M286.57 311.051L308.57 327.261L286.57 343.471"
          stroke="#000000"
          stroke-width="12"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M260.46 311.051L249.96 343.471"
          stroke="#000000"
          stroke-width="12"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      width="98"
      height="96"
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#24292f"
      />
    </svg>
  )
}

function OpenAiIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
