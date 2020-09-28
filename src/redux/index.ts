import {
  configureStore,
  getDefaultMiddleware,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'

import logger from 'redux-logger'
import { recipesReducer } from './slice/recipeSlice'
import { authReducer } from './slice/authSlice'

// const preloadedState = {
//   recipesReducer: {
//     recipes: [
//       {
//         id: Date.now(),
//         title: '1 recipe',
//         description: '1 recipe description',
//       },
//     ],
//   },
// }

const reducer = {
  recipesReducer,
  authReducer,
}

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer,
  middleware,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
