import React, { useReducer, useState, useCallback } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import PlusSymbol from '@material-ui/icons/AddCircleOutline'
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'

import FieldListItem from './FieldListItem'

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
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
  container: {
    display: 'flex',
    flex: '1 0 auto',
    alignSelf: 'flex-start',
  },
  flex: {
    display: 'flex',
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  paper: {
    margin: 10,
  },
  collapsable: {
    width: '100%',
  },
  customSwitch: {
    transform: 'translateX(2px)',
    marginBottom: -15,
    alignSelf: 'center',
  }
}))

const reducer = (currentState, action) => {
  console.log('currentstate: ', currentState, '\naction:\n', action)
  const caseSwitch = {
    'appendList': () => {
      const newList = {
        listOfFields: {
          ...currentState.listOfFields,
          [action.newField.name]: {value: ''}
        }
      }
      console.log('newlist: ', newList)
      return newList
    },
    'removeFromList': () => {
      console.log('Removing ', action.fieldName, ' from ', currentState.listOfFields)
      const modifiedList = {...currentState.listOfFields}
      delete modifiedList[action.fieldName]
      return {listOfFields: modifiedList}
    },
    'setValue': () => {
      const modifiedList = {...currentState.listOfFields}
      modifiedList[action.fieldName].value = action.value
      return {listOfFields: modifiedList}
    }
  }[action && action.type]
  if(caseSwitch) return caseSwitch()
  else throw new Error()
}

const initialState = {
  'listOfFields': {'0': {value: ''}}
}

let incrementor = 1 // 0 reserved for undeletable list item

export default function AppendableField({ name, label }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [listDisplayed, setListDisplayed] = useState(true)
  const [controlledValue, setControlledValue] = useState('')

  console.log('initialstate:', state)

  const classes = useStyles()

  const addEmpty = () => {
    dispatch({
      type: 'appendList',
      newField: {
        name: incrementor++
      }
    })
  }

  const removeItem = useCallback(key => {
    console.log('callback made INSIDE on ', key)
    dispatch({type: 'removeFromList', fieldName: key})
  }, [state, dispatch])

  const toggleList = useCallback(() => {
      setListDisplayed(prev => !prev)
    },
    [listDisplayed, setListDisplayed],
  )

  const reducerSetValue = useCallback((value, fieldName) => {
    console.log('reducer value: ', value, '\nreducer fieldname: ', fieldName)
    return dispatch({type: 'setValue', value, fieldName})
  }, [state])

  const mapListOfFields = useCallback(cb => {
    const list = []
    for(const key in state.listOfFields) {
      list.push(cb(key))
    }
    return list
  }, [state])

  return (
    <Paper className={classes.root}>
      <div
        style={{paddingBottom: '10px'}}
        className={classes.container}
      >
        <Collapse
          in={listDisplayed}
          out={String(!listDisplayed)}
          collapsedHeight="60px"
          className={classes.collapsable}
        >
          <Paper elevation={3} className={classes.paper}>
            {
              listDisplayed
              ? mapListOfFields(key => {
                  return (
                    <FieldListItem
                      name={name + String(key)}
                      key={key}
                      fieldIndex={key}
                      removeItem={removeItem}
                      label={label}
                      setControlledValue={reducerSetValue}
                      controlledValue={state.listOfFields[key].value}
                    />
                  )
                })
              : <FieldListItem
                name={name + '0'}
                fieldIndex="0"
                removeItem={removeItem}
                label={label}
                setControlledValue={reducerSetValue}
                controlledValue={state.listOfFields['0'].value}
              />
            }
          </Paper>
        </Collapse>
      </div>
      <div className={clsx(classes.flexColumn, classes.flex, classes.flexStart)}>
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
