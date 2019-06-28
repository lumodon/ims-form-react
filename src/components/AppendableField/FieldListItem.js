import React, { useCallback, useState } from 'react'
import { Field } from 'react-final-form'
import { makeStyles } from '@material-ui/styles'
import { TextField } from 'final-form-material-ui'
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
    fontSize: '1.1em',
    padding: 5,
    margin: 5,
  },
  heightLimit: {
    height: 40,
  },
  smMargin: {
    margin: '5px 0',
  },
}))

function CustomTextField({ label, controlledValue, onValueChange, input: {name}, input, meta }) {
  const classes = useStyles()

  return (
    <TextField
      value={controlledValue}
      name={name}
      className={clsx(classes.customTextField, classes.heightLimit)}
      placeholder={label}
      onChange={onValueChange}
      input={input}
      meta={meta}
    />
  )
}

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
    <div className={clsx(classes.flex, classes.heightLimit, classes.smMargin)}>
      <Field
        className={clsx(classes.input, classes.heightLimit)}
        fullWidth
        name={name}
        component={CustomTextField}
        label={label}
        controlledValue={controlledValue}
        onValueChange={changeHandler}
      />
      {fieldIndex > 0 && (
        <IconButton onClick={useRemoveItem} className={classes.iconButton}>
          <RemoveIcon />
        </IconButton>
      )}
    </div>
  )
}
