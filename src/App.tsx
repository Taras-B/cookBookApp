import React, { useEffect } from 'react'

import { Switch, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import './App.css'

import AddRecipe from './pages/AddRecipe'
import Recipes from './pages/Recipes'
import { Header } from './component/Header'

import { getRecipes } from './redux/slice/recipeSlice'
import Login from './pages/Login'
import { Registration } from './pages/Registration'
import { loadCurrentUserThunk } from './redux/slice/authSlice'
import { PrivateRoute } from './component/PrivateRouter'
// import { setAuthToken } from './utils/setAuthToken'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // if (localStorage.getItem('token')) {
    //   //@ts-ignore
    //   setAuthToken(localStorage.getItem('token'))
    // }
    dispatch(getRecipes())
    dispatch(loadCurrentUserThunk())
  }, [dispatch])
  return (
    <>
      <Header />
      <div>
        <Switch>
          <Route exact path='/' component={Recipes} />
          <PrivateRoute exact path='/addRecipe' component={AddRecipe} />
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/registration' component={Registration} />
        </Switch>
      </div>
    </>
  )
}

export default App
