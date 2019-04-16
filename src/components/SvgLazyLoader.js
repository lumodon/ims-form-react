import React, { Component } from 'react'

export default class SvgLazyLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svgComponent: () => (<span></span>)
    }

    import(`../../public/svgr/${props.path}`)
      .then(svgComponent => {
        console.log('lazyload: ', svgComponent.default)
        this.setState({ svgComponent: svgComponent.default })
      })
  }
  render() {
    return (
      <div>
        {this.state.svgComponent()}
      </div>
    )
  }
}
