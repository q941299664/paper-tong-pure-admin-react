import { useWindowSize } from 'react-use'

function Upload() {
  const { width, height } = useWindowSize()

  return (
    <div>
      <h1>upload</h1>
      <p>
        width: {width}px, height: {height}px
      </p>
    </div>
  )
}

export default Upload
