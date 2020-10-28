import { createSlice, PayloadAction } from "@reduxjs/toolkit"
/* 
  TODO :
  *export alert and move in folder 'types'
  *import in component CustomAlert
 */
type AlertT = {
    open: boolean
    message: string | null
    type: "success" | "info" | "warning" | "error" | undefined
}
type AppStateT = {
    loading: boolean
    alert: AlertT
  }
  
  const appState: AppStateT = {
    loading: false,
    alert: {
        open: true,
        message: "string Alert word",
        type: 'warning',
    }
  }
  
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
      setAlert: (state, action: PayloadAction<Omit<AlertT, 'open'>>) => {

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