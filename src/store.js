import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as services from '@/service/dividaAtivaService'

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
        auth_request(state) {
            state.status= 'loading'
        },
        auth_success(state, dados) {
            state.status ='success',
            state.token = dados.token,
            state.user = dados.user
        },
        auth_erro(state) {
            state.status = 'error'
        }, 
        logout(state) {
            state.status= ''
            state.token=''
        }
    },
    actions:{
        attemptLogin ({dispatch, commit}, user) {
            return new Promise((resolve,reject) =>{
                services.postLogin(user)
                .then(resp=>{
                    const token = resp.data.token
                    console.log("logado")    
                    // TODO: Verificar se o token tem ROLE_CIASC. Caso não tenha, gerar mensagem de erro e não executar as linhas abaixo
                    localStorage.setItem('token', token)
                    commit('auth_success', { token, user: user.username })
                    axios.defaults.headers.common['Authorization'] = token
                    resolve(resp)
                    })
                .catch(err =>{
                    console.log('erro login')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
    
        attemptLogout({commit}){
            localStorage.removeItem('token')         
            
            delete axios.defaults.headers.common['Authorization']
            return commit('logout')
        },
        attemptAddUser({commit}){
            
        }
    },
    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isRoleCiasc () {
            if (!Vue.$jwt.hasToken()) {
              return false
            }

            const decoded = Vue.$jwt.decode()
            
            return decoded.roles.indexOf('ROLE_CIASC') >= 0
        } 
    }
})