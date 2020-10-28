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
export type AlertTypeMessageT = "success" | "info" | "warning" | "error" | undefined
export type AlertT = {
  open: boolean
  message: string | null
  type: AlertTypeMessageT
}