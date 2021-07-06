import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

export default function useWidthAndHeight(canvasRef) {
  const windowSize = useWindowSize()

  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(canvasRef.current.getBoundingClientRect().width)
  }, [canvasRef, windowSize])

  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(canvasRef.current.getBoundingClientRect().height)
  }, [canvasRef, windowSize])
  return { width, height }
}
