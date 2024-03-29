import React, { useReducer, useEffect } from 'react'
import { render } from 'react-dom'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-calculate'
import {
  CssBaseline,
} from '@material-ui/core'
import Spinner from 'react-svg-spinner'

import Formations from './components/Forms/Formations'
import FillRoom from './components/Forms/FillRoom'
import FormSelection from './components/FormSelection'
import { UsersDispatch } from './contexts'
import fetch from './helpers/fetch'
import { userReducer } from './reducers/userReducer'

window.addEventListener('message', evt => {
  let data
  try {
    data = JSON.parse(evt.data)
  } catch(err) {
    if(!err.message.includes('Unexpected token'))
      throw err
    data = evt.data
  }
  console.log(data)
})

const onSubmit = async values => {
  if(!parent) {
    console.warn('Document not loaded into server')
  }
  const sleep = (ms=1000) => new Promise(resolve => setTimeout(resolve, ms))
  await sleep(300)
  parent.postMessage(JSON.stringify(values), '*')
}

const validate = values => {
  const errors = {}
  if (!values.desiredQty) {
    errors.desiredQty = 'Required'
  }
  if (!values.source) {
    errors.source = 'Required'
  }
  return errors
}

const calculator = createDecorator({
  field: /.*calc$/,
  updates: {
    oilyield: (_ignoredValue, allValues) => {
      const copyOfValues = {}
      for(const typeName in allValues) {
        if(!isNaN(Number(allValues[typeName]))) {
          copyOfValues[typeName] = Number(allValues[typeName])
        }
      }
      if(!copyOfValues['totalcalc']) {
        return 'Missing Total Weight'
      } else if(!copyOfValues['tareweightcalc']) {
        return 'Missing Tare Weight'
      } else if(isNaN(copyOfValues['totalcalc']) || isNaN(copyOfValues['tareweightcalc'])) {
        return 'Non-Numerical values detected. Please only enter numbers.'
      } else if(copyOfValues['totalcalc'] < copyOfValues['tareweightcalc']) {
        return 'Total weight less than tare weight'
      } else {
        const difference = copyOfValues['totalcalc'] - copyOfValues['tareweightcalc']
        return String(Math.round(100000*difference)/100000)
      }
    }
  }
})

function App() {
  const [state, dispatch] = useReducer(userReducer)

  useEffect(() => {
    let didCancel = false

    fetch('get_all_usernames').then(userNames => {
      if(!didCancel) {
        dispatch({'type': 'update', 'newUserList': userNames})
      }
    })

    return () => {
      didCancel = true
    }
  }, [])

  const spinnerContainer = (
    <div style={{ width: '35vw', height: '35vh', margin: '30vh auto' }}>
      <Spinner size="35vw" />
    </div>
  )

  return (!state || !state.usersList) ? spinnerContainer : (
    <div style={{ padding: 5, margin: 0, width: '100%', height: '100%'}}>
      <CssBaseline />
      <UsersDispatch.Provider value={state.usersList}>
        <FormSelection>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            decorators={[calculator]}
            render={Formations}
            name='Formations'
            img='batch_creation'
          />
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            decorators={[calculator]}
            render={FillRoom}
            name='Fill Room'
            img='intake'
          />
        </FormSelection>
      </UsersDispatch.Provider>
    </div>
  )
}

render(<App />, document.getElementById('app'))
