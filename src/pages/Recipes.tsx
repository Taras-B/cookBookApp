import React from 'react'
import { Recipe, BodyEditRecipeT } from '../component/Recipe'
import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'

type RecipeT = {
  title: string
  description: string
  id: number
  editRecipe: (body: BodyEditRecipeT) => void
}

const Recipes = () => {
  const { recipes, editRecipe } = useContext(RecipeContext)
  if (recipes.length === 0) {
    return <h5 className='center-align m-3'>No recipes yet</h5>
  }
  return (
    <>
      {recipes.map((r: RecipeT) => {
        return (
          <div key={r.id}>
            <Recipe
              date={r.id}
              title={r.title}
              description={r.description}
              editRecipe={editRecipe}></Recipe>
          </div>
        )
      })}
    </>
  )
}

export default Recipes
