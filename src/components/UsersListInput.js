import React from 'react'
import { Field } from 'react-final-form'

import { UsersDispatch } from '../contexts'

export default function UsersListInput({ name, label }) {
  return (
    <UsersDispatch.Consumer>
      {(usersListContext) => (
        <>
          <label htmlFor={name}>{label}</label>
          <Field
            required
            name={name}
            component="select"
            style={{width: '50%', height: 30, margin: '10px 25%', textTransform: 'capitalize'}}
          >
            <option />
            {usersListContext.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))}
          </Field>
        </>
      )}
    </UsersDispatch.Consumer>
  )
}