// Header.jsx

import React, { useEffect, useState } from 'react';

// Header

const HeaderHome = () => {
  return (
    <header className={`header`}>
      <div className="header-title">Sistema de Gerenciamento</div>
      <a className="header-button-sobre" href="sobre">Sobre</a>
    </header>
  );
};

export default HeaderHome;