import axios from 'axios'
import {
  AddRecipePostT,
  CurrentUserResponseT,
  DefaultResponse,
  GetRecipesResponse,
  LoginResponseT,
} from './types'

export const instance = axios.create({
  withCredentials: false,
  baseURL: 'https://mycook-book-api.herokuapp.com/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    // 'Authorization': `${localStorage.getItem('token')}`,
  },
})

export const authAPI = {
  async register(email: string, password: string, username: string) {
    const response = await instance.post<DefaultResponse>(`auth/register`, {
      email,
      password,
      username,
    })

    return response.data
  },
  async login(email: string, password: string) {
    const response = await instance.post<LoginResponseT>(`auth/login`, {
      email,
      password,
    })

    return response.data
  },
  async currentUser() {
    const response = await instance.get<CurrentUserResponseT>(`auth/user`)

    return response.data
  },
}

export const recipeAPI = {
  async fetchAll() {
    const response = await instance.get<GetRecipesResponse & DefaultResponse>(`recipes/`)
  
    return response.data
  },
  async fetchUserRecipe() {
    const response = await instance.get<GetRecipesResponse & DefaultResponse>(`recipes/my`)
  
    return response.data
  },
  async add(title: string, description: string) {
    const response = await instance.post<AddRecipePostT & DefaultResponse>(`recipes/add`, {
      title,
      description,
    })
  
    return response.data
  },
  async update(id: string, title: string, description: string) {
    const response = await instance.post<DefaultResponse>(`recipes/edit/${id}`, {
      title,
      description,
    })
  
    return response.data
  },
  async delete(id: string) {
    const response = await instance.delete<DefaultResponse>(`recipes/delete/${id}`)
  console.log('ERROR___',response.status)
    return response.data
  },
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
