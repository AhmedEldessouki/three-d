import React from 'react'
import {useSpring, animated, config} from '@react-spring/three'
import {Canvas, MeshProps} from '@react-three/fiber'
import {Box, Html} from '@react-three/drei'

import './App.css'

function SomeThing() {
  const [active, setActive] = React.useState(false)
  const meshRef = React.useRef<MeshProps>()
  const {scale} = useSpring({scale: active ? 1.5 : 1, config: config.wobbly})
  return (
    <div>
      <Canvas>
        <animated.mesh
          scale={scale}
          onClick={() => setActive(!active)}
          ref={meshRef}
        >
          <boxGeometry />
          <meshPhongMaterial color="red" />
        </animated.mesh>
        <mesh>
          <Box position={[1, 10, 0]} />
        </mesh>
        <Html>
          <h1>Mo</h1>
        </Html>
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <Canvas>
        <SomeThing />
      </Canvas>
    </div>
  )
}

export default App
