import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    { quote: "This SaaS has transformed our team's productivity!", name: "Jane Doe", company: "Tech Co" },
    { quote: "The features are exactly what we needed for our workflow.", name: "John Smith", company: "Startup Inc" },
    { quote: "Customer support is top-notch. Highly recommended!", name: "Emily Brown", company: "Agency Ltd" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Customers Say</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-xl italic mb-4">"{testimonials[currentIndex].quote}"</p>
            <p className="font-semibold">{testimonials[currentIndex].name}</p>
            <p className="text-muted-foreground">{testimonials[currentIndex].company}</p>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-background rounded-full p-2 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-background rounded-full p-2 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}