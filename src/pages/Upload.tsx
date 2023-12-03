import { useResponsive, useSize } from 'ahooks'
import { useRef } from 'react'

function Upload() {
  const divRef = useRef<HTMLDivElement>(null)
  const size = useSize(divRef)
  const responsive = useResponsive()

  return (
    <div>
      <div>{JSON.stringify(responsive)}</div>
      <div ref={divRef} className="w-screen h-20 border border-red-500"></div>
      <div>width: {size?.width}</div>
      <div>height: {size?.height}</div>
    </div>
  )
}

export default Upload
