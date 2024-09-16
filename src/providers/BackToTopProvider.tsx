'use client'

import React, { createContext, useState, useContext } from 'react'

interface BackToTopContextType {
  isBackToTopVisible: boolean
  setIsBackToTopVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const BackToTopContext = createContext<BackToTopContextType | undefined>(undefined)

export const BackToTopProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)

  return (
    <BackToTopContext.Provider value={{ isBackToTopVisible, setIsBackToTopVisible }}>
      {children}
    </BackToTopContext.Provider>
  )
}

export const useBackToTop = () => {
  const context = useContext(BackToTopContext)
  if (context === undefined) {
    throw new Error('useBackToTop must be used within a BackToTopProvider')
  }
  return context
}