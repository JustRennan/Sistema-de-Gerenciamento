import React, { useEffect } from 'react';
import HeaderHome from '../components/HeaderHome';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { definirToken } from '../redux/loginSlice';

// Botões de Redireciomaneto

const Botoes = () => {
  return (
    <div className="button-container">
      <a className="button nova-venda" href="cadastro">Cadastrar Venda</a>
      <a className="button estoque" href="estoque">Estoque</a>
      <a className="button relatorio" href="vendas">Relatórios</a>
      <a className="button clientes" href="clientes">Clientes</a>
    </div>
  );
};

// Componente principal que será exportado por defaut

const Home = ({ history }) => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("Login")
      return navigate("/login");
    }
  }, [token]);
  
  return (
    <main>
      <HeaderHome />
      <Botoes />
    </main>
  );
};

export default Home;