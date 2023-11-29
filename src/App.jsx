import React, { useState } from 'react'; // Importação do... react
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importação do React Router
import './App.css' // Importação do arquivo css padrão da página inicial

// Importação dos componentes de cada página, atualmente incompleto. Home é página inicial carregada por default
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Cadastro from './pages/Cadastros';
import Clientes from './pages/Clientes';
import Estoque from './pages/Estoque';
import Relatorios from './pages/Relatorios';
import Teste from './pages/Teste';

// App

export default function App() {
  // Route path se refere ao link da página especifica, "/" sendo a página inicial
  // Ja element se refere ao conteudo da página
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/vendas' element={<Relatorios />} />
        <Route path='/estoque' element={<Estoque />} /> 
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/teste' element={<Teste />} />
      </Routes>
    </BrowserRouter>
  );
}