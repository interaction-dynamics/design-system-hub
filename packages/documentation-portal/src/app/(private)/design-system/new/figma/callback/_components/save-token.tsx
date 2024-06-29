'use client'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

export function SaveToken() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code')

  useEffect(() => {}, [])

  return <></>
}
