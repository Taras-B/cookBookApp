import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { editRecipe, removeRecipe } from '../redux/slice/recipeSlice'

type PropsT = {
  title: string
  description: string
  date: number
}

export const Recipe: React.FC<PropsT> = ({ title, description, date }) => {
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()

  return (
    <>
      {editMode ? (
        <EditRecipe
          title={title}
          description={description}
          id={date}
          setEditMode={setEditMode}></EditRecipe>
      ) : (
        <>
          <div className='row collection recipe-card z-depth-3 mb-2'>
            <h5 className='center-align'>{title}</h5>
            <hr />
            <p className='center-align m-1'>{description}</p>
            <p className='ml-1'>
              <strong>Created:</strong> {moment(date).format('DD/MM/YYYY, HH:mm')}
            </p>
            <button
              className='waves-effect waves-light btn  btn-small right m-r2 text-btn'
              onClick={() => setEditMode(true)}>
              Edit
            </button>
            <button
              className='waves-effect waves-light btn red btn-small right m-r2 text-btn'
              onClick={() => dispatch(removeRecipe(date))}>
              Delete
            </button>
          </div>
        </>
      )}
    </>
  )
}

type PropsEditT = {
  id: number
  setEditMode: (editMode: boolean) => void
  title: string
  description: string
}

const EditRecipe: React.FC<PropsEditT> = ({ title, description, id, setEditMode }) => {
  const [locTitle, setTitle] = useState(title)
  const [locDescription, setDescription] = useState(description)
  const dispatch = useDispatch()

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let body = {
      id,
      title: locTitle,
      description: locDescription,
    }
    dispatch(editRecipe(body))
    setEditMode(false)
  }
  return (
    <div className='row collection recipe-card z-depth-3 m-2'>
      <form onSubmit={submitForm}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='text'
              name='title'
              value={locTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Name Recipe'
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            <textarea
              name='description'
              className='materialize-textarea'
              value={locDescription}
              placeholder='Description Recipe'
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>
        <button className='waves-effect waves-light btn blue btn-small right m-r2 text-btn'>
          Save
        </button>
      </form>
    </div>
  )
}
