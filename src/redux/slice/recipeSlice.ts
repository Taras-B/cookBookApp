import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '..'
import {
  fetchRecipesAPI,
  addRecipeAPI,
  deleteRecipeAPI,
  editRecipeAPI,
} from '../../api/recipesAPI'
import { RecipeT } from '../../types'

type RecipesStateT = {
  recipes: Array<RecipeT>
  loading: boolean
}

const recipeState: RecipesStateT = {
  recipes: [],
  loading: false,
}

type EditRecipeActionT = Omit<RecipeT, 'date'>

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: recipeState,
  reducers: {
    startLoading: (state, action: PayloadAction) => {
      state.loading = true
    },
    loadRecipes: (state, action: PayloadAction<Array<RecipeT>>) => {
      state.recipes = action.payload
      state.loading = false
    },
    addRecipe: (state, action: PayloadAction<RecipeT>) => {
      state.recipes.push(action.payload)
      state.loading = false
    },
    editRecipe: (state, action: PayloadAction<EditRecipeActionT>) => {
      const recipe = state.recipes.findIndex((r) => r._id === action.payload._id)

      if (recipe > -1) {
        state.recipes[recipe].title = action.payload.title
        state.recipes[recipe].description = action.payload.description
      }
      state.loading = false
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      const recipe = state.recipes.findIndex((r) => r._id === action.payload)

      if (recipe > -1) {
        state.recipes.splice(recipe, 1)
      }

      state.loading = false
    },
  },
})

export const recipesReducer = recipeSlice.reducer

export const { editRecipe, addRecipe, startLoading, removeRecipe } = recipeSlice.actions

// THUNK
export const getRecipes = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(startLoading())
    const data = await fetchRecipesAPI()
    if (data.success) {
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
    dispatch(startLoading())
    const data = await addRecipeAPI(title, description)
    if (data.success) {
      dispatch(addRecipe(data.recipe))
    }
  } catch (e) {
    console.log(e)
  }
}

export const editRecipeThunk = (
  id: string,
  title: string,
  description: string
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(startLoading())
    const data = await editRecipeAPI(id, title, description)

    if (data.success) {
      dispatch(editRecipe({ _id: id, title, description }))
    }
  } catch (e) {
    console.log(e)
  }
}

export const removeRecipeThunk = (id: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(startLoading())
    const data = await deleteRecipeAPI(id)
    if (data.success) {
      dispatch(removeRecipe(id))
    }
  } catch (e) {
    console.log(e)
  }
}
