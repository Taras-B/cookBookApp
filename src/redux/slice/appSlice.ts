import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlertT } from "../../types"
/* 
  TODO :
  *import in component CustomAlert
 */

type AppStateT = {
  loading: boolean
  alert: AlertT
}

const appState: AppStateT = {
  loading: false,
  alert: {
    open: false,
    message: null,
    type: undefined,
  }
}

type SetAlertPayloadActionT = Omit<AlertT, 'open'>

const appSlice = createSlice({
  name: 'app',
  initialState: appState,
  reducers: {
    setStartLoading: (state, action: PayloadAction) => {
      state.loading = true
    },
    setEndLoading: (state) => {
      state.loading = false
    },
    setAlert: (state, action: PayloadAction<SetAlertPayloadActionT>) => {

      state.alert.open = true
      state.alert.message = action.payload.message
      state.alert.type = action.payload.type
    },
    closeAlert: (state, action: PayloadAction) => {
      state.alert.open = false
      state.alert.message = null
    },

  },
})

export const appReducer = appSlice.reducer

export const {

  setStartLoading,
  setEndLoading,
  setAlert,
  closeAlert

} = appSlice.actions