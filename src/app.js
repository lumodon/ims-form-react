import React from 'react'
import { render } from 'react-dom'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-calculate'
import {
  Typography,
  CssBaseline,
} from '@material-ui/core'
import formRender from './components/FormRender'

window.addEventListener('message', evt => {
  let data
  try {
    data = JSON.parse(evt.data)
  } catch(err) {
    if(!err.message.includes('Unexpected token'))
      throw err
    data = evt.data
  }

  console.log('\ninside-data:\n', data)
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
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Manufacturing Department
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={validate}
        decorators={[calculator]}
        render={formRender}
      />
    </div>
  )
}

render(<App />, document.getElementById('app'))
