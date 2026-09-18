import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotion } from './useMotion'

export function useVideoPlayback(src) {
  const { paused } = useMotion()
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const playback = useRef({ manual: false, attempt: 0, pendingSeek: null })
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)

  const stop = useCallback(() => {
    playback.current.attempt += 1
    videoRef.current?.pause()
  }, [])

  const play = useCallback(() => {
    const video = videoRef.current
    if (!video || !src) return
    if (!video.getAttribute('src')) video.src = src
    const attempt = ++playback.current.attempt
    video.play()?.catch((error) => {
      // A pause, seek, or unmount can abort an earlier play request.
      if (attempt === playback.current.attempt && error.name !== 'AbortError')
        setPlaying(false)
    })
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!video || failed) return
    let visible = false
    const sync = () => {
      if (!visible || paused || playback.current.manual || document.hidden)
        stop()
      else play()
    }
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting
              sync()
            },
            { threshold: 0.08 },
          )
    observer?.observe(frameRef.current)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', sync)
      stop()
    }
  }, [paused, failed, play, stop])

  const resume = () => {
    if (paused || failed) return
    playback.current.manual = false
    playback.current.pendingSeek = null
    // Keep play inside the user gesture; no effect cleanup interrupts it.
    play()
  }

  const pause = () => {
    playback.current.manual = true
    stop()
  }

  const applyPendingSeek = () => {
    const video = videoRef.current
    const position = playback.current.pendingSeek
    if (!video || position === null || !Number.isFinite(video.duration)) return
    video.currentTime = position * Math.max(0, video.duration - 0.05)
    playback.current.pendingSeek = null
  }

  const seek = (position) => {
    const video = videoRef.current
    if (!video || failed) return
    pause()
    playback.current.pendingSeek = position
    if (!video.getAttribute('src')) {
      video.src = src
      video.load()
    }
    if (video.readyState >= 1) applyPendingSeek()
  }

  return {
    videoRef,
    frameRef,
    paused,
    ready,
    failed,
    playing,
    resume,
    pause,
    seek,
    events: {
      onPlaying: () => {
        setReady(true)
        setPlaying(true)
      },
      onPause: () => setPlaying(false),
      onLoadedData: () => setReady(true),
      onLoadedMetadata: applyPendingSeek,
      onSeeked: () => setReady(true),
      onError: () => setFailed(true),
    },
  }
}
