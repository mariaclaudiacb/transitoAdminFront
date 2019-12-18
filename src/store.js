import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as services from '@/service/dividaAtivaService'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {
            username: "",
            password: ""
        },
        inclusaoUsuario: {
            usuario: "",
            orgaoDenatranId: "",
            autorizacao: "",

        },
        cdaBaixar: {
            codigoOrgao: "",
            numeroAuto: "",
            codigoInfracao: "",
            desdobramento: "",
        },
        orgaosDetran: {
            nome: "",
            codigoDenatran: ""
        },
        orgaoDenatran: {
            idDenatran: "",
            nome: ""
        }

    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, dados) {
            state.status = 'success',
                state.token = dados.token,
                state.user = dados.user
        },
        auth_erro(state) {
            state.status = 'error'
        },
        addUser_success(state, dados) {
            state.status = 'Adcionado com Sucesso',
                state.inclusaoUsuario = dados
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        baixarcda(state, dados) {
            state.status = ''
            state.cdaBaixar = dados
        },
        detranOrgaos(state, dados) {
            state.status = ''
            state.orgaosDetran = dados

        },
        denatranOrgaos(state, dados) {
            state.status = ''
           Vue.set(state, 'orgaoDenatran',[...dados])
        }

    },
    actions: {
        attemptLogin({ dispatch, commit }, user) {
            return new Promise((resolve, reject) => {
                services.postLogin(user)
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.setItem('token', token)
                        const decoded = Vue.$jwt.decode()
                        if (decoded.roles.indexOf('ROLE_CIASC') >= 0) {
                            commit('auth_success', { token, user: user.username })
                            axios.defaults.headers.common['Authorization'] = token
                            resolve(resp)
                        } else {
                            throw "Não autorizado"
                        }
                    })
                    .catch(err => {
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },

        attemptLogout({ commit }) {
            localStorage.removeItem('token')

            delete axios.defaults.headers.common['Authorization']
            return commit('logout')
        },
        attemptAddUser({ dispatch, commit }, inclusaoUsuario) {
            return new Promise((resolve, reject) => {

                services.postAddUser(inclusaoUsuario)
                    .then(resp => {
                        console.log('incluiu')
                        commit('addUser_success', inclusaoUsuario)
                        resolve(resp)
                    })

                    .catch(err => {
                        console.log('erro ao adicionar usuário')
                        reject(err)
                    })

            })
        },


        attemprBaixarCDA({ commit }, cdaBaixar) {
            services.getBaixaCDAErro(cdaBaixar)
                .then(resp => {
                    commit('baixarcda', cdaBaixar)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        },
        attemptOrgaosDetran({ commit }, orgaoDenatranId) {
           services.getOrgaosDetran(orgaoDenatranId)
                .then(resp => {
                    commit('denatranOrgaos', resp.data)
                    
                })
                .catch(err => {
                    console.log(err)
                })
        },

    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isRoleCiasc() {
            if (!Vue.$jwt.hasToken()) {
                return false
            }

            const decoded = Vue.$jwt.decode()

            return decoded.roles.indexOf('ROLE_CIASC') >= 0
        },
        listarOrgaosDetran() {
            return state
        }
    }
})