import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeadphones,
  faMagnifyingGlass,
  faArrowRotateRight,
  faStop
} from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

const Icon = ({ name }) => {
  const getIcon = () => {
    switch (name) {
      case 'listen':
        return faHeadphones
      case 'search':
        return faMagnifyingGlass
      case 'redo':
        return faArrowRotateRight
      case 'stop':
        return faStop
      case 'spotify':
        return faSpotify
      default:
        throw new Error(`Invalid icon name: ${name}`)
    }
  }

  return (
    <>
      <FontAwesomeIcon icon={getIcon()} />
    </>
  )
}

export default Icon
