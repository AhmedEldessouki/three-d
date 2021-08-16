import type {BufferGeometry, Material} from 'three'

type GlpType = {
  nodes: {
    planet001_1: {
      geometry: BufferGeometry
      material: Material
    }
    planet001_2: {
      geometry: BufferGeometry
      material: Material
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export {GlpType}
