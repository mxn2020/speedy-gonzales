'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="bg-background border border-border rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold">Customer Support</h3>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {/* Chat messages would go here */}
            <p className="text-center text-muted-foreground">How can we help you today?</p>
          </div>
          <div className="p-4 border-t border-border">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 rounded-md border border-input bg-background"
            />
          </div>
        </div>
      )}
    </div>
  )
}