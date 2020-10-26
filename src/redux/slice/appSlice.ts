import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type AppStateT = {
    loading: boolean
    alert: string | null
  }
  
  const appState: AppStateT = {
    loading: false,
    alert: ' lorem*5fs f sdf sd'
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
      setAlert: (state, action: PayloadAction<string | null>) => {
        state.alert = action.payload
      },
      
    },
  })
  
  export const appReducer = appSlice.reducer
  
  export const {
    
    setStartLoading,
    setEndLoading,
    setAlert
    
  } = appSlice.actions