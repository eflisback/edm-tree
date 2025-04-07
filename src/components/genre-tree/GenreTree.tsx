import { edm } from './data'
import GenreNode from './GenreNode'

const GenreTree = () => {
  return <GenreNode genre={edm} position={{ x: 0, y: 0 }} depth={0} />
}

export default GenreTree
