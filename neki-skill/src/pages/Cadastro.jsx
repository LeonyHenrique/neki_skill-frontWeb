import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastroApi } from '../service/usuario/userService';
import eyeOpenIcon from '../../../neki-skill/src/assets/img/eye-open.png';
import eyeClosedIcon from '../assets/img/eye-closed.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Cadastro.module.css';

const Cadastro = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error('As senhas não coincidem!');
      return;
    }

    try {
      await cadastroApi({ login, senha });

      toast.success('Cadastro realizado com sucesso! Faça login para continuar.', {
        onClose: () => navigate('/login') 
      });
    } catch (error) {
      toast.error('Erro ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleCadastro} className={styles.form}>
        <h2 className={styles.title}>Cadastro</h2>
        <div className={styles.field}>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="senha">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showPassword}
          >
            <img 
              src={showPassword ? eyeClosedIcon : eyeOpenIcon} 
              alt="Mostrar/Esconder Senha" 
              className={styles.passwordIcon} 
            />
          </button>
        </div>
        <div className={styles.field}>
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.showPassword}
          >
            <img 
              src={showConfirmPassword ? eyeClosedIcon : eyeOpenIcon} 
              alt="Mostrar/Esconder Senha" 
              className={styles.passwordIcon} 
            />
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>
          Cadastrar
        </button>
        <div className={styles.registerLink}>
         Já tem uma conta?  <a href="/login">Faça login</a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Cadastro;
