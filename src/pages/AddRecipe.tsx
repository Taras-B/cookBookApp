import React from 'react'
import { useState } from 'react'
import { addRecipeThunk } from '../redux/slice/recipeSlice'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

type FormData = {
  title: string
  description: string
}

const AddRecipe = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit = ({ title, description }: FormData) => {
    console.log('dataInput', title, description)
    dispatch(addRecipeThunk(title, description))
    history.push('/')
  }

  return (
    <Container>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12} sm={7}>
          <form className='col s12' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({ required: true })}
              label='Name Recipe'
              name='title'
              variant='outlined'
              fullWidth
              margin='normal'
              required={true}
            />
            <TextField
              inputRef={register({ required: true })}
              label='Description Recipe'
              name='description'
              variant='outlined'
              fullWidth
              multiline
              required={true}
              margin='normal'
            />

            <Button variant='contained' color='primary'>
              add
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddRecipe
