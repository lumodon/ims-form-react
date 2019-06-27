import React from 'react'
import { Field } from 'react-final-form'

import { UsersDispatch } from '../contexts'

export default function UsersListInput({ name, label }) {
  return (
    <UsersDispatch.Consumer>
      {(usersListContext) => (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor={name}>{label}</label>
          <Field
            required
            name={name}
            component="select"
            style={{boxShadow: '0 0 10px gray', margin: '5px 0', width: '70%', height: 30, textTransform: 'capitalize'}}
          >
            <option />
            {usersListContext.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))}
          </Field>
        </div>
      )}
    </UsersDispatch.Consumer>
  )
}