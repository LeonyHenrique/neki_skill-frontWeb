import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../service/usuario/userService';
import eyeOpenIcon from '../../../neki-skill/src/assets/img/eye-open.png';
import eyeClosedIcon from '../assets/img/eye-closed.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLogin = localStorage.getItem('login');
    const savedSenha = localStorage.getItem('senha');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setRememberMe(true);
      if (savedLogin) setLogin(savedLogin);
      if (savedSenha) setSenha(savedSenha);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginApi({ login, senha });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

      if (rememberMe) {
        localStorage.setItem('login', login);
        localStorage.setItem('senha', senha);
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('login');
        localStorage.removeItem('senha');
        localStorage.removeItem('rememberMe');
      }

      toast.success('Login realizado com sucesso!', {
        onClose: () => navigate('/home') 
      });
    } catch (error) {
      console.error('Erro ao tentar login:', error);
      toast.error('Login ou senha inválidos!');
    }
  };

  const handleRememberMeChange = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);

    if (newRememberMe) {
      localStorage.setItem('login', login);
      localStorage.setItem('senha', senha);
      localStorage.setItem('rememberMe', true);
    } else {
      localStorage.removeItem('login');
      localStorage.removeItem('senha');
      localStorage.removeItem('rememberMe');
      setLogin('');
      setSenha('');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
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
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="rememberMe">Lembrar-me</label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
        <div className={styles.registerLink}>
          Não tem conta?<a href="/registro"> Cadastrar-se</a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
