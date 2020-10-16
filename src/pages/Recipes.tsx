import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux'

import { Recipe } from '../component/Recipe'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

import { getRecipes, getUserRecipesThunk, setFilter } from '../redux/slice/recipeSlice'

const useStyles = makeStyles({
  
  recipesContainer: {
    marginTop: 10
  }
})

const Recipes: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const recipes = useSelector((state: RootState) => state.recipesReducer.recipes)
  const filter = useSelector((state: RootState) => state.recipesReducer.filter)
  const authUser = useSelector((state: RootState) => state.authReducer.isAuthenticated)
  useEffect(() => { 
    
  }, [ recipes])
  const getAllRecipes = () => {
    dispatch(getRecipes())
    dispatch(setFilter("all"))
  }
  const getMyRecipes = () => {
    dispatch(getUserRecipesThunk())
    dispatch(setFilter("my"))

  }
  
  return (
    <Container className={classes.recipesContainer}>
      <Grid container justify='center' spacing={3}  >
        <Grid item >
            <Button variant="contained"
            onClick={() => {getAllRecipes()}}
            color={filter ==='all' ? "primary" : "default"}
            >All recipes</Button>
            
        </Grid>
        <Grid item >
        <Button 
            variant="contained" 
            color={filter ==='my' ? "primary" : "default"} 
            disabled={!authUser}
            onClick={() => { getMyRecipes()}}
            >My recipes</Button>
            
        </Grid>
      </Grid>
        {recipes.map((r) => {
          return (
            <Recipe
              key={r._id}
              usernameRecipe={r.user_id.username}
              userIdRecipe={r.user_id._id}
              date={r.date}
              id={r._id}
              title={r.title}
              description={r.description}></Recipe>
          )
        })
      }
    </Container>
  )
}

export default Recipes
