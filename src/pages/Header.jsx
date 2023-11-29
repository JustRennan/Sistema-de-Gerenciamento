// Header.jsx

import React, { useEffect, useState } from 'react';

// Header

const Header = () => {
  return (
    <header className={`header`}>
      <a className="header-toggle" href="/">🡸 Voltar</a>
      <div className="header-title">Sistema de Gerenciamento</div>
      <a className="header-button-sobre" href="sobre">Sobre</a>
    </header>
  );
};

export default Header;