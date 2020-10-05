import { RecipeT } from '../types'

export type GetRecipesResponse = {
  success: boolean
  recipes: Array<RecipeT>
}

export type DefaultResponse = {
  success?: boolean
  message?: string
}

export type LoginResponseT = DefaultResponse & {
  data: {
    _id: string
    username: string
    email: string
    token: string
  }
}
export type CurrentUserResponseT = DefaultResponse & {
  user: {
    _id: string
    username: string
    email: string
  }
}

export type AddRecipePostT = {
  message: string
  success: boolean
  recipe: RecipeT
}
