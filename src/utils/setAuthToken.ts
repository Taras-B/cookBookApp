import { instance } from '../api'

export const setAuthToken = (token: string | null) => {
  if (token) {
    // Apply authorization token to every request if logged in
    instance.defaults.headers.common['Authorization'] = token
  } else {
    console.log(token)
    // Delete auth header
    delete instance.defaults.headers.common['Authorization']
  }
}
