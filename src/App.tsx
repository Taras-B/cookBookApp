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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecipes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Header />
      <div>
        <Switch>
          <Route exact path='/' component={Recipes} />
          <Route path='/addRecipe' component={AddRecipe} />
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/registration' component={Registration} />
        </Switch>
      </div>
    </>
  )
}

export default App
