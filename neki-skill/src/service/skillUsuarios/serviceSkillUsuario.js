import { api } from "../api/api"

export const listarTodasAssociacoes = async (userId) => {
    const url = `/api/skillusuario/user/${userId}`;
    const response = await api.get(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response;
};


export const criarAssociacao = async (info) => {
    const url = "/api/skillusuario";
    const response = await api.post(url, info, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response;
};

export const atualizarAssociacao = async (id, info) => {
    const url = `/api/skillusuario/${id}`;
    const response = await api.put(url, info, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response;
};

export const removerAssociacao = async (id) => {
    const url = `/api/skillusuario/${id}`;
    const response = await api.delete(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response;
};