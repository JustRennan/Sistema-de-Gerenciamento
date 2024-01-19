import React, { useState } from 'react';
import '../styles/login.css';
import { useDispatch } from 'react-redux';
import { definirToken } from '../redux/loginSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const logar = () => {
    setLoading(true);
    axios.post('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/auth/local', formData)
      .then((response) => {
        if (response.status === 200) {
          dispatch(definirToken(response.data.jwt));
          console.log("Login realizado com sucesso!");
          console.log("Token de Usuário: ", response.data.jwt);
          navigate("/");
        } else {
          alert("Falha de login!");
        }
      })
      .catch((error) => {
        alert("Falha de login");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    setFormData({
      identifier: '',
      password: '',
    });
  };

  return (
    <main>
      <div className="header">
        <span className="header-title">Login</span>
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="user-icon"></div>

          <label htmlFor="identifier">Email:</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            required
            style={{ width: '270px' }}
          />

          <div className="password-input-container">
            <label htmlFor="password">Senha:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{ width: '210px' }}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="toggle-password-button"
                style={{ marginLeft: '6px', width: '20%' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onClick={logar}
            className="button login-button"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;