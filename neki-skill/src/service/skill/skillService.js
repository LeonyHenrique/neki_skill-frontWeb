import { api } from "../api/api";



export const cadastrarSkill = async (info, file) => {
  const url = "/skills/cadastrar";
  const formData = new FormData();
  formData.append('skill', new Blob([JSON.stringify(info)], { type: 'application/json' }));
  formData.append("file", file);
  const response = api.post(url, formData, {
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
      }
  });
  return response;
};

