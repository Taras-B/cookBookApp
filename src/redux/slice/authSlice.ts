import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '..'
import { authAPI } from '../../api'
import { UserT } from '../../types'
import { setAuthToken } from '../../utils/setAuthToken'
import { setAlert, setEndLoading, setStartLoading } from './appSlice'

type AuthStateT = {
  token: string | null
  isAuthenticated: boolean
  // loading: boolean
  user: UserT | null
}

const authState: AuthStateT = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  // loading: true,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {

    registerUser: (state, action: PayloadAction) => {
      //   state.recipes = action.payload
      // state.loading = false
    },
    setTokenUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload!)
    },
    loginUser: (state, action: PayloadAction<UserT>) => {
      state.user = action.payload
      state.isAuthenticated = true

    },
    setLoadCurrentUser: (state, action: PayloadAction<UserT>) => {
      state.user = action.payload
      state.isAuthenticated = true

    },
    logoutUser: (state, action: PayloadAction) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')

    },
  },
})

export const authReducer = authSlice.reducer

export const {
  setTokenUser,
  loginUser,
  registerUser,
  logoutUser,
  setLoadCurrentUser,
} = authSlice.actions


//___ THUNK___

export const registerThunk = (
  username: string,
  email: string,
  password: string
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setStartLoading())
    const data = await authAPI.register(email, password, username)
    console.log(data)

    if (data.success) {
      dispatch(setEndLoading())
    }
  } catch (e) {
    console.log('ERROR_ADD_REG_AUTH:', e.response.data.message)
    dispatch(setAlert({ message: e.response.data.message, type: 'error' }))

    dispatch(setEndLoading())
  }
}

export const loginThunk = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setStartLoading())
    const { data, success, message } = await authAPI.login(email, password)

    if (success) {
      dispatch(setTokenUser(data.token))
      dispatch(loginUser({ _id: data._id, email: data.email, username: data.username }))
      dispatch(setEndLoading())
      setAuthToken(data.token)

      dispatch(setAlert({ message: 'You success login ', type: 'success' }))

    } else {
      dispatch(setAlert({ message: message!, type: 'error' }))

    }
  } catch (e) {
    console.log('ERROR_ADD_AUTH:', e)
    dispatch(setAlert({ message: e.response.data.message, type: 'error' }))
    dispatch(setEndLoading())
  }
}

export const loadCurrentUserThunk = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem('token')) {
      //@ts-ignore
      setAuthToken(localStorage.getItem('token'))
    }
    dispatch(setStartLoading())
    const data = await authAPI.currentUser()
    console.log(data)

    if (data.success) {
      dispatch(setLoadCurrentUser(data.user))
      dispatch(setEndLoading())
    }
  } catch (e) {
    console.log(e)
    dispatch(logoutUser())
    dispatch(setEndLoading())
    if (e.response.status === 401) {
      dispatch(setAlert({ message: 'You are not logged in', type: 'warning' }))
    }

  }
}
