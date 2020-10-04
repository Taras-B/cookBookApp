import axios from 'axios'
import { RecipeT } from '../types'

const instance = axios.create({
  withCredentials: false,
  baseURL: 'https://mycook-book-api.herokuapp.com/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `${localStorage.getItem('token')}`,
  },
})

type GetRecipesResponse = {
  success: boolean
  recipes: Array<RecipeT>
}

type DefaultResponse = {
  success?: boolean
  message?: string
}

export const authRegisterAPI = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await instance.post<DefaultResponse>(`auth/register`, {
    email,
    password,
    username,
  })

  return response.data
}

type LoginResponseT = DefaultResponse & {
  data: {
    username: string
    email: string
    token: string
  }
}

export const authLoginAPI = async (email: string, password: string) => {
  const response = await instance.post<LoginResponseT>(`auth/login`, {
    email,
    password,
  })

  return response.data
}

// Recipes
export const fetchRecipesAPI = async () => {
  const response = await instance.get<GetRecipesResponse & DefaultResponse>(`recipes/`)

  return response.data
}
export const fetchMyRecipesAPI = async () => {
  const response = await instance.get<GetRecipesResponse & DefaultResponse>(`recipes/my`)

  return response.data
}

type AddRecipePostT = {
  message: string
  success: boolean
  recipe: RecipeT
}

export const addRecipeAPI = async (title: string, description: string) => {
  const response = await instance.post<AddRecipePostT & DefaultResponse>(`recipes/add`, {
    title,
    description,
  })

  return response.data
}

export const editRecipeAPI = async (id: string, title: string, description: string) => {
  const response = await instance.post<DefaultResponse>(`recipes/edit/${id}`, {
    title,
    description,
  })

  return response.data
}

export const deleteRecipeAPI = async (id: string) => {
  const response = await instance.delete<DefaultResponse>(`recipes/delete/${id}`)

  return response.data
}
