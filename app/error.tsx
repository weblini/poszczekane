'use client' // Error components must be Client Components
 
import { useEffect } from 'react'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}
 
export default function Error({ error, reset }: ErrorProps) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Coś poszło nie tak...</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Spróbuj jeszcze raz
      </button>
    </div>
  )
}