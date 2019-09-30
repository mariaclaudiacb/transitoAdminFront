<template>
    
    <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6"></div>
    
        <div class="col-xl-5 col-lg-7 col-md-6">
            <card class="card" title="Login">
                <div>
                    <form class="login" @submit.prevent="login">
                        <div class="col-md-10">
                            <fg-input type="email" label="Email" v-model="username" placeholder="Email" required autofocus/>
                        </div>
                        <div class="col-md-10">
                            <fg-input type="password" label="Password" v-model="password" placeholder="Senha" required/>
                        </div>
                        <div class="text-center">
                        <button type="submit" round @click="handleSubmit">
                                ENTRAR
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
                              
                    this.$store.dispatch('attemptLogin',{
                        username : this.username,
                        password: this.password,
                        
                    })
                    .then(response=> {
                        this.$router.push('/dashboard')     
                    },
                    erro=>{
                        console.log(erro)
                    })
                    
                }
            }        
        }
    }
 
</script>
<style>

</style>


