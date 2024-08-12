import { api } from "../api/api";

export const loginApi = async (info) => {
  console.log('Dados de login:', info); 
  const url = "/auth/login";
  try {
    const response = await api.post(url, info);
    console.log('Resposta da API:', response.data); 
    return response;
  } catch (error) {
    console.error('Erro ao fazer login:', error); 
    throw error;
  }
};


export const cadastroApi = async (info) => {
  const url = "/auth/register";
  const response = await api.post(url, info);
  return response;
};


export const buscarUsuarioPorLogin = async (login) => {
  const url = `/api/usuario/usuarioAchado/${login}`;
  console.log('Requisição para buscar o usuário:', url);
  try {
    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Resposta ao buscar o usuário:', response.data);
    return response;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};


