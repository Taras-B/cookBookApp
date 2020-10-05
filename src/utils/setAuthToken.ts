import { instance } from '../api/recipesAPI'

export const setAuthToken = (token: string) => {
  if (token) {
    console.log(token)

    // Apply authorization token to every request if logged in
    instance.defaults.headers.common['Authorization'] = token
  } else {
    // Delete auth header
    delete instance.defaults.headers.common['Authorization']
  }
}
