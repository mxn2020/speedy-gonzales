'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const blogPosts = [
  {
    title: "10 Tips for Improving Team Productivity",
    excerpt: "Learn how to boost your team's efficiency with these proven strategies.",
    image: "/blog-post-1.jpg",
    date: "May 15, 2023",
  },
  {
    title: "The Future of Remote Work: Trends to Watch",
    excerpt: "Discover the emerging trends shaping the future of remote work.",
    image: "/blog-post-2.jpg",
    date: "June 2, 2023",
  },
  {
    title: "Mastering Data Analytics for Business Growth",
    excerpt: "Explore how data analytics can drive your business forward.",
    image: "/blog-post-3.jpg",
    date: "June 18, 2023",
  },
]

export default function BlogSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link
                  href="#"
                  className="text-primary hover:underline"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}