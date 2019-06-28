import React, { useCallback, useState } from 'react'
import { Field } from 'react-final-form'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
    alignSelf: 'center',
  },
  flex: {
    display: 'flex',
  },
  customTextField: {
    fontSize: '1.2em',
  },
  heightLimit: {
    height: 50,
  }
}))

function CustomTextField({ label, controlledValue, onValueChange }) {
  const classes = useStyles()

  return (
    <input
      value={controlledValue}
      className={clsx(classes.customTextField, classes.heightLimit)}
      placeholder={label}
      onChange={onValueChange}
    ></input>
  )
}

/**
 * @param {string} fieldIndex - Key
 * @param {string} name - Form name for input field
 * @param {string} label - Display label
 * @param {function} removeItem - Callback for clicking delete button
 */
export default function FieldListItem({ fieldIndex, name, label, removeItem, setControlledValue, controlledValue }) {
  const classes = useStyles()

  const useRemoveItem = useCallback(() => {
      setControlledValue('', fieldIndex)
      removeItem(fieldIndex)
    },
    [fieldIndex],
  )

  const changeHandler = useCallback((e) => {
    setControlledValue(e.target.value, fieldIndex)
    return controlledValue
  }, [controlledValue])

  return (
    <div className={clsx(classes.flex, classes.heightLimit)}>
      <Field
        className={clsx(classes.input, classes.heightLimit)}
        fullWidth
        name={name}
        component={CustomTextField}
        label={label}
        controlledValue={controlledValue}
        onValueChange={changeHandler}
        withRef
      />
      {fieldIndex > 0 && (
        <IconButton onClick={useRemoveItem} className={classes.iconButton}>
          <RemoveIcon />
        </IconButton>
      )}
    </div>
  )
}
