import React, { useEffect } from 'react';
import HeaderHome from '../components/HeaderHome';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { definirToken } from '../redux/loginSlice';

// Botões de Redireciomaneto

const Botoes = () => {
  return (
    <div className="button-container">
      <Link className="button nova-venda" to="/cadastro">
        Vendas
      </Link>
      <Link className="button estoque" to="/estoque">
        Estoque
      </Link>
      <Link className="button relatorio" to="/vendas">
        Relatórios
      </Link>
      <Link className="button clientes" to="/clientes">
        Clientes
      </Link>
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