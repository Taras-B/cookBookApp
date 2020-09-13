import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '..'
import { fetchRecipesAPI, addRecipeAPI } from '../../api/recipesAPI'
import { RecipeT } from '../../types'

type RecipesStateT = {
  recipes: Array<RecipeT>
}

const recipeState: RecipesStateT = {
  recipes: [],
}

type EditRecipeActionT = Omit<RecipeT, 'date'>

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: recipeState,
  reducers: {
    loadRecipes: (state, action: PayloadAction<Array<RecipeT>>) => {
      state.recipes = action.payload
    },
    addRecipe: (state, action: PayloadAction<RecipeT>) => {
      state.recipes.push(action.payload)
    },
    editRecipe: (state, action: PayloadAction<EditRecipeActionT>) => {
      const recipe = state.recipes.findIndex((r) => r._id === action.payload._id)

      if (recipe > -1) {
        state.recipes[recipe].title = action.payload.title
        state.recipes[recipe].description = action.payload.description
      }
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      const recipe = state.recipes.findIndex((r) => r._id === action.payload)

      if (recipe > -1) {
        state.recipes.splice(recipe, 1)
      }
    },
  },
})

export const recipesReducer = recipeSlice.reducer

export const { addRecipe, editRecipe, removeRecipe } = recipeSlice.actions

export const getRecipes = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    console.log('fetch')

    const data = await fetchRecipesAPI()
    console.log(data)
    if (data.recipes) {
      dispatch(recipeSlice.actions.loadRecipes(data.recipes))
    }
  } catch (e) {
    console.log(e)
  }
}

export const addRecipeThunk = (title: string, description: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    console.log('add')

    const data = await addRecipeAPI(title, description)
    console.log(data)
    if (data.success) {
      dispatch(addRecipe(data.recipe))
    }
  } catch (e) {
    console.log(e)
  }
}
