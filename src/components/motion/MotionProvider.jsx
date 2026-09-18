import { useCallback, useMemo, useState, useSyncExternalStore } from 'react'
import { MotionContext } from '../../hooks/useMotion'

const motionQuery = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)')
const subscribeMotion = (callback) => {
  const query = motionQuery()
  query?.addEventListener('change', callback)
  return () => query?.removeEventListener('change', callback)
}
const getMotion = () => motionQuery()?.matches ?? true
const getServerMotion = () => true

export function MotionProvider({ children }) {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    getMotion,
    getServerMotion,
  )
  const [userPaused, setUserPaused] = useState(false)
  const paused = reduced || userPaused
  const toggle = useCallback(() => setUserPaused((value) => !value), [])
  const value = useMemo(
    () => ({ paused, reduced, toggle }),
    [paused, reduced, toggle],
  )

  return (
    <MotionContext.Provider value={value}>
      <div data-motion={paused ? 'paused' : 'playing'}>{children}</div>
    </MotionContext.Provider>
  )
}
