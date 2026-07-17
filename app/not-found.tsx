import Link from 'next/link'
import { Button } from '@/components/ui/Button'


export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-black text-zinc-900 dark:text-white mb-4">404</h1>
      <h2 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300 mb-6">Page not found</h2>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link href="/">
        <Button size="lg" leftIcon={<i className="fi fi-rr-arrow-left w-4 h-4"  ></i>}>
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
