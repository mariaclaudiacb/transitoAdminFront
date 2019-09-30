
import axios from 'axios'
export const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Pragma: 'no-cache'
  }
})

export const postLogin = (user) => {
    return http.post('/login',user)
  }


  