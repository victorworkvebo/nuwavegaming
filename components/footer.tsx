import Link from "next/link"
import { Gamepad2, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-cyan-400" />
              <span className="text-xl font-bold tracking-tighter">
                NuWave<span className="text-cyan-400">Gaming</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              The future of gaming is here. High-performance gear for the modern gamer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-200">Shop</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/shop" className="text-sm text-slate-400 hover:text-cyan-400">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop/hyper-flux-headset" className="text-sm text-slate-400 hover:text-cyan-400">
                    Headsets
                  </Link>
                </li>
                <li>
                  <Link href="/shop/quantum-strike-keyboard" className="text-sm text-slate-400 hover:text-cyan-400">
                    Keyboards
                  </Link>
                </li>
                <li>
                  <Link href="/shop/gamma-pro-mouse" className="text-sm text-slate-400 hover:text-cyan-400">
                    Mice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-slate-400 hover:text-cyan-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-slate-400 hover:text-cyan-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-cyan-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-cyan-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-cyan-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-cyan-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} NuWave Gaming. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-slate-400 hover:text-cyan-400">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-cyan-400">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-cyan-400">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
