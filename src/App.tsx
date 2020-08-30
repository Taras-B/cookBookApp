import React from 'react'

import { Switch, Route } from 'react-router-dom'

import './App.css'

import AddRecipe from './pages/AddRecipe'
import Recipes from './pages/Recipes'
import { Header } from './component/Header'

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/' render={() => <Recipes />} />
          <Route path='/addRecipe' render={() => <AddRecipe />} />
        </Switch>
      </div>
    </>
  )
}

export default App
