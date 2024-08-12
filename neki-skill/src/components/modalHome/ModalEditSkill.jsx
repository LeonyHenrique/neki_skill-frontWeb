import React, { useState } from 'react';
import styles from './ModalEditSkill.module.css'; 

const ModalEditSkill = ({ show, onClose, onSave, currentLevel }) => {
  const [newLevel, setNewLevel] = useState(currentLevel);

  const handleSave = () => {
    if (newLevel >= 1 && newLevel <= 10) {
      onSave(newLevel);
    } else {
      alert("Por favor, insira um nível entre 1 e 10.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Nível da Skill</h2>
        <label>Nível:</label>
        <input
          type="number"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          min="1"
          max="10"
        />
        <div className={styles.modalActions}>
          <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditSkill;
