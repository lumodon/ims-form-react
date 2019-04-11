import React, { Component } from 'react'

export default class SavedForms extends Component {
  render() {
    const menuItems = []
    // make api call to fetch forms and populate menuItems
    // Need to create a savedForms class and componentDidMount is
    // where fetch will happen then need to make stateful component
    // and populate from state

    Promise.resolve([
      {
        value: 'london',
        label: 'London',
      }, {
        value: 'paris',
        label: 'Paris',
      }
    ])
      .then()
    return false ?
      (
        <Grid item xs={12}>
          <Field
            fullWidth
            name="savedforms"
            component={Select}
            label="Load Saved Form"
            formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="London">London</MenuItem>
            <MenuItem value="Paris">Paris</MenuItem>
            <MenuItem value="Budapest">
              A city with a very long Name
            </MenuItem>
          </Field>
        </Grid>
      ) : null
  }
}