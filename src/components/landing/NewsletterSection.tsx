'use client'

import { motion } from 'framer-motion'

export function NewsletterSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Stay Updated</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Subscribe to our newsletter for the latest updates, tips, and special offers.
          </p>
          <form className="w-full max-w-sm space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default NewsletterSection