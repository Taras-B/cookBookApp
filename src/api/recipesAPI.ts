import axios from 'axios'
import { RecipeT } from '../types'

const instance = axios.create({
  withCredentials: false,
  baseURL: 'https://mycook-book-api.herokuapp.com/api/recipes',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

type GetRecipesResponse = {
  success: boolean
  recipes: Array<RecipeT>
}

export const fetchRecipesAPI = async () => {
  const response = await instance.get<GetRecipesResponse>(``)

  return response.data
}

type AddRecipePostT = {
  message: string
  success: boolean
  recipe: RecipeT
}

export const addRecipeAPI = async (title: string, description: string) => {
  const response = await instance.post<AddRecipePostT>(`add`, {
    title,
    description,
  })

  return response.data
}

export const editRecipeAPI = async (id: string, title: string, description: string) => {
  const response = await instance.post<{ success: boolean; message: string }>(
    `edit/${id}`,
    {
      title,
      description,
    }
  )

  return response.data
}

export const deleteRecipeAPI = async (id: string) => {
  const response = await instance.delete<{ success: boolean; message: string }>(
    `delete/${id}`
  )

  return response.data
}
