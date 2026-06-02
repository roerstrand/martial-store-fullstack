import { useEffect, useRef } from 'react'

const SIZE = 48
const HALF = SIZE / 2
const INTERACTIVE = 'button, a, input, select, textarea, [role="button"]'

export default function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`
    }

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) el.classList.add('custom-cursor--active')
      if (e.target.closest('.apex-nav-btn')) el.classList.add('custom-cursor--cta')
    }

    const onOut = (e) => {
      const to = e.relatedTarget
      if (!to?.closest(INTERACTIVE)) el.classList.remove('custom-cursor--active')
      if (!to?.closest('.apex-nav-btn')) el.classList.remove('custom-cursor--cta')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <div ref={ref} className="custom-cursor">
      <span className="custom-cursor__target">⌖</span>
    </div>
  )
}
