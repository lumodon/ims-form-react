import React, { useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import DropDownIcon from '@material-ui/icons/ArrowDropDownCircle'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import { Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
    alignSelf: 'center',
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flex: {
    display: 'flex'
  },
  flexEnd: {
    alignSelf: 'flex-start',
    flex: '1 0 auto'
  },
  minWidth: {
    minWidth: '300px'
  }
})

/**
 * @function :  dataReducer
 * @param {object} currentState - Contain initial and final state of data
 * @param {object[]} currentState.listOfFields
 *   - List of all fields component will render
 *   - field should include { name: <string> } as unique identifier
 * @param {object} action - Payload
 * @param {('appendList'|'removeFromList')} action.type - List of actions
 * @param {object} action.newField - appendList: List of new listOfFields
 * @param {string} action.fieldName - removeFromList: Field name to be removed
 */
const reducer = (currentState, action) => {
  switch (action.type) {
    case 'appendList':
      return {listOfFields: [...currentState.listOfFields, action.newField]}
    case 'removeFromList':
      const modifiedList = currentState.listOfFields
        .filter(field => field.name !== action.fieldName)
      return {listOfFields: [...modifiedList]};
    default:
      throw new Error();
  }
}

const initialState = {
  'listOfFields': []
}

export default function AppendableField({name, label}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [listDisplayed, setListDisplayed] = useState(false)
  const classes = useStyles()

  const addEmpty = () => {
    dispatch({
      type: 'appendList',
      newField: {
        name: state.listOfFields.length
      }
    })
  }

  const removeItem = key => () => {
    dispatch({type: 'removeFromList', fieldName: key})
  }

  const fieldListDisplay = () => {
    if(listDisplayed) {
      const displayList = state.listOfFields.map((field, fieldIndex) => (
        <div key={fieldIndex} className={classes.flex}>
          <Field
            className={classes.input}
            fullWidth
            key={fieldIndex}
            name={name + fieldIndex}
            component={TextField}
            label={label}
          />
          <IconButton onClick={removeItem(fieldIndex)} className={classes.iconButton}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))
      return displayList
    }
    return null
  }

  const toggleList = () => {
    setListDisplayed(!listDisplayed)
  }

  return (
    <Paper className={`${classes.root} ${classes.flex}`}>
      <div
        style={{paddingBottom: '10px'}}
        className={`${classes.flexColumn} ${classes.flex} ${classes.minWidth}`}
      >
        {fieldListDisplay()}
      </div>
      <div className={`${classes.flexColumn} ${classes.flex} ${classes.flexEnd}`}>
        <IconButton onClick={toggleList} className={classes.iconButton} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <IconButton onClick={addEmpty} color="primary" className={classes.iconButton} aria-label="Drop Down">
          <DropDownIcon />
        </IconButton>
      </div>
    </Paper>
  )
}
