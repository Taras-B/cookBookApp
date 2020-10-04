import React, { useEffect } from 'react'

import { Switch, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import './App.css'

import AddRecipe from './pages/AddRecipe'
import Recipes from './pages/Recipes'
import { Header } from './component/Header'

import { getRecipes } from './redux/slice/recipeSlice'
import Login from './pages/Login'

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
          <Route exact path='/' render={() => <Recipes />} />
          <Route path='/addRecipe' render={() => <AddRecipe />} />
          <Route exact path='/auth/login' render={() => <Login />} />
        </Switch>
      </div>
    </>
  )
}

export default App
