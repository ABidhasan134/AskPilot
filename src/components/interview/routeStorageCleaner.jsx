'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const RouteStorageCleaner = () => {
  const pathname = usePathname()
// can't contorl from middelwire case middelwire is a server componetn
  useEffect(() => {
    if (pathname !== '/interview') {
      localStorage.removeItem('interviewQuestions')
    }
  }, [pathname])

  return null
}

export default RouteStorageCleaner
