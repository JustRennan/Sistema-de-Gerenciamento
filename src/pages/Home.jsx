import React, { useState } from 'react';
import HeaderHome from './HeaderHome';

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

const Home = () => {
  return (
    <main>
      <HeaderHome />
      <Botoes />
    </main>
  );
};

export default Home;