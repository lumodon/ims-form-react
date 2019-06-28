import React from 'react'
import { Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'
import { makeStyles } from '@material-ui/styles'

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
}))

export default function FieldListItem({ fieldIndex, name, removeItem }) {
  const classes = useStyles()

  const RemoveIconRender = () => (
    fieldIndex > 0 && (
      <IconButton onClick={removeItem(fieldIndex)} className={classes.iconButton}>
        <RemoveIcon />
      </IconButton>
    )
  )

  return (
    <div className={classes.flex}>
      <Field
        className={classes.input}
        fullWidth
        name={name}
        component={TextField}
        label={label}
      />
      {RemoveIconRender}
    </div>
  )
}
