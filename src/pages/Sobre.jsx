import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// A página

const Sobre = () => {
  const token = useSelector((state) => state.token)

  const config = {
     headers: {
       'Authorization': 'Bearer ' + token
     }
   };

  // redirecionamento se não estiver logado

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("Login")
      return navigate("/login");
    }
  }, [token]);
  
  useEffect(() => {
    import('../styles/sobre.css').then(() => {
      console.log('CSS para Sobr importado com sucesso.');
    });
  }, []);

  return (
    <div>
      <a class="button-sair" href="/"><i class="fas fa-arrow-left"></i>🡸 Voltar</a>

      <section id="sobresec" className="section-sobre">
        <h1>Sobre</h1>
        <p>Este webapp de gerenciamento de estoque trata-se de um projeto realizado no âmbito de desenvolver soluções tecnológicas que sirvam as necessidades do dia a dia de microempreendedores e pequenos negócios localizados na cidade de Esperança e região.</p>
        <p>O objetivo principal do webapp é fornecer uma solução eficiente e intuitiva para o controle de estoque de estoque e administração comercial de seu usuário. Permitindo o registro de produtos, gerenciamento de entradas de vendas, geração de relatórios de vendas e o cadastro de contato dos clientes.</p>
        <p>O desenvolvimento do webapp contou com a participação dos membros do Projeto de Extensão: IDEAÇÃO. Realizado no Instituto Federal de Ciência, Educação e Tecnologia da Paraíba - Campus Esperança</p>
        
      </section>

      <hr className="section-divider" />

      <section id="funcoes" className="section-funcoes">
        <h1>Funções</h1>
        <p>O webapp é dividido em 4 páginas principais com 4 funções diferentes:</p>
        <ul>
          <li>O cadastro de vendas (Cadastrar Venda)</li>
          <li>Análise e registro de produtos armazenados no estoque (Estoque)</li>
          <li>Geração de relatórios de vendas (Relatórios)</li>
          <li>Lista de informações de contato de clientes (Clientes)</li>
        </ul>

        <hr class="section-divider" />
        <h3>&#x25CF; <a href="cadastro">Cadastrar Venda</a>:</h3>
        <p>Página responsável por permitir o usuário cadastrar as vendas, guardando informações como o nome do Cliente, produto especifico que foi vendido, categoria do produto, os preços de venda e produção e por fim a data quando a venda foi realizada. As informações são então propriamente passadas para a tabela localizada na página de relatórios.</p>
        <div class="image-container">
          <div class="image-caption">Página de cadastro de vendas</div>
          <img src="src/Imagens/Novavenda.png" alt="Cadastro de vendas" width="52%" height="50%"/>
        </div>

        <hr class="section-divider" />
        <h3>&#x25CF; <a href="vendas">Relatórios</a>:</h3>
        <p>Página responsável por armazenar todas as vendas cadastradas pelo estoque. Permitindo o usuário pesquisar as informações de vendas cadastradas atráves de um produto específico, pelo nome de algum cliente específico, ou pela quantidade geral de alguma venda (podendo assim comparar, quais e quando algum produto foi mais vendido).</p>
        <div class="image-container">
          <div class="image-caption">Página de relatórios de vendas</div>
          <img src="src/Imagens/Paginarelatorios.png" alt="Página de Relatórios" width="52%" height="50%"/>
        </div>
        
        <hr class="section-divider" />
        <h3>&#x25CF; <a href="estoque">Estoque</a>:</h3>
        <p>Página responsável por manter anotado o estoque de produtos da loja. Contendo informações individuais de cada produto como preço, categoria, quantidade e o status atual no estoque. Por fim, a página contem uma simples barra de pesquisa que permite o usuário pesquisar um produto específico pelo seu nome ou categoria.</p>
        <div class="image-container">
          <div class="image-caption">Página de produtos do estoque</div>
          <img src="src/Imagens/Paginaestoque.png" alt="Página de Estoque" width="52%" height="50%"/>
        </div>
        
        <hr class="section-divider" />
        <h3>&#x25CF; <a href="clientes">Clientes</a>:</h3>
        <p>A página de clientes como o nome indica é responsável por manter uma tabela contendo as informações de contato de clientes da loja. Permitindo o usuário rapidamente pesquisar por um cliente espéficio com base no seu nome, através da barra de pesquisa.</p>
        <div class="image-container">
          <div class="image-caption">Página de cadastro dos clientes</div>
          <img src="src/Imagens/clientes.png" title="Página de cadastro dos clientes" alt="Página dos Clientes" width="52%" height="50%"/>
        </div>
      </section>
    </div>
  );
};

export default Sobre;