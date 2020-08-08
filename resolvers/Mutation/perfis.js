const {perfis,proximoId} = require('../../data/db');

function indicePerfil(filtro){
  if(!filtro) return -1
  const {id,nome} = filtro;
  if(id){
    return perfis.findIndex(perfil=>perfil.id===id)
  }else if(nome){
    return perfis.findIndex(perfil=>perfil.nome===nome)
  }
  return -1;
}

module.exports = {
  //...args nome,email,idade
  novoPerfil(_,{dados}){
    const perfilExistente = perfis.some(perfil=>perfil.nome===dados.nome)
    if(perfilExistente){
      throw new Error('Perfil ja cadastrado')
    }
    const novo ={
      id:proximoId(),
      ...dados,
    }
    perfis.push(novo)
    return novo;
  },
  excluirPerfil(_,{filtro}){
    const index = indicePerfil(filtro)
    if(index<0) return null
    const excluidos = perfis.splice(index,1)
    return excluidos ? excluidos[0] : null;
  },
  alterarUsuario(_,{filtro,dados}){
    const index = indicePerfil(filtro)
    if(index<0) return null
    const perfil = {
      ...perfis[index],
      ...dados
    }
    //primeiro parametro indice para remover o elemento, segundo quantos objeco tereiro atualizano
    perfil.splice(index,1,perfil)
    return perfil
  }
}