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
  field: /.*calc$/,
  updates: {
    oilyield: (ignoredValue, allValues) => {
      if(!allValues['totalcalc']) {
        return 'Missing Total Weight'
      } else if(!allValues['tareweightcalc']) {
        return 'Missing Tare Weight'
      } else if(allValues['totalcalc'] < allValues['tareweightcalc']) {
        return 'Total weight less than tare weight'
      }
      else {
        const difference = allValues['totalcalc'] - allValues['tareweightcalc']
        return String(Math.round(100000*difference)/100000)
      }
    }
  }
})

function App() {
  return (
    <div style={{ padding: 5, margin: 0, width: '100%', height: '100%'}}>
      <CssBaseline />
      <FormSelection>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          validate={validate}
          decorators={[calculator]}
          render={Manufacturing}
          name='Manufacturing'
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
    </div>
  )
}

render(<App />, document.getElementById('app'))
