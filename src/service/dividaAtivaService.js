
import axios from 'axios'
import store from '@/store'
export const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Pragma: 'no-cache'
  }
})

export const postLogin = (user) => {
    return http.post('/login',user)
  }

export const postAddUser = (inclusaoUsuario) =>{
  console.log(inclusaoUsuario)
  http.defaults.headers.common['Authorization'] = store.state.token
  return http.post('/admin/cadastro/usuario',inclusaoUsuario)
}

export const getOrgaosDenatran = () =>{
  http.defaults.headers.common['Authorization'] = store.state.token
  return http.get('/listarOrgaosDenatran')
}
 export const getRoles = () =>{
  http.defaults.headers.common['Authorization'] = store.state.token
  return http.get('/admin/roles')

 }