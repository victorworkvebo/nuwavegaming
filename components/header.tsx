import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-cyan-400" />
          <span className="text-xl font-bold tracking-tighter">
            NuWave<span className="text-cyan-400">Gaming</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
            Shop
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 hover:bg-slate-800 hover:text-slate-100 bg-transparent"
          >
            Sign In
          </Button>
          <Button size="sm" className="bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}
