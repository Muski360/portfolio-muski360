import { createContext, useContext } from 'react'

export const MotionContext = createContext({ paused: true, reduced: true })

export function useMotion() {
  return useContext(MotionContext)
}
