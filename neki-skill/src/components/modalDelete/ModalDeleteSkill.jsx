import React from 'react';
import styles from './ModalDeleteSkill.module.css';

const ModalDeleteSkill = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que quer excluir a skill?</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmButton}>Excluir</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteSkill;
