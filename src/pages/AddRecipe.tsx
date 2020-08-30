import React from 'react'
import { useState } from 'react'
import { addRecipe } from '../redux/slice/recipeSlice'
import { useDispatch } from 'react-redux'
// import { useContext } from 'react'
// import { RecipeContext } from '../context/RecipeContext'

const AddRecipe = () => {
  // const { addRecipe } = useContext(RecipeContext)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      id: Date.now(),
      title,
      description,
    }
    dispatch(addRecipe(body))
    setTitle('')
    setDescription('')
    //TODO: add action => go to home page
  }

  return (
    <div className='row'>
      <form className='col s12' onSubmit={submitForm}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='title'
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Name Recipe'
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            <textarea
              id='description'
              className='materialize-textarea'
              name='description'
              value={description}
              placeholder='Description Recipe'
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <button className='btn-floating btn-small waves-effect waves-light red pulse right'>
          <i className='material-icons'>add</i>
        </button>
      </form>
    </div>
  )
}

export default AddRecipe
