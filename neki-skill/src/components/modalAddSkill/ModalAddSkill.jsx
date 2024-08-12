import React, { useState, useEffect } from 'react';
import styles from './ModalAddSkill.module.css';
import { criarAssociacao } from '../../service/skillUsuarios/serviceSkillUsuario';
import { api } from '../../service/api/api'; 

const ModalAddSkill = ({ show, onClose, userId }) => {
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {
        if (show) {
            const token = localStorage.getItem('token'); 
    
            api.get(`/skills/user/${userId}/skills`, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar skills:', error);
            });
        }
    }, [show, userId]);

    const handleSave = () => {
        if (selectedSkill) {
            const info = {
                skill: {
                    id: selectedSkill,
                },
                usuario: {
                    id: userId,
                },
                level: 1, 
            };

            criarAssociacao(info)
                .then(response => {
                    console.log('Skill associada com sucesso:', response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Erro ao associar skill:', error);
                });
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2>Adicionar Skill</h2>
                <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className={styles.select}
                >
                    <option value="" disabled>Selecione uma Skill</option>
                    {skills.map(skill => (
                        <option key={skill.id} value={skill.id}>
                            {skill.nome} - {skill.versao}
                        </option>
                    ))}
                </select>
                <div className={styles.buttons}>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddSkill;
