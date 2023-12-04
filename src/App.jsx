import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import dadosStore from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Cadastro from './pages/Cadastros';
import Clientes from './pages/Clientes';
import Estoque from './pages/Estoque';
import Relatorios from './pages/Relatorios';
import Login from './pages/Login';

// App

export default function App() {
  let {store, persistor} = dadosStore();

  return ( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sobre' element={<Sobre />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/vendas' element={<Relatorios />} />
            <Route path='/estoque' element={<Estoque />} /> 
            <Route path='/clientes' element={<Clientes />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}