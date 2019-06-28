import React, { Component } from 'react'
import {
  Button,
} from '@material-ui/core'
import withStyle from 'react-jss'

import SvgLazyLoader from './SvgLazyLoader'

const styles = {
  formSelectionContainer: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr 100px',
    gridAutoRows: '5fr 50px',
    gridTemplateAreas: `
      "content content content"
      "previous list next";
    `,
    border: '2px solid blue',
    '& *': {
      fontFamily: `Lato, Helvetica Neue, Arial, Helvetica, sans-serif`,
    }
  },

  content: {
    border: '1px solid black',
    gridArea: 'content'
  },
  previous: {
    gridArea: 'previous'
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    gridArea: 'list',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflowY: 'auto',
  },
  next: {
    gridArea: 'next'
  },

  button: {
    margin: '5px',
    padding: '3px',
    color: 'white',
    backgroundColor: '#2185D0',
    fontWeight: 'bold',
    textTransform: 'unset',
  },
  formName: {
    padding: '1px',
    display: 'flex',
    alignItems: 'center',
    margin: '2px',
  },
  formLink: {
    margin: '1px',
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  updateButton: {
    backgroundColor: 'green'
  },
}

class FormSelection extends Component {
  constructor(props) {
    super(props)
    this.hasMultipleForms = this.props.children instanceof Array
    const initialForm = this.hasMultipleForms
      ? this.props.children[0].props.name
      : this.props.children.props.name

    this.state = {
      currentForm: {
        name: initialForm,
        iteration: 0,
      },
    }
  }

  handleClick(delta) {
    const currentIteration = this.state.currentForm.iteration
    if(this.hasMultipleForms) {
      const newIteration = currentIteration + delta < 0 ?
        0 :
        currentIteration + delta > (this.props.children.length - 1) ?
          this.props.children.length - 1 :
          currentIteration + delta

      this.setState({
        currentForm: {
          name: this.props.children[newIteration].props.name,
          iteration: newIteration,
        },
      })
    }
  }

  render() {
    const formsAvailable = classes => (
      this.props.children instanceof Array ? this.props.children
        .map((child, index, originalArrDebugMe) => (
            <div
              key={index}
              className={classes.formName}
            >
              <SvgLazyLoader path={child.props.img}/>
              <a href='#' className={classes.formLink}>{child.props.name}</a>
            </div>
        )) : null
    )
    const FormSelectionContainer = ({classes, children}) => (
      <div className={classes.formSelectionContainer}>
        <div className={classes.content}>
          {children}
        </div>
        <Button
          className={classes.previous + ' ' + classes.button}
          type="button"
          variant="contained"
          onClick={() => {
            this.handleClick(-1)
          }}
        >
          Previous
        </Button>
        <div className={classes.list}>
          {formsAvailable(classes)}
        </div>
        <Button
          className={classes.next + ' ' + classes.button}
          type="button"
          variant="contained"
          onClick={() => {
            this.handleClick(1)
          }}
        >
          Next
        </Button>
      </div>
    )
    const StyledContainer = withStyle(styles)(FormSelectionContainer)

    return (
      <StyledContainer>
        {this.props.children[this.state.currentForm.iteration]}
      </StyledContainer>
    )
  }
}

export default FormSelection
