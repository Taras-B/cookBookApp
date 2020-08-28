import React from 'react'

import { Switch, Route } from 'react-router-dom'

import './App.css'

import AddRecipe from './pages/AddRecipe'
import Recipes from './pages/Recipes'
import { Header } from './component/Header'

import RecipeContextProvider from './context/RecipeContext'

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <RecipeContextProvider>
          <Switch>
            <Route exact path='/' render={() => <Recipes />} />
            <Route path='/addRecipe' render={() => <AddRecipe />} />
          </Switch>
        </RecipeContextProvider>
      </div>
    </>
  )
}
// ------- API -----
//  https://mycook-book-api.herokuapp.com/

export default App
