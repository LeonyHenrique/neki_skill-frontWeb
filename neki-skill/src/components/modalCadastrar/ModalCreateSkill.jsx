import React, { useState } from 'react';
import styles from './ModalCreateSkill.module.css';
import { api } from '../../service/api/api';

const ModalCreateSkill = ({ show, onClose, userId }) => {
  const [nome, setNome] = useState('');
  const [versao, setVersao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = () => {
    const newSkill = {
      nome,
      descricao,
      imageUrl
    };

    console.log("Payload enviado:", newSkill);

    api.post(`/skills/cadastrar?usuarioId=${userId}`, newSkill)
      .then(response => {
        console.log('Skill cadastrada com sucesso:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Erro ao cadastrar skill:', error);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalCreateSkill_modalBackdrop}>
      <div className={styles.modalCreateSkill_modalContent}>
        <h2>Cadastrar Skill</h2>
        <input
          type="text"
          placeholder="Nome da Skill"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.modalCreateSkill_inputField}
        />
            <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className={styles.modalCreateSkill_inputField}
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.modalCreateSkill_inputField}
        />
        <div className={styles.modalCreateSkill_buttons}>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateSkill;
