'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="w-full py-12 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">SaaS Company</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering teams to achieve more with our innovative SaaS solution.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">Features</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Pricing</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Testimonials</Link></li>
                <li><Link href="#" className="text-sm hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">About Us</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Careers</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Contact</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Blog</Link></li>
              </ul>
            </div>
          </nav>
          <div>
            <h3 className="font-semibold mb-3">Subscribe to our newsletter</h3>
            <form className="mt-4">
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow rounded-l-md border border-input bg-background px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2023 SaaS Company. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="rounded-full bg-muted p-2 hover:bg-muted/80">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="rounded-full bg-muted p-2 hover:bg-muted/80">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="rounded-full bg-muted p-2 hover:bg-muted/80">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}