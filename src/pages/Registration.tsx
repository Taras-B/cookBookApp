import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { registerThunk } from '../redux/slice/authSlice'

type RegistrationFormData = {
  username: string
  email: string
  password: string
}

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 64px)',
  },
})

export const Registration = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const { register, handleSubmit } = useForm<RegistrationFormData>()
  const onSubmit = ({ username, email, password }: RegistrationFormData) => {
    dispatch(registerThunk(username, email, password))
    console.log(email, ' pas', password)

    history.push('/auth/login')
  }
  return (
    <Container>
      <Grid container justify='center' alignItems='center' className={classes.wrapper}>
        <Grid item xs={12} md={5} sm={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({ required: true })}
              label='User Name'
              name='username'
              variant='outlined'
              fullWidth
              margin='normal'
              required={true}
            />
            <TextField
              inputRef={register({ required: true })}
              label='E-mail'
              name='email'
              variant='outlined'
              fullWidth
              margin='normal'
              required={true}
            />
            <TextField
              inputRef={register({ required: true })}
              label='Password'
              name='password'
              variant='outlined'
              fullWidth
              required={true}
              margin='normal'
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: '10px 0' }}>
              Registration
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}
