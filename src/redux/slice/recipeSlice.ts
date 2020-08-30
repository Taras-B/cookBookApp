import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type RecipeT = {
  id: number
  title: string
  description: string
}

type RecipesStateT = {
  recipes: Array<RecipeT>
}

const recipeState: RecipesStateT = {
  recipes: [],
}

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: recipeState,
  reducers: {
    addRecipe: (state, action: PayloadAction<RecipeT>) => {
      state.recipes.push(action.payload)
    },
  },
})

export const recipesReducer = recipeSlice.reducer

export const { addRecipe } = recipeSlice.actions
