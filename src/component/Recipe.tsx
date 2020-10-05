import React, { useState } from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import { useDispatch } from 'react-redux'
import { editRecipeThunk, removeRecipeThunk } from '../redux/slice/recipeSlice'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  root: {
    // minWidth: 700,
    flexGrow: 1,
  },
  recipeBody: {
    padding: 10,
  },
  recipeHeader: {
    textAlign: 'center',
  },
})

type PropsT = {
  id: string
  title: string
  description: string
  date: string
}

export const Recipe: React.FC<PropsT> = ({ id, title, description, date }) => {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  return (
    <Grid container justify='center' spacing={3} className={classes.root} wrap='wrap'>
      {/* {editMode ? (
        <EditRecipe
          title={title}
          description={description}
          id={id}
          setEditMode={setEditMode}></EditRecipe>
      ) : (
        <> */}
      <Grid item md={8} xs={12}>
        <Paper elevation={12} className={classes.recipeBody}>
          <Typography variant='h6' className={classes.recipeHeader}>
            {title}
          </Typography>
          <Divider variant='middle' />
          <Typography variant='body1' noWrap={true}>
            {description}
          </Typography>
          <br />
          <Typography>
            <strong>Created:</strong> {moment(date).format('DD/MM/YYYY, HH:mm')}
          </Typography>
          <br />

          <button
            className='waves-effect waves-light btn  btn-small right m-r2 text-btn'
            onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button
            className='waves-effect waves-light btn red btn-small right m-r2 text-btn'
            onClick={() => dispatch(removeRecipeThunk(id))}>
            Delete
          </button>
        </Paper>
      </Grid>
      {/* </>
      )} */}
    </Grid>
  )
}

type PropsEditT = {
  id: string
  setEditMode: (editMode: boolean) => void
  title: string
  description: string
}

const EditRecipe: React.FC<PropsEditT> = ({ title, description, id, setEditMode }) => {
  const [locTitle, setTitle] = useState(title)
  const [locDescription, setDescription] = useState(description)
  const dispatch = useDispatch()

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // let body = {
    //   id,
    //   title: locTitle,
    //   description: locDescription,
    // }
    dispatch(editRecipeThunk(id, locTitle, locDescription))
    setEditMode(false)
  }
  return (
    <Grid item className=''>
      <form onSubmit={submitForm}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='text'
              name='title'
              value={locTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Name Recipe'
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            <textarea
              name='description'
              className='materialize-textarea'
              value={locDescription}
              placeholder='Description Recipe'
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>
        <button className='waves-effect waves-light btn blue btn-small right m-r2 text-btn'>
          Save
        </button>
      </form>
    </Grid>
  )
}
