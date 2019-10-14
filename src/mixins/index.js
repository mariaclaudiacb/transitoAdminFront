import { tratarErro } from '@/util/general-util'

export const mixin ={
    methods:{
        trataErro(erro){
            return tratarErro(erro)
        }
    }
}