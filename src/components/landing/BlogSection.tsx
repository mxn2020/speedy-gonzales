// BlogSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogSectionProps {
  dict: any;
  isRTL: boolean;
}

export default function BlogSection({ dict, isRTL }: BlogSectionProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const blogPosts = [
    {
      title: dict.post1.title,
      excerpt: dict.post1.excerpt,
      image: "/blog-post-1.png",
      date: dict.post1.date,
    },
    {
      title: dict.post2.title,
      excerpt: dict.post2.excerpt,
      image: "/blog-post-2.png",
      date: dict.post2.date,
    },
    {
      title: dict.post3.title,
      excerpt: dict.post3.excerpt,
      image: "/blog-post-3.png",
      date: dict.post3.date,
    },
  ]

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dict.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
            </>
          ) : (
            blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full flex flex-col">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <CardContent className="flex-grow p-6">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className={isRTL ? 'justify-start' : 'justify-end'}>
                    <Button variant="link" asChild>
                      <Link href="#">
                        {dict.readMore}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="#">
              {dict.viewAll}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function BlogPostSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <Skeleton className="w-full h-48 rounded-t-lg" />
      <CardContent className="flex-grow p-6 space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  )
}