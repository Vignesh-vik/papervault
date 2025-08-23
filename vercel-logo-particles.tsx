"use client"

import { useRef, useEffect, useState } from "react"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      isLogo: boolean
    }[] = []

    let animationFrameId: number
    let logoImageData: ImageData | null = null

    const asciiLogo = `                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                         ▒▒▒▒    ▓▓▓▓▓    ▓▓▓▓      ▓▓▓▓▓▓▓▓▒     ▓▓▓▓░     ▓▓▓▓    ▒▒▒▒      ▒░▒▒▒                                                                  
                                                                         ▒▒▒▒     ▓▓▓▓▓▓   ▓▓▓▓     ▓▓▓▓▓▓▓▓▓▓▓    ▒▓▓▓▓     ▓▓▓▓    ▒░▒▒░    ▒▒▒▒▒▒                                                                  
                                                                         ▒▒▒▒     ▓▓▓▓▓▓   ▓▓▓▓    ▓▓▓▓▒   ▓▓▓▓▒    ▓▓▓▓     ▓▓▓▒     ▒▒▒▒   ▒▒▒▒▒▒                                                                   
                                                                         ▒▒▒▒     ▓▓▓▓▓▓▓  ▓▓▓▓    ▓▓▓▓░   ▒▓▓▓▓    ▓▓▓▓    ▓▓▓▓      ░▒▒▒▒  ░░▒▒▒                                                                    
                                                                         ▒▒▒▒     ▓▓▓░▓▓▓  ▓▓▓▓    ▓▓▓▓░   ▒▓▓▓▓    ▓▓▓▓▒   ▓▓▓▓       ▒▒▒▒ ▒▒▒▒▒░                                                                    
                                                                         ▒▒▒▒     ▓▓▓░▓▓▓▓ ▓▓▓▓    ▓▓▓▓░   ▒▓▓▓▓     ▓▓▓▓   ▓▓▓▒        ▒▒▒▒▒▒▒▒▒                                                                     
                                                                         ▒▒▒▒     ▓▓▓  ▓▓▓ ▓▓▓▓    ▓▓▓▓░   ▒▓▓▓▓     ▓▓▓▓  ▒▓▓▓         ░░▒▒▒▒▒▒                                                                      
                                                                         ▒▒▒▒     ▓▓▓  ▒▓▓▓▓▓▓▓    ▓▓▓▓░   ▒▓▓▓▓     ▓▓▓▓  ▓▓▓▓         ▒▒▒░▒▒▒                                                                       
                                                                         ▒▒▒▒     ▓▓▓   ▓▓▓▓▓▓▓    ▓▓▓▓    ▒▓▓▓▓     ░▓▓▓▓ ▓▓▓▓        ▒▒▒░▒▒▒▒▒                                                                      
                                                                         ▒▒▒▒    ░▓▓▓   ▒▓▓▓▓▓▓    ▓▓▓▓    ▓▓▓▓▒      ▓▓▓▓░▓▓▓        ░▒▒▒▒▒▒▒▒▒                                                                      
                                                                         ▒▒▒▒    ░▓▓▓    ▓▓▓▓▓▓    ▓▓▓▓    ▓▓▓▓▒      ▓▓▓▓▓▓▓▓        ▒▒▒▒▒▒▒░▒▒░                                                                     
                                                                         ▒▒▒▒    ░▓▓▓    ░▓▓▓▓▓    ░▓▓▓▓▓▓▓▓▓▓▓       ▓▓▓▓▓▓▓▒       ░▒▒▒▒▒▒ ▒▒▒▒░                                                                    
                                                                         ▒▒▒▒    ░▓▓▓     ▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓         ▓▓▓▓▓▓       ▒░▒▒▒▒▒▒  ▒▒▒▒                                                                    
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      
                                                                                                                                                                                                                      `

    function createAsciiLogoImageData() {
      if (!ctx || !canvas) return null

      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return null

      const fontSize = isMobile ? 8 : 12
      tempCtx.font = `${fontSize}px monospace`
      tempCtx.fillStyle = "white"

      const lines = asciiLogo.split("\n")
      const lineHeight = fontSize * 1.2
      const maxWidth = Math.max(...lines.map((line) => tempCtx.measureText(line).width))

      tempCanvas.width = maxWidth
      tempCanvas.height = lines.length * lineHeight

      tempCtx.font = `${fontSize}px monospace`
      tempCtx.fillStyle = "white"
      tempCtx.textBaseline = "top"

      lines.forEach((line, index) => {
        tempCtx.fillText(line, 0, index * lineHeight)
      })

      return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
    }

    function createParticle() {
      if (!ctx || !canvas) return null

      if (logoImageData && Math.random() < 0.3) {
        const attempts = 50
        for (let i = 0; i < attempts; i++) {
          const x = Math.floor(Math.random() * logoImageData.width)
          const y = Math.floor(Math.random() * logoImageData.height)
          const pixelIndex = (y * logoImageData.width + x) * 4
          const alpha = logoImageData.data[pixelIndex + 3]

          if (alpha > 128) {
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const logoX = centerX - logoImageData.width / 2 + x
            const logoY = centerY - logoImageData.height / 2 + y

            return {
              x: logoX,
              y: logoY,
              baseX: logoX,
              baseY: logoY,
              size: Math.random() * 2 + 1,
              color: "white",
              scatteredColor: "#4A90E2",
              life: Math.random() * 300 + 200,
              isLogo: true,
            }
          }
        }
      }

      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height

      return {
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        size: Math.random() * 1.5 + 0.5,
        color: "rgba(255,255,255,0.3)",
        scatteredColor: "#FF9900",
        life: Math.random() * 200 + 100,
        isLogo: false,
      }
    }

    function createInitialParticles() {
      logoImageData = createAsciiLogoImageData()

      const baseParticleCount = isMobile ? 2000 : 4000
      if (!canvas) return
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))

      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle()
        if (particle) particles.push(particle)
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 40
          const moveY = Math.sin(angle) * force * 40
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY

          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.08
          p.y += (p.baseY - p.y) * 0.08
          ctx.fillStyle = p.isLogo ? "white" : p.color
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle()
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = isMobile ? 2000 : 4000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle()
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const initializeAnimation = () => {
      createInitialParticles()
      animate()
    }

    initializeAnimation()

    const handleResize = () => {
      updateCanvasSize()
      cancelAnimationFrame(animationFrameId)
      particles = []
      createInitialParticles()
      animate()
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive INOVX logo particle effect"
      />
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm ">
          Move your mouse or touch to interact with the particles.
        </p>
      </div>
    </div>
  )
}
