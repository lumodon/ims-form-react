import React, { useReducer, useState, useCallback } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import PlusSymbol from '@material-ui/icons/AddCircleOutline'
import DropDownIcon from '@material-ui/icons/ArrowDropDownCircle'
import RemoveIcon from '@material-ui/icons/RemoveCircle'

import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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
    flexDirection: 'column',
  },
  flex: {
    display: 'flex',
  },
  flexEnd: {
    alignSelf: 'flex-start',
    flex: '1 0 auto',
  },
  minWidth: {
    minWidth: 300,
  },
  paper: {
    margin: 10,
  },
  customSwitch: {
    transform: 'translateX(15px)',
    marginBottom: -15,
  }
}))

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
  'listOfFields': [{name: 0}]
}

export default function AppendableField({ name, label }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [listDisplayed, setListDisplayed] = useState(true)
  const classes = useStyles()

  const addEmpty = () => {
    dispatch({
      type: 'appendList',
      newField: {
        name: state.listOfFields.length
      }
    })
  }

  const removeItem = useCallback(key => () => {
    dispatch({type: 'removeFromList', fieldName: key})
  }, [dispatch])

  const fieldListDisplay = () => {
    if(listDisplayed) {
      return 
    }
    return 
  }

  const toggleList = useCallback(() => {
      setListDisplayed(prev => !prev)
    },
    [setListDisplayed],
  )

  return (
    <Paper className={`${classes.root} ${classes.flex}`}>
      <div
        style={{paddingBottom: '10px'}}
        className={clsx(classes.flexColumn, classes.flex, classes.minWidth)}
      >
        <Collapse in={listDisplayed} out={String(!listDisplayed)} collapsedHeight="60px">
          <Paper elevation={3} className={classes.paper}>
            {
              listDisplayed
              ? state.listOfFields.map(({}, fieldIndex) => (
                <FieldListItem key={name + String(fieldIndex)} fieldIndex={fieldIndex} />
              ))
              : <FieldListItem fieldIndex={0} removeItem={removeItem} />
            }
          </Paper>
        </Collapse>
      </div>
      <div className={clsx(classes.flexColumn, classes.flex, classes.flexEnd)}>
        <Switch
          classes={{
            switchBase: classes.iOSSwitchBase,
            bar: classes.iOSBar,
            icon: classes.iOSIcon,
            iconChecked: classes.iOSIconChecked,
            checked: classes.iOSChecked,
          }}
          disableRipple
          color="primary"
          checked={listDisplayed}
          onChange={toggleList}
          value="Show"
          className={classes.customSwitch}
        />
        <IconButton onClick={addEmpty} color="primary" className={classes.iconButton} aria-label="Drop Down">
          <PlusSymbol />
        </IconButton>
      </div>
    </Paper>
  )
}
