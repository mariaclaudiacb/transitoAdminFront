<template>
    
    <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6"></div>
    
        <div class="col-xl-5 col-lg-7 col-md-6">
            <card class="card" title="Login">
                <div>
                    <form @submit.prevent>
                        <div class="col-md-10">
                            <fg-input type="email" label="Email" v-model="username" placeholder="Email" required autofocus/>
                        </div>
                        <div class="col-md-10">
                            <fg-input type="password" label="Password" v-model="password" placeholder="Senha" required/>
                        </div>
                        <div class="text-center">
                        <button type="submit" round @click="handleSubmit">
                                Entrar
                        </button>
                        </div>
                    </form>                       
                </div>
            </card>
        </div>
    </div>
 
</template>
<script>
    export default {
        data(){
            return{
                    username: "",
                    password: ""  
            }
        },
        methods:{
            handleSubmit(e){
                e.preventDefault()
                if(this.password.length > 0){
                   console.log(this.username)
                   this.$http.post('http://localhost:8080/login',{
                        username : this.username,
                        password: this.password,
                        
                    })
                    .then(response=> {
                        //vc deveria guardar no vuex
                        localStorage.setItem('token', response.data.token)
                        this.$router.push('/dashboard')     
                    })
                }
            }        
        }
    }
 
</script>
<style>

</style>


