import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        status:'',
        token: localStorage.getItem('token')|| '',
        user:{
            username:"",
            password:""
        }
    },
    mutations:{
        auth_request(state){
            state.status= 'loading'
        },
        auth_success(state,token, user){
            state.status='success',
            state.token= token,
            state.user = user.username
        },
        auth_erro(state){
            state.status = 'error'
        }, 
        logout(state){
            state.status= ''
            state.token=''
        }
    },
    actions:{
        login({commit}, user){
            return new Promise((resolve,reject) =>{
                commit(auth_request)
                axios({url: 'http://localhost:8081/login', data:(user.username, user.password), method: 'POST'})
                .then(resp=>{
                    const token = resp.data.token
                    const user = resp.data.user.username
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_sccess',token, user)
                    resolve(resp)
                })
                .catch(err =>{
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject)=> {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})