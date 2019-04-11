import React from 'react'
import { render } from 'react-dom'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-calculate'
import {
  Typography,
  Link,
  CssBaseline,
} from '@material-ui/core'
import formRender from './components/FormRender'

const onSubmit = async values => {
  const sleep = (ms=1000) => new Promise(resolve => setTimeout(resolve, ms))
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
  console.log(JSON.stringify(values, 0, 2))
}

const validate = values => {
  const errors = {}
  if (!values.desiredQty) {
    errors.desiredQty = 'Required'
  }
  if (!values.source) {
    errors.source = 'Required'
  }
  if (!values.mfgDate) {
    errors.mfgDate = 'Required'
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
      delete allValuesCopy.total
      for(const key in (allValuesCopy || {})) {
        sum += Number(allValuesCopy[key] || 0)
      }
      return String(Math.round(100000*sum)/100000)
    }
  }
})

function App() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        🏁 Chain Of Custody 🏁
      </Typography>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Manufacturing Department
      </Typography>
      <Typography paragraph>
        <Link href="https://github.com/erikras/react-final-form#-react-final-form">
          Read Docs
        </Link>
        . This example demonstrates using{' '}
        <Link href="https://material-ui.com/demos/text-fields/">
          Material-UI
        </Link>{' '}
        form controls.
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
