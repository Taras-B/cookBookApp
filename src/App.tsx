import React, { useEffect } from 'react'

import { Switch, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import './App.css'


import { getRecipes } from './redux/slice/recipeSlice'
import { loadCurrentUserThunk } from './redux/slice/authSlice'
import { RootState } from './redux'

import AddRecipe from './pages/AddRecipe'
import Recipes from './pages/Recipes'
import Login from './pages/Login'
import { Registration } from './pages/Registration'
import { Header } from './component/Header'
import { PrivateRoute } from './component/PrivateRouter'
import { Loader } from './component/Loader'
import { setAlert } from './redux/slice/appSlice';
import { CustomAlert } from './component/CustomAlert';

function App() {
  const dispatch = useDispatch()
  // const loadingRecipe = useSelector((state: RootState) => state.recipesReducer.loading)
  const loading = useSelector((state: RootState) => state.appReducer.loading)
  const alert = useSelector((state: RootState) => state.appReducer.alert)
  

  
  useEffect(() => {
    dispatch(getRecipes())
    dispatch(loadCurrentUserThunk())
  }, [dispatch])
  
  return (
    <>
      <Header />
      <div>
      {alert ? <CustomAlert onCloseAlert={() => {dispatch(setAlert(null))}}>{alert}</CustomAlert> : null}
        { loading === true ?  <Loader/> :
  
        <Switch>
          <Route exact path='/' component={Recipes} />
          <PrivateRoute exact path='/addRecipe' component={AddRecipe} />
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/registration' component={Registration} />
        </Switch>
        }

      </div>
    </>
  )
}

export default App
