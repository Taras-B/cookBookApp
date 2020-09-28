import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '..'
import { fetchRecipesAPI, authRegisterAPI, authLoginAPI } from '../../api/recipesAPI'
import { RecipeT } from '../../types'

type AuthStateT = {
  token: null | string
  isAuthenticated: null | boolean
  loading: boolean
  user: null | string
}

const authState: AuthStateT = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
}

type EditRecipeActionT = Omit<RecipeT, 'date'>

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    startLoading: (state, action: PayloadAction) => {
      state.loading = true
    },
    loadRecipes: (state, action: PayloadAction<Array<RecipeT>>) => {
      //   state.recipes = action.payload
      state.loading = false
    },
    addRecipe: (state, action: PayloadAction<RecipeT>) => {
      //   state.recipes.push(action.payload)
      state.loading = false
    },
  },
})

export const authReducer = authSlice.reducer

export const { startLoading } = authSlice.actions
