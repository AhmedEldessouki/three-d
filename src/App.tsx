/* eslint-disable react/jsx-props-no-spreading */
import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {
  Loader,
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei'
import type {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'
import type {GlpType} from './types'
import './App.css'

const flexCentered: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

function RangeInput({
  name,
  ...overrides
}: {name: string} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={name}>
      {name.replace('-', ' ')}
      <input type="range" name={name} id={name} {...overrides} />
      <input
        type="number"
        style={{width: `40px`}}
        name={name}
        id={name}
        {...overrides}
      />
    </label>
  )
}

function Model({url}: {url: string}) {
  const {nodes} = useGLTF(url) as GLTF & GlpType

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={7}>
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.planet001_1.geometry}
          material={nodes.planet001_1.material}
        />
        <mesh
          geometry={nodes.planet001_2.geometry}
          material={nodes.planet001_2.material}
        />
      </group>
    </group>
  )
}

export default function App() {
  const [dprMin, setDprMin] = React.useState(1.5)
  const [dprMax, setDprMax] = React.useState(2)
  const [fogColor, setFogColor] = React.useState('#272730')
  const [fogNear, setFogNear] = React.useState(16)
  const [fogFar, setFogFar] = React.useState(30)
  const [cameraX, setCameraX] = React.useState(3)
  const [cameraY, setCameraY] = React.useState(1)
  const [cameraZ, setCameraZ] = React.useState(16)
  return (
    <>
      <div className="bg" />
      <h1>Pam Pam PAAA!</h1>
      <div
        className="controls"
        style={{
          ...flexCentered,
        }}
      >
        <div style={flexCentered}>
          <h2>Canvas</h2>
          <span>Device Pixel Ratio -&gt; DPR</span>
          <div>
            <RangeInput
              name="dpr-min"
              value={dprMin}
              onChange={e => {
                setDprMin(e.target.valueAsNumber)
              }}
              min={0}
              max={10}
            />
            <RangeInput
              name="dpr-max"
              value={dprMax}
              onChange={e => {
                setDprMax(e.target.valueAsNumber)
              }}
              min={0}
              max={10}
            />
          </div>
        </div>
        <div style={flexCentered}>
          <h2>Perspective Camera</h2>
          <span>Position</span>
          <div>
            <RangeInput
              name="x"
              value={cameraX}
              onChange={e => {
                setCameraX(e.target.valueAsNumber)
              }}
              min={-360}
              max={360}
            />
            <RangeInput
              name="Y"
              value={cameraY}
              onChange={e => {
                setCameraY(e.target.valueAsNumber)
              }}
              min={-360}
              max={360}
            />
            <RangeInput
              name="Z"
              value={cameraZ}
              onChange={e => {
                setCameraZ(e.target.valueAsNumber)
              }}
              min={-360}
              max={360}
            />
          </div>
        </div>
        <div style={flexCentered}>
          <h2>Fog</h2>
          <label htmlFor="color">
            Color
            <input
              type="color"
              name="color"
              id="color"
              style={{
                borderRadius: '50%',
                width: '25px',
                height: `25px`,
                border: `1px whitesmoke solid`,
              }}
              value={fogColor}
              onChange={e => setFogColor(e.target.value)}
            />
          </label>
          <RangeInput
            name="fog-near"
            id="fog-near"
            value={fogNear}
            onChange={e => {
              setFogNear(e.target.valueAsNumber)
            }}
            min={1}
            max={1000}
          />
          <RangeInput
            name="fog-far"
            value={fogFar}
            onChange={e => {
              setFogFar(e.target.valueAsNumber)
            }}
            min={1}
            max={1000}
          />
        </div>
      </div>
      <Canvas
        dpr={[dprMin, dprMax]}
        camera={{position: [0, 0, 150], fov: 40}}
        linear
        shadows
      >
        <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
        <ambientLight intensity={0.75} />
        <PerspectiveCamera
          makeDefault
          position={[cameraX, cameraY, cameraZ]}
          fov={75}
        >
          <pointLight intensity={1} position={[-10, -25, -10]} />
          <spotLight
            castShadow
            intensity={2.25}
            angle={0.2}
            penumbra={1}
            position={[-25, 20, -15]}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
        <Suspense fallback={null}>
          <Model url="/scene.glb" />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Stars radius={500} depth={50} count={1000} factor={10} />
      </Canvas>
      <div className="layer" />
      <Loader />
    </>
  )
}
