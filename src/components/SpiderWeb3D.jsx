import { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ---- Palette -------------------------------------------------------------
const SILVER = new THREE.Color('#E8EAF2') // bright near/inner threads
const SLATE = new THREE.Color('#3a4460') // dim far/outer threads
const WARM = new THREE.Color('#E62429') // subtle spider-red hub accent

// ---- Web parameters ------------------------------------------------------
const SPOKES = 14 // radial directions
const RINGS = 7 // concentric rings
const MAX_RADIUS = 3.2 // outermost ring radius
const Z_JITTER = 0.28 // organic depth wobble

// Detect reduced-motion preference (guarded for SSR / older browsers).
function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Cheap, throwaway WebGL availability probe. Never throws.
function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

// -------------------------------------------------------------------------
// The actual 3D contents: procedural web geometry + twinkling dew points.
// -------------------------------------------------------------------------
function WebGroup({ pointerRef, reducedMotion }) {
  const groupRef = useRef()
  const dewRef = useRef()
  const autoY = useRef(0) // accumulated auto-rotation around Y
  const easeOffset = useRef({ x: 0, y: 0 }) // eased pointer lean

  // Build all nodes, thread geometry and dew geometry once.
  const { lineGeometry, dewGeometry, dewBaseOpacity } = useMemo(() => {
    // nodes[spoke][ring] = THREE.Vector3, plus a shared center node.
    const center = new THREE.Vector3(0, 0, 0)
    const nodes = []
    for (let s = 0; s < SPOKES; s++) {
      const angle = (s / SPOKES) * Math.PI * 2
      nodes[s] = []
      for (let r = 0; r < RINGS; r++) {
        // radius grows slightly non-linearly so inner rings sit closer together
        const t = (r + 1) / RINGS
        const radius = MAX_RADIUS * t
        const z = (Math.random() * 2 - 1) * Z_JITTER
        nodes[s][r] = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        )
      }
    }

    const positions = []
    const colors = []
    const tmp = new THREE.Color()

    // Color a thread endpoint by how far out it is (0 = center, 1 = rim).
    const pushVertex = (v, farT) => {
      positions.push(v.x, v.y, v.z)
      tmp.copy(SILVER).lerp(SLATE, farT)
      colors.push(tmp.r, tmp.g, tmp.b)
    }

    // Radial threads: center -> ring0 -> ring1 -> ... -> outer, per spoke.
    for (let s = 0; s < SPOKES; s++) {
      let prev = center
      let prevT = 0
      for (let r = 0; r < RINGS; r++) {
        const node = nodes[s][r]
        const nodeT = (r + 1) / RINGS
        pushVertex(prev, prevT)
        pushVertex(node, nodeT)
        prev = node
        prevT = nodeT
      }
    }

    // Ring threads: connect spoke k -> spoke k+1 on each ring, closing loop.
    for (let r = 0; r < RINGS; r++) {
      const ringT = (r + 1) / RINGS
      for (let s = 0; s < SPOKES; s++) {
        const a = nodes[s][r]
        const b = nodes[(s + 1) % SPOKES][r]
        pushVertex(a, ringT)
        pushVertex(b, ringT)
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )
    lineGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    )

    // Dew glints: ~14 points scattered across nodes (bias toward inner rings).
    const dewCount = 14
    const dewPositions = []
    const dewColors = []
    const dewBaseOpacity = []
    for (let i = 0; i < dewCount; i++) {
      const s = Math.floor(Math.random() * SPOKES)
      const r = Math.floor(Math.random() * RINGS)
      const node = nodes[s][r]
      dewPositions.push(node.x, node.y, node.z)
      // inner dew tinted very slightly warm, outer stays silver
      const innerT = 1 - (r + 1) / RINGS
      tmp.copy(SILVER).lerp(WARM, innerT * 0.25)
      dewColors.push(tmp.r, tmp.g, tmp.b)
      dewBaseOpacity.push(0.35 + Math.random() * 0.4)
    }

    const dewGeometry = new THREE.BufferGeometry()
    dewGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(dewPositions, 3)
    )
    dewGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(dewColors, 3)
    )

    return { lineGeometry, dewGeometry, dewBaseOpacity }
  }, [])

  // Dispose GPU resources on unmount.
  useEffect(() => {
    return () => {
      lineGeometry.dispose()
      dewGeometry.dispose()
    }
  }, [lineGeometry, dewGeometry])

  // Average base opacity used as the twinkle midpoint.
  const dewMidOpacity = useMemo(() => {
    if (!dewBaseOpacity.length) return 0.5
    return dewBaseOpacity.reduce((a, b) => a + b, 0) / dewBaseOpacity.length
  }, [dewBaseOpacity])

  // Animation: auto-rotate + wobble + eased pointer follow + dew twinkle.
  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return

    if (reducedMotion) {
      // Hold a gentle static tilt so the depth still reads.
      g.rotation.set(0.05, 0.0, 0)
      return
    }

    const t = state.clock.elapsedTime
    const p = pointerRef.current

    // Eased targets from the pointer ref (window-tracked, -1..1).
    const targetY = p.x * 0.5
    const targetX = -p.y * 0.35

    // Glide the pointer lean toward its target (lerp factor ~0.04).
    easeOffset.current.y += (targetY - easeOffset.current.y) * 0.04
    easeOffset.current.x += (targetX - easeOffset.current.x) * 0.04

    // Accumulate the continuous auto-rotation, then compose final rotation
    // as auto-rotate + eased pointer lean + a subtle X wobble.
    autoY.current += delta * 0.06
    const wobbleX = Math.sin(t * 0.4) * 0.08
    g.rotation.y = autoY.current + easeOffset.current.y
    g.rotation.x = easeOffset.current.x + wobbleX

    // Dew twinkle: modulate points material opacity softly.
    if (dewRef.current && dewRef.current.material) {
      dewRef.current.material.opacity =
        dewMidOpacity + Math.sin(t * 1.6) * 0.22
    }
  })

  return (
    <group ref={groupRef}>
      {/* Threads */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Dew glints */}
      <points ref={dewRef} geometry={dewGeometry}>
        <pointsMaterial
          vertexColors
          transparent
          opacity={dewMidOpacity}
          size={0.08}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// -------------------------------------------------------------------------
// Public component
// -------------------------------------------------------------------------
export default function SpiderWeb3D({ className }) {
  // Pointer tracked from the window so clicks still pass through the canvas.
  const pointerRef = useRef({ x: 0, y: 0 })
  const [reducedMotion] = useState(prefersReducedMotion)
  const [webglOk] = useState(isWebGLAvailable)

  useEffect(() => {
    if (reducedMotion) return // no pointer follow when reduced motion is set

    const onMove = (e) => {
      // Normalize to -1..1 (y flipped to match 3D up).
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  // No WebGL -> render nothing; the page supplies a CSS fallback background.
  if (!webglOk) return null

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <WebGroup pointerRef={pointerRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
