export type RecipeT = {
  _id: string
  title: string
  description: string
  date: string
  user_id: UserT
}

export type UserT = {
  _id: string
  username: string
  email: string
}
