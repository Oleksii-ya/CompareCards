import { createContext, useState } from 'react'

export const AnimationContext = createContext(['', () => { }])

export const AnimationProvider = ({ children }) => {
  const [name, setName] = useState('')

  return (
    <AnimationContext.Provider value={[name, setName]}>
      {children}
    </AnimationContext.Provider>
  )
}