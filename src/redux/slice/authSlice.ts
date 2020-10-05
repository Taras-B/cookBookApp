import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '..'
import { authAPI } from '../../api'
import { UserT } from '../../types'
import { setAuthToken } from '../../utils/setAuthToken'

type AuthStateT = {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  user: UserT | null
}

const authState: AuthStateT = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    endLoading: (state) => {
      state.loading = false
    },
    registerUser: (state, action: PayloadAction) => {
      //   state.recipes = action.payload
      state.loading = false
    },
    setTokenUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload!)
    },
    loginUser: (state, action: PayloadAction<UserT>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    setLoadCurrentUser: (state, action: PayloadAction<UserT>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    logoutUser: (state, action: PayloadAction) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
      state.loading = false
    },
  },
})

export const authReducer = authSlice.reducer

export const {
  startLoading,
  endLoading,
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
    dispatch(startLoading())
    const data = await authAPI.register(email, password, username)
    console.log(data)

    if (data.success) {
      dispatch(endLoading())
    }
    //TODO:
    // add end loading action
    // add error action
  } catch (e) {
    console.log('ERROR_ADD_AUTH:', e)
    dispatch(endLoading())
  }
}

export const loginThunk = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(startLoading())
    const { data, success } = await authAPI.login(email, password)
    console.log(data)

    if (success) {
      dispatch(setTokenUser(data.token))
      dispatch(loginUser({ _id: data._id, email: data.email, username: data.username }))
      setAuthToken(data.token)
    }
    //TODO:
    // add end loading action
    // add error(message) action
  } catch (e) {
    console.log('ERROR_ADD_AUTH:', e)
    dispatch(endLoading())
  }
}

export const loadCurrentUserThunk = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem('token')) {
      //@ts-ignore
      setAuthToken(localStorage.getItem('token'))
    }
    dispatch(startLoading())
    const data = await authAPI.currentUser()

    if (data.success) {
      dispatch(setLoadCurrentUser(data.user))
    }
  } catch (e) {
    console.log(e)
    dispatch(logoutUser())
    //TODO:  add error alert login user
    dispatch(endLoading())
  }
}
