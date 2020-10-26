import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '..'
import { recipeAPI } from '../../api'
import { RecipeT } from '../../types'
import { setEndLoading, setStartLoading } from './appSlice'

type RecipesStateT = {
  recipes: Array<RecipeT>
  
  filter: 'all' | 'my'
}

const recipeState: RecipesStateT = {
  recipes: [],
  
  filter: 'all',
}

type EditRecipeActionT = Omit<RecipeT, 'date' | 'user_id'>

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: recipeState,
  reducers: {
    // setStartLoading: (state, action: PayloadAction) => {
    //   state.loading = true
    // },
    // setEndLoading: (state, action: PayloadAction) => {
    //   state.loading = false
    // },
    setFilter: (state, action: PayloadAction<'all' | 'my'>) => {
      state.filter = action.payload
    },
    loadRecipes: (state, action: PayloadAction<Array<RecipeT>>) => {
      state.recipes = action.payload
      // state.loading = false
    },
    addRecipe: (state, action: PayloadAction<RecipeT>) => {
      state.recipes.push(action.payload)
      // state.loading = false
    },
    editRecipe: (state, action: PayloadAction<EditRecipeActionT>) => {
      const recipe = state.recipes.findIndex((r) => r._id === action.payload._id)

      if (recipe > -1) {
        state.recipes[recipe].title = action.payload.title
        state.recipes[recipe].description = action.payload.description
      }
      // state.loading = false
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      const recipe = state.recipes.findIndex((r) => r._id === action.payload)

      if (recipe > -1) {
        state.recipes.splice(recipe, 1)
      }

      // state.loading = false
    },
  },
})

export const recipesReducer = recipeSlice.reducer

export const {
  editRecipe,
  addRecipe,
  // setStartLoading,
  // setEndLoading,
  removeRecipe,
  setFilter,
} = recipeSlice.actions

// THUNK
export const getRecipes = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setStartLoading())
    const data = await recipeAPI.fetchAll()
    if (data.success) {
      dispatch(recipeSlice.actions.loadRecipes(data.recipes))
      dispatch(setEndLoading())
    }
  } catch (e) {
    console.log(e)
    dispatch(setEndLoading())
  }
}
export const getUserRecipesThunk = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setStartLoading())
    const data = await recipeAPI.fetchUserRecipe()
    if (data.success) {
      dispatch(recipeSlice.actions.loadRecipes(data.recipes))
      dispatch(setEndLoading())
    }
  } catch (e) {
    console.log(e)
    dispatch(setEndLoading())
  }
}

export const addRecipeThunk = (title: string, description: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setStartLoading())
    const data = await recipeAPI.add(title, description)
    console.log(data)

    if (data.success) {
      dispatch(addRecipe(data.recipe))
      dispatch(setEndLoading())
    }
    //TODO:
    // add error action
  } catch (e) {
    console.log('ERROR_ADD_RECIPE', e)
    dispatch(setEndLoading())
  }
}

export const editRecipeThunk = (
  id: string,
  title: string,
  description: string
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setStartLoading())
    const data = await recipeAPI.update(id, title, description)

    if (data.success) {
      dispatch(editRecipe({ _id: id, title, description }))
      dispatch(setEndLoading())
    }
  } catch (e) {
    console.log(e)
    dispatch(setEndLoading())
  }
}

export const removeRecipeThunk = (id: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setStartLoading())
    const data = await recipeAPI.delete(id)
    if (data.success) {
      dispatch(removeRecipe(id))
      dispatch(setEndLoading())
    }
  } catch (e) {
    console.log(e)
    dispatch(setEndLoading())
  }
}
