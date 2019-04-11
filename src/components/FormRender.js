import React from 'react'
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
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
} from 'material-ui-pickers'
import DatePickerWrapper from './DatePicker'
import SavedForms from './SavedForms'
import withStyle from 'react-jss'

const styles = {
  boxedGrid: {
    border: 'solid 1px black',
    borderRadius: '10px',
    padding: '0px 10px 10px 10px',
    margin: '10px',
    width: '100%',
  }
}

const BoxGrid = ({classes, children}) => (
  <div className={classes.boxedGrid}>
    {children}
  </div>
)

const StyledGrid = withStyle(styles)(BoxGrid)

export default ({ handleSubmit, submitting, pristine, values, form }) => (
  <form onSubmit={handleSubmit} noValidate>
    <Paper style={{ padding: 16 }}>
      <Grid container alignItems="flex-start" spacing={8}>
        <SavedForms/>
        <Grid item xs={6}>
          <Field
            fullWidth
            required
            name="desiredQty"
            component={TextField}
            type="text"
            label="Desired Quantity"
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
        <Grid item xs={6}>
          <Field
            fullWidth
            name="distillatebatch"
            component={TextField}
            label="Distillate Batch #"
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            fullWidth
            name="mixedterpsbatch"
            component={TextField}
            label="Mixed Terps Batch"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            name="newbatchcreated"
            component={TextField}
            label="NEW Batch # Created"
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
              form.reset()
            }}
            disabled={submitting || pristine}
          >
            Reset
          </Button>
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </form>
)
