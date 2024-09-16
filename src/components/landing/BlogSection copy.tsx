import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Mock data for blog posts
const blogPosts = [
  { id: 1, title: "Getting Started with Next.js", category: "Web Development", date: "2023-05-15", image: "/placeholder.svg", excerpt: "Learn the basics of Next.js and start building fast, SEO-friendly React applications." },
  { id: 2, title: "Mastering Tailwind CSS", category: "CSS", date: "2023-05-20", image: "/placeholder.svg", excerpt: "Dive deep into Tailwind CSS and learn how to create beautiful, responsive designs quickly." },
  { id: 3, title: "The Power of Server Components", category: "React", date: "2023-05-25", image: "/placeholder.svg", excerpt: "Explore the benefits of React Server Components and how they can improve your app's performance." },
  { id: 4, title: "Building Accessible UIs", category: "Accessibility", date: "2023-05-30", image: "/placeholder.svg", excerpt: "Learn best practices for creating inclusive and accessible user interfaces for all users." },
  { id: 5, title: "State Management in React", category: "React", date: "2023-06-05", image: "/placeholder.svg", excerpt: "Compare different state management solutions in React and choose the best one for your project." },
  { id: 6, title: "Optimizing Next.js Performance", category: "Web Development", date: "2023-06-10", image: "/placeholder.svg", excerpt: "Discover techniques to optimize your Next.js application for maximum speed and efficiency." },
]

const categories = ["All", "Web Development", "CSS", "React", "Accessibility"]

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => 
    (selectedCategory === "All" || post.category === selectedCategory) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Our Blog</h2>
        
        {/* Featured Post */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src="/placeholder.svg"
                alt="Featured blog post"
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col justify-center">
                <Badge className="w-fit mb-2">Featured</Badge>
                <CardTitle className="text-2xl md:text-3xl mb-2">The Future of Web Development</CardTitle>
                <p className="text-muted-foreground mb-4">Explore emerging trends and technologies shaping the future of web development.</p>
                <Button asChild>
                  <Link href="#">Read More</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <Input
            type="search"
            placeholder="Search posts..."
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <Card key={post.id}>
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="rounded-t-lg object-cover w-full h-48"
                />
              </CardHeader>
              <CardContent className="p-4">
                <Badge className="mb-2">{post.category}</Badge>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <Button asChild variant="outline">
                  <Link href="#">Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}