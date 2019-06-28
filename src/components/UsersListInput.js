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
            style={{
              boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
              margin: '5px 0',
              width: '70%',
              height: 30,
              textTransform: 'capitalize'
            }}
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