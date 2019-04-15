import React from 'react'
import { render } from 'react-dom'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-calculate'
import {
  CssBaseline,
} from '@material-ui/core'
import Manufacturing from './components/Forms/Manufacturing'
import FillRoom from './components/Forms/FillRoom'
import FormSelection from './components/FormSelection'

window.addEventListener('message', evt => {
  let data
  try {
    data = JSON.parse(evt.data)
  } catch(err) {
    if(!err.message.includes('Unexpected token'))
      throw err
    data = evt.data
  }
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
  field: /.*weight$/, // when a field matching this pattern changes...
  updates: {
    // ...update the total to the result of this function
    total: (ignoredValue, allValues) => {
      let sum = 0
      const allValuesCopy = {...allValues}
      for(const key in (allValuesCopy || {})) {
        if(/.*weight$/.test(key)) {
          sum += Number(allValuesCopy[key] || 0)
        }
      }
      return String(Math.round(100000*sum)/100000)
    }
  }
})

function App() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <FormSelection>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          validate={validate}
          decorators={[calculator]}
          render={Manufacturing}
          name='Manufacturing'
        />
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          validate={validate}
          decorators={[calculator]}
          render={FillRoom}
          name='Fill_Room'
        />
      </FormSelection>
    </div>
  )
}

render(<App />, document.getElementById('app'))
