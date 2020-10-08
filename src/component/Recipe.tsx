import React, { useState } from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { removeRecipeThunk } from '../redux/slice/recipeSlice'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { EditRecipe } from './EditRecipe'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { RootState } from '../redux'

const useStyles = makeStyles({
  root: {
    // minWidth: 700,
    flexGrow: 1,
    margin: 10,
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
  usernameRecipe?: string
  userIdRecipe: string
}

export const Recipe: React.FC<PropsT> = ({
  id,
  title,
  description,
  date,
  userIdRecipe,
}) => {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)
  const user = useSelector((state: RootState) => state.authReducer.user?._id)

  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setEditMode(true)
  }

  const handleClose = () => {
    setEditMode(false)
  }

  return (
    <Grid container justify='center' spacing={3} className={classes.root} wrap='wrap'>
      <Grid item md={8} xs={12}>
        <Paper elevation={12} className={classes.recipeBody}>
          <Grid container direction='column' spacing={3}>
            <Grid item xs>
              <Typography variant='h6' className={classes.recipeHeader}>
                {title}
              </Typography>
            </Grid>
            <Divider variant='middle' />
            <Grid item xs>
              <Typography style={{ wordWrap: 'break-word' }}>{description}</Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                <strong>Created:</strong> {moment(date).format('DD/MM/YYYY, HH:mm')}
              </Typography>
            </Grid>

            {user ? (
              userIdRecipe === user ? (
                <Grid item xs>
                  <Button variant='outlined' color='primary' onClick={handleClickOpen}>
                    Edit
                  </Button>
                  <Button
                    className='waves-effect waves-light btn red btn-small right m-r2 text-btn'
                    onClick={() => dispatch(removeRecipeThunk(id))}>
                    Delete
                  </Button>
                </Grid>
              ) : null
            ) : null}
          </Grid>
        </Paper>
        <Dialog open={editMode} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <EditRecipe
            title={title}
            description={description}
            id={id}
            handleClose={handleClose}
          />
        </Dialog>
      </Grid>
    </Grid>
  )
}
