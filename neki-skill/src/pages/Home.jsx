import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuarioPorLogin } from "../service/usuario/userService";
import { listarTodasAssociacoes, atualizarAssociacao, removerAssociacao } from "../service/skillUsuarios/serviceSkillUsuario";
import ModalAddSkill from "../components/modalAddSkill/ModalAddSkill";
import ModalCreateSkill from "../components/modalCadastrar/ModalCreateSkill"; 
import ModalEditSkill from "../components/modalHome/ModalEditSkill";
import ModalDeleteSkill from "../components/modalDelete/ModalDeleteSkill";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Home.module.css";

const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [associacoes, setAssociacoes] = useState([]);
  const [showModalAddSkill, setShowModalAddSkill] = useState(false);
  const [showModalCreateSkill, setShowModalCreateSkill] = useState(false);
  const [editSkillData, setEditSkillData] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteSkillId, setDeleteSkillId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        const login = localStorage.getItem("login") || sessionStorage.getItem("login");
        if (!login) {
            navigate("/");
            return;
        }

        const userResponse = await buscarUsuarioPorLogin(login);
        setUsuario(userResponse.data);

        listarTodasAssociacoes(userResponse.data.id)
            .then((res) => setAssociacoes(res.data))
            .catch((error) => console.log(error));
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    sessionStorage.removeItem("login");
    navigate("/");
  };

  const handleAddSkillClick = () => {
    setShowModalAddSkill(true);
  };

  const handleCreateSkillClick = () => {
    setShowModalCreateSkill(true);
  };

  const handleCloseModalAddSkill = () => {
    setShowModalAddSkill(false);
  };

  const handleCloseModalCreateSkill = () => {
    setShowModalCreateSkill(false);
  };

  const handleEditSkill = (associacao) => {
    setEditSkillData(associacao);
    setShowEditModal(true);
  };

  const handleSaveEditSkill = (newLevel) => {
    atualizarAssociacao(editSkillData.id, { ...editSkillData, level: newLevel })
      .then(response => {
        toast.success('Skill atualizada com sucesso!');
        setAssociacoes(prevAssociacoes =>
          prevAssociacoes.map(skill => 
            skill.id === editSkillData.id ? { ...skill, level: newLevel } : skill
          )
        );
        setShowEditModal(false);
      })
      .catch(error => toast.error('Erro ao atualizar skill.'));
  };

  const handleDeleteSkillClick = (id) => {
    setDeleteSkillId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteSkill = () => {
    removerAssociacao(deleteSkillId)
      .then(response => {
        toast.success('Skill excluída com sucesso!');
        setAssociacoes(prevAssociacoes => 
          prevAssociacoes.filter(skill => skill.id !== deleteSkillId)
        );
        setShowDeleteModal(false);
      })
      .catch(error => toast.error('Erro ao excluir skill.'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Bem-vindo, {usuario?.login}!</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div className={styles.skillsList}>
        {associacoes.map(associacao => (
          <div key={associacao.id} className={styles.skillCard}>
            <img src={associacao.skill.imageUrl} alt={associacao.skill.nome} className={styles.skillImage} />
            <div className={styles.skillDetails}>
              <h3>{associacao.skill.nome}</h3>
              <p>{associacao.skill.descricao}</p>
              <p>Versão: {associacao.skill.versao}</p>
              <p>Nível: {associacao.level}</p>
              <button onClick={() => handleEditSkill(associacao)} className={styles.editButton}>Editar</button>
              <button onClick={() => handleDeleteSkillClick(associacao.id)} className={styles.deleteButton}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddSkillClick} className={styles.addSkillButton}>
        Adicionar Skill
      </button>
      <button onClick={handleCreateSkillClick} className={styles.createSkillButton}>
        Cadastrar Skill
      </button>
      <ModalAddSkill 
        show={showModalAddSkill} 
        onClose={handleCloseModalAddSkill} 
        userId={usuario?.id} 
      />
      <ModalCreateSkill 
        show={showModalCreateSkill} 
        onClose={handleCloseModalCreateSkill} 
        userId={usuario?.id} 
      />
      <ModalEditSkill 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        onSave={handleSaveEditSkill} 
        currentLevel={editSkillData?.level} 
      />
      <ModalDeleteSkill 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onConfirm={handleConfirmDeleteSkill} 
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
