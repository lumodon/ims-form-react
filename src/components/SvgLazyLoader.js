import React, { useState, useEffect } from 'react'
import Spinner from 'react-svg-spinner'

export default function SvgLazyLoader({ path }) {
  const [svgComponent, setSvgComponent] = useState({'svgC': () => <Spinner />})
  useEffect(() => {
    let didCancel = false
    import(`../../public/svgr/${path}`)
      .then(loadedComponent => {
        if(!didCancel) {
          setSvgComponent({'svgC': loadedComponent.default})
        }
      })

    return () => {
      didCancel = true
    }
  }, [path])

  return (
    <div>
      {svgComponent.svgC()}
    </div>
  )
}
