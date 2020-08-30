import {
  configureStore,
  getDefaultMiddleware,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'

import logger from 'redux-logger'
import { recipesReducer } from './slice/recipeSlice'

const preloadedState = {
  recipesReducer: {
    recipes: [
      {
        id: Date.now(),
        title: '1 recipe',
        description: '1 recipe description',
      },
    ],
  },
}

const reducer = {
  recipesReducer,
}

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer,
  middleware,
  preloadedState,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
