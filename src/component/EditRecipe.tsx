import React from 'react'

import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import { editRecipeThunk } from '../redux/slice/recipeSlice'

export type EditFormData = {
  formTitle: string
  formDescription: string
}

type PropsEditT = {
  id: string
  handleClose: () => void
  title: string
  description: string
}

export const EditRecipe: React.FC<PropsEditT> = ({
  title,
  description,
  id,
  handleClose,
}) => {
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<EditFormData>({
    defaultValues: { formTitle: title, formDescription: description },
  })

  const onSubmit = ({ formTitle, formDescription }: EditFormData) => {
    dispatch(editRecipeThunk(id, formTitle, formDescription))
    console.log(id, formTitle, formDescription)
    // handleClose()
  }

  return (
    <Grid item className=''>
      <DialogTitle id='form-dialog-title'>Edit Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>Here you can edit the recipe</DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register({ required: true })}
            label='Title'
            name='formTitle'
            variant='outlined'
            fullWidth
            margin='normal'
            required={true}
          />
          <TextField
            inputRef={register({ required: true })}
            label='Description'
            name='formDescription'
            variant='outlined'
            fullWidth
            required={true}
            margin='normal'
          />
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' onClick={handleClose} variant='contained' color='primary'>
            Edit
          </Button>
        </form>
      </DialogContent>
    </Grid>
  )
}
