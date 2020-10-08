import React from 'react'
import { Recipe } from '../component/Recipe'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import { Loader } from '../component/Loader'
import Container from '@material-ui/core/Container'

const Recipes: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipesReducer.recipes)
  const loading = useSelector((state: RootState) => state.recipesReducer.loading)
  //TODO: add center

  if (recipes.length === 0 && loading === false) {
    return <h5 className='center-align m-3'>No recipes yet</h5>
  }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        recipes.map((r) => {
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
      )}
    </Container>
  )
}

export default Recipes
