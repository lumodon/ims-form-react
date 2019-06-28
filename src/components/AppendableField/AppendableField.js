import React, { useReducer, useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import PlusSymbol from '@material-ui/icons/AddCircleOutline'
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'
import reducer from './AppendableFieldReducer'

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
    padding: '4px 0px 12px 10px',
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

const initialState = {
  'listOfFields': {'0': {value: ''}}
}
let incrementor = 1 // 0 reserved for undeletable list item

export default function AppendableField({ name, label }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [listDisplayed, setListDisplayed] = useState(true)
  const [listCloseAnim, setListCloseAnim] = useState(true)
  const [didCancel, setDidCancel] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    return () => {
      setDidCancel(true)
    }
  }, [])

  const addNewEmptyField = useCallback(() => {
    dispatch({
      type: 'appendList',
      newField: {
        name: incrementor++
      }
    })
  }, [state, incrementor])

  const removeItem = useCallback(key => {
    dispatch({type: 'removeFromList', fieldName: key})
  }, [state, dispatch])

  const toggleList = useCallback(() => {
      setListCloseAnim(!listDisplayed)

      // Delay umounting children for animation on close
      if(listDisplayed) {
        setTimeout(() => {
          if(!didCancel) {
            setListDisplayed(!listDisplayed)
          }
        }, 750)
      } else {
        setListDisplayed(!listDisplayed)
      }
    },
    [listDisplayed, listCloseAnim],
  )

  const reducerSetValue = useCallback((value, fieldName) => {
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
          in={listCloseAnim}
          out={String(!listCloseAnim)}
          collapsedHeight="68px"
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
          checked={listCloseAnim}
          onChange={toggleList}
          value="Show"
          className={classes.customSwitch}
        />
        <IconButton onClick={addNewEmptyField} color="primary" className={classes.iconButton} aria-label="Drop Down">
          <PlusSymbol />
        </IconButton>
      </div>
    </Paper>
  )
}
