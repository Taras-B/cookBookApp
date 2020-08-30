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
    editRecipe: (state, action: PayloadAction<RecipeT>) => {
      const recipe = state.recipes.findIndex((r) => r.id === action.payload.id)

      if (recipe > -1) {
        state.recipes[recipe] = action.payload
      }
    },
    removeRecipe: (state, action: PayloadAction<number>) => {
      const recipe = state.recipes.findIndex((r) => r.id === action.payload)

      if (recipe > -1) {
        state.recipes.splice(recipe, 1)
      }
    },
  },
})

export const recipesReducer = recipeSlice.reducer

export const { addRecipe, editRecipe, removeRecipe } = recipeSlice.actions
