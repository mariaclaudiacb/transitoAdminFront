export const tratarErro = (erro) => {
    if (erro.message === 'Network Error') {
      return 'Erro de comunicação'
    } else if (erro.response && erro.response.data && erro.response.data.length > 0) {
      return erro.response.data[0].mensagemUsuario
    } else if (erro.response && erro.response.data && erro.response.data.message) {
      return erro.response.data.message
    } else if (erro.mensagemUsuario) {
      return erro.mensagemUsuario
    } else if (erro === 'Não autorizado') {
        return erro
    } else {
      return 'Não foi possível processar sua requisição'
    }
}