import React, { useState } from 'react'
import moment from 'moment'

export type BodyEditRecipeT = {
  id: number
  title: string
  description: string
}

type PropsT = {
  title: string
  description: string
  date: number
  editRecipe: (body: BodyEditRecipeT) => void
}

export const Recipe: React.FC<PropsT> = ({ title, description, date, editRecipe }) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      {editMode ? (
        <EditRecipe
          editRecipe={editRecipe}
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
              className='waves-effect waves-light btn red btn-small right m-r2 text-btn'
              onClick={() => setEditMode(true)}>
              Edit
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
  editRecipe: (body: BodyEditRecipeT) => void
}

const EditRecipe: React.FC<PropsEditT> = ({
  title,
  description,
  id,
  editRecipe,
  setEditMode,
}) => {
  const [locTitle, setTitle] = useState(title)
  const [locDescription, setDescription] = useState(description)

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let body = {
      id,
      title: locTitle,
      description: locDescription,
    }
    editRecipe(body)
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
