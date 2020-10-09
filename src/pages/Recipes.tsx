import React from 'react'
import { useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import { Recipe } from '../component/Recipe'
import { RootState } from '../redux'

const Recipes: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipesReducer.recipes)

  return (
    <Container>
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
