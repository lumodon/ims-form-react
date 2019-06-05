import React, { Component } from 'react'
import { TextField, Radio } from 'final-form-material-ui'
import { Field } from 'react-final-form'
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
} from 'material-ui-pickers'
import DatePickerWrapper from '../DatePicker'
import SavedForms from '../SavedForms'
import withStyle from 'react-jss'
import fetchHelper from '../../helpers/fetch'

const styles = {
  boxedGrid: {
    border: 'solid 1px black',
    borderRadius: '10px',
    padding: '0px 10px 10px 10px',
    margin: '10px',
    width: '100%',
  }
}

const formStyles = {
  wideSelect: {
    width: '100%',
  }
}

const BoxGrid = ({classes, children}) => (
  <div className={classes.boxedGrid}>
    {children}
  </div>
)

const StyledGrid = withStyle(styles)(BoxGrid)

class FillRoom extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = props.handleSubmit
    this.submitting = props.submitting
    this.pristine = props.pristine
    this.values = props.values
    this.form = props.form

    this.state = {
      batch_numbers_available: [],
    }
  }

  componentDidMount() {
    fetchHelper('get_batch_numbers')
      .then(res => {
        console.log('batchNums Result: ', res)
        this.setState({
          batch_numbers_available: res
        })
      })
  }

  render() {
    const { classes } = this.props

    return (
    <form onSubmit={this.handleSubmit} noValidate>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Fill Room Department
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={8}>
          <SavedForms/>
          <Grid item xs={6}>
            <Field
              fullWidth
              required
              name="filledBy"
              component={TextField}
              type="text"
              label="Filled By"
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              fullWidth
              required
              name="source"
              component={TextField}
              type="text"
              label="Source"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              required
              name="batch_id"
              component="select"
              // className={classes.wideSelect}
            >
              <option />
              {this.state.batch_numbers_available.map((batch_num, index) => (
                <option key={index} value={batch_num}>{batch_num}</option>
              ))}
            </Field>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
              <Field
                fullWidth
                required
                name="mfgDate"
                component={DatePickerWrapper}
                margin="normal"
                label="Mfg Date"
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Oil Standard</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="White"
                  control={
                    <Field
                      name="oilstandard"
                      component={Radio}
                      type="radio"
                      value="white"
                    />
                  }
                />
                <FormControlLabel
                  label="Black"
                  control={
                    <Field
                      name="oilstandard"
                      component={Radio}
                      type="radio"
                      value="black"
                    />
                  }
                />
                <FormControlLabel
                  label="Gold"
                  control={
                    <Field
                      name="oilstandard"
                      component={Radio}
                      type="radio"
                      value="gold"
                    />
                  }
                />
                <FormControlLabel
                  label="White-Label"
                  control={
                    <Field
                      name="oilstandard"
                      component={Radio}
                      type="radio"
                      value="whilelabel"
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={3}>
            <Field
              fullWidth
              name="tareweight"
              component={TextField}
              label="Tare Weight"
              onChange={(e) => {
                console.log(e)
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              fullWidth
              name="oilweight"
              component={TextField}
              label="Oil Weight"
              onChange={(...e) => {
                console.log(...e)
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              fullWidth
              name="total"
              component={TextField}
              placeholder="Total"
              label="Total Weight (calculated result)"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <StyledGrid>
            <Grid container>
              <Grid item xs={6}>
                <Field
                  fullWidth
                  name="formulationsmanager"
                  component={TextField}
                  label="Formulations Manager"
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field
                    fullWidth
                    name="formulationsmanagerdate"
                    component={DatePickerWrapper}
                    margin="none"
                    label="Date"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Field
                  fullWidth
                  name="inventorymanager"
                  component={TextField}
                  label="Inventory Manager"
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field
                    fullWidth
                    name="inventorymanagerdate"
                    component={DatePickerWrapper}
                    margin="none"
                    label="Date"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </StyledGrid>
          <Grid item xs={12}>
            <Field
              fullWidth
              name="notes"
              component={TextField}
              multiline
              label="Notes"
            />
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                this.form.reset()
              }}
              disabled={this.submitting || this.pristine}
            >
              Reset
            </Button>
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={this.submitting}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  )}
}

export default function FillRoomRenderable(props) {
  return (
    <React.Fragment>
      <FillRoom {...props} />
    </React.Fragment>
  )
}
