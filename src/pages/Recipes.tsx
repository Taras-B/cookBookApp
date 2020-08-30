import React from 'react'
import { Recipe } from '../component/Recipe'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

type RecipeT = {
  title: string
  description: string
  id: number
}

const Recipes: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipesReducer.recipes)

  if (recipes.length === 0) {
    return <h5 className='center-align m-3'>No recipes yet</h5>
  }
  return (
    <>
      {recipes.map((r: RecipeT) => {
        return (
          <div key={r.id}>
            <Recipe date={r.id} title={r.title} description={r.description}></Recipe>
          </div>
        )
      })}
    </>
  )
}

export default Recipes
