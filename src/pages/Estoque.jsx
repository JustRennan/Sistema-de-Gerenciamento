import React, { useState, useEffect } from 'react';
import '../styles/estoque.css';
import Header from '../components/Header.jsx';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Space, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


// Botão de Voltar para Mobile

const Bvoltar = () => {
  return (
    <a className="bvoltar" href="/Sistema-de-Gerenciamento/#/">
      <span>&#x2190;</span> Voltar
    </a>
  );
};

// Formulário de input

const InputForm = ({ onAdicionar, config }) => {
  const { control, handleSubmit, reset } = useForm();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [opcoesCategoria, setOpcoesCategoria] = useState([]); // Keep only one declaration

  useEffect(() => {
    axios.get('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-categorias', config)
      .then((response) => {
        if (response.status === 200) {
          const dadosCategoria = response.data.data;
          console.log(dadosCategoria);
          let dadosProcessadosCategoria = dadosCategoria.map((categoria) => {
            return {
              value: categoria.id,
              label: categoria.attributes.nome,
            };
          });
          setOpcoesCategoria(dadosProcessadosCategoria);
        } else {
          console.error('Erro na resposta da API');
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada da API:', error);
      });
  }, []);

  const onSubmit = (data) => {
    onAdicionar(data);
    reset();
  };

  const abrirModalCategoria = () => {
    setModalVisivel(true);
  };

  return (
    <div className="input-container">
      <div className="titulo-container">Produtos</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-row">
          <label htmlFor="descricao">Descrição:</label>
          <Controller
            name="descricao"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="text" {...field} placeholder="Digite a descrição do produto" />
            )}
          />
        </div>
        <div className="input-row">
          <label htmlFor="categoria">Categoria:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name="categoria"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">Selecionar</option>
                  { opcoesCategoria.map( item => (
                    <option value={item.value}>{item.label}</option>
                  ) )}
                </select>
              )}
            />
            <Button
              type="text"
              onClick={abrirModalCategoria}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '45px',
                marginLeft: '10px',
              }}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>
        <div className="input-row">
          <label htmlFor="preco">Preço para o Cliente:</label>
          <Controller
            name="preco"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="text" {...field} placeholder="Digite o preço" />
            )}
          />
        </div>
        <div className="input-row">
          <label htmlFor="custo">Custo para o Vendedor:</label>
          <Controller
            name="custo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="text" {...field} placeholder="Digite o custo" />
            )}
          />
        </div>
        <div className="input-row">
          <label htmlFor="quantidadecasa">Quantidade em Casa:</label>
          <Controller
            name="quantidadecasa"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="text" {...field} placeholder="Digite a quantidade em estoque" />
            )}
          />
        </div>
        <div className="input-row">
          <label htmlFor="quantidadeloja">Quantidade em Loja:</label>
          <Controller
            name="quantidadeloja"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="text" {...field} placeholder="Digite a quantidade em loja" />
            )}
          />
        </div>

        <button id="adicionar" className="buttonc" type="submit">
          Adicionar Produto
        </button>
      </form>
      <CategoriaModal
        open={modalVisivel}
        onClose={() => setModalVisivel(false)}
        config={config}
      />
    </div>
  );
};

// Modal para Categoria

const CategoriaModal = ({ open, onClose, config, opcoesCategoria, setOpcoesCategoria }) => {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');

  useEffect(() => {
    obterCategorias();
  }, [open]);

  const obterCategorias = () => {
    // Fazer uma chamada GET à API para buscar as categorias
    axios.get('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-categorias', config)
      .then((response) => {
        if (response.status === 200) {
          const dadosCategoria = response.data.data;
          console.log(dadosCategoria);
          let dadosProcessadosCategoria = dadosCategoria.map((categoria) => {
            return {
              key: categoria.id,
              nome: categoria.attributes.nome
            }
          });
          setCategorias(dadosProcessadosCategoria);
          setOpcoesCategoria([{ value: 'Selecione a Categoria', label: 'Selecione a Categoria' }, ...dadosProcessadosCategoria]);
        } else {
          console.error('Erro na resposta da API');
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada da API:', error);
      });
  };

  const adicionarCategoria = () => {
    if (novaCategoria) {
      const novaCategoriaData = {
        data: {
          nome: novaCategoria
        },
      };

      axios.post('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-categorias', novaCategoriaData, config)
        .then((response) => {
          if (response.status === 200) {
            obterCategorias();
          } else {
            console.error('Erro na resposta da API ao adicionar a categoria');
          }
        })
        .catch((error) => {
          console.error('Erro ao fazer a chamada da API para adicionar a categoria:', error);
        });
    }
  };

  // Função para remover a categoria
  const removerCategoria = (categoria) => {
    const categoriaId = categoria.key;
    console.log(categoriaId);

    // Fazer uma chamada à API para verificar se existem produtos relacionados
    axios.get(`https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-categorias/${categoriaId}/?populate=produtos`, config)
      .then((response) => {
        if (response.status === 200) {
          const produtosRelacionados = response.data.data.attributes.produtos.data;
          console.log('Produtos relacionados à categoria:', produtosRelacionados);

          if (produtosRelacionados.length > 0) {
            //Se existe, erro
            alert('Não é possível excluir a categoria, pois existem produtos relacionados a ela.');
          } else {
            // Não existem, pode excluir
            confirmarExclusaoCategoria(categoria);
          }
        } else {
          console.error('Erro ao verificar produtos relacionados:', response);
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar produtos relacionados:', error);
      });
  };

  // Função para confirmar a exclusão da categoria 
  const confirmarExclusaoCategoria = (categoria) => {
    const confirmarExclusao = window.confirm(`Tem certeza de que deseja excluir a categoria: ${categoria.nome}?`);
    if (confirmarExclusao) {
      axios.delete(`https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-categorias/${categoria.key}`, config)
        .then((response) => {
          if (response.status === 200) {
            obterCategorias();
          } else {
            console.error('Erro na resposta da API ao excluir a categoria');
          }
        })
        .catch((error) => {
          console.error('Erro ao fazer a chamada da API para excluir a categoria:', error);
        });
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Nome da Categoria',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, categoria) => (
        <Space>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => removerCategoria(categoria)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Adicionar Categoria"
      open={open}
      onOk={() => {
        onClose(categorias);
        setCategorias([]);
      }}
      onCancel={() => {
        onClose([]);
        setCategorias([]);
      }}
    >
      <Input
        placeholder="Nova Categoria"
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
        onPressEnter={adicionarCategoria}
        addonAfter={
          <Button type="primary" icon={<PlusOutlined />} onClick={adicionarCategoria}>
            Adicionar
          </Button>
        }
      />
      <Table dataSource={categorias} columns={columns} />
    </Modal>
  );
};

// Modal de Edição de Produtos

const EditarProdutoModal = ({ produto, open, onCancel, onSave, config }) => {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [opcoesCategoria, setOpcoesCategoria] = useState([]);

  useEffect(() => {
    axios.get('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-categorias', config)
      .then((response) => {
        if (response.status === 200) {
          const dadosCategoria = response.data.data;
          console.log(dadosCategoria);
          let dadosProcessadosCategoria = dadosCategoria.map((categoria) => {
            return {
              value: categoria.id,
              label: categoria.attributes.nome,
            };
          });
          setOpcoesCategoria(dadosProcessadosCategoria);
        } else {
          console.error('Erro na resposta da API');
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada da API:', error);
      });
  }, []);

  useEffect(() => {
    form.setFieldsValue(produto);
  }, [produto, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
    } catch (error) {
      console.error('Erro ao validar o formulário:', error);
    }
  };

  return (
    <Modal
      title="Editar Produto"
      open={open}
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form form={form}>
        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[{ required: true, message: 'Por favor, insira a descrição do produto!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="categoria"
          label="Categoria"
          rules={[{ required: false, message: 'Por favor, insira a categoria do produto!' }]
        }
        >
          <Select
            defaultValue={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            { opcoesCategoria.map( item => (
              <option value={item.value}>{item.label}</option>
            ) )}
          </Select>
        </Form.Item>
        <Form.Item
          name="preco"
          label="Preço"
          rules={[{ required: true, message: 'Por favor, insira o preço do produto!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="custo"
          label="Custo"
          rules={[{ required: true, message: 'Por favor, insira o custo do produto!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantidadecasa"
          label="Em Estoque"
          rules={[{ required: true, message: 'Por favor, insira a quantidade do produto no estoque!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantidadeloja"
          label="Em Casa"
          rules={[{ required: true, message: 'Por favor, insira a quantidade do produto em casa!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Barra de pesquisa por nome

const BarraPesquisa = ({ pesquisaNome, onPesquisaNomeChange, onPesquisar }) => {
  return (
    <div className="barra-pesquisa">
      <span>Pesquisar por nome:</span>
      <input
        type="text"
        id="pesquisar"
        placeholder="Digite o nome"
        value={pesquisaNome}
        onChange={onPesquisaNomeChange}
        onKeyDown={(e) => e.key === 'Enter' && onPesquisar()}
      />
    </div>
  );
};

// Tabela com a lista de produtos 

const ListaProdutos = ({ produtos, onEditarProduto, onExcluirProduto }) => {
  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      render: (text) => text || '---',
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      render: (text) => text || '---',
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (text) => text || '---',
    },
    {
      title: 'Custo',
      dataIndex: 'custo',
      key: 'custo',
      render: (text) => text || '---',
    },
    {
      title: 'Estoque',
      dataIndex: 'quantidadecasa',
      key: 'quantidadecasa',
      render: (text) => text || '---',
    },
    {
      title: 'Em Loja',
      dataIndex: 'quantidadeloja',
      key: 'quantidadeloja',
      render: (text) => text || '---',
    },
    {
      title: 'Editar',
      key: 'editar',
      render: (text, record) => (
        <Button onClick={() => onEditarProduto(record)}>Editar</Button>
      ),
    },
    {
      title: 'Excluir',
      key: 'excluir',
      render: (text, record) => (
        <Button onClick={() => onExcluirProduto(record.key)}>Excluir</Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={produtos} />;
};

////// Componente Final

const Estoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pesquisaNome, setPesquisaNome] = useState('');
  const [produtosOriginal, setProdutosOriginal] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [editarModalVisivel, setEditarModalVisivel] = useState(false);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  
  const token = useSelector((state) => state.token)

  const config = {
     headers: {
       'Authorization': 'Bearer ' + token
     }
   };  

  useEffect(() => {    
    atualizaLista();
  }, []);

  // redirecionamento se não estiver logado

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("Login")
      return navigate("/login");
    }
  }, [token]);

  ////
  
  useEffect(() => {
    atualizaLista();
  }, []);

  // Atualiza a tabela caso um comando seja executado

  function atualizaLista() {
    axios.get('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-produtos?populate=*', config)
      .then((response) => {
        if (response.status == 200) {
          const dados = response.data.data;
          console.log(dados);
          let dadosProcessados = dados.map((produto) => {
            return {
              key: produto.id,
              descricao: produto.attributes.descricao,
              categoria: produto.attributes.categoria.data.attributes.nome,
              quantidadecasa: produto.attributes.quantidadecasa,
              quantidadeloja: produto.attributes.quantidadeloja,
              custo: produto.attributes.custo.toFixed(2),
              preco: produto.attributes.preco.toFixed(2),
            }
          });
          setProdutos(dadosProcessados);
          setProdutosOriginal(dadosProcessados);
          setProdutosFiltrados(dadosProcessados);
        } else {
          alert("Houve um erro na conexão com o servidor!")
        }
      })
      .catch((error) => {
        console.log(error)
        alert("Houve um erro na conexão com o servidor!")
      });
  }

  // Faz o modal de edição funcionar corretamente

  const handleEditarProduto = (produto) => {
    const index = produtos.indexOf(produto);
    setProdutoEditando(index);
    setEditarModalVisivel(true);
  };

  // Função para adicionar produto

  const adicionarProduto = (data) => {
    if (data.descricao && data.quantidadecasa && data.quantidadeloja && data.custo && data.preco) {
      const novoProduto = {
        data: {
          descricao: data.descricao,
          categoria: data.categoria,
          quantidadecasa: data.quantidadecasa,
          quantidadeloja: data.quantidadeloja,
          custo: data.custo,
          preco: data.preco,
        },
      };

      axios.post('https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-produtos', novoProduto, config)
        .then((response) => {
          if (response.status === 200) {
            atualizaLista();
          } else {
            console.error('Erro de servidor:', response);
          }
        })
        .catch((error) => {
          console.error('Erro ao adicionar o produto:', error);
        });
    }
  };

  // Função para editar os produtos

  const editarProduto = (produtoEditado) => {
    const novosProdutos = [...produtos];
    novosProdutos[produtoEditando] = { ...novosProdutos[produtoEditando], ...produtoEditado };

    // Objeto com apenas os campos que serão editados
    const camposEditados = {};
    if (produtoEditado.descricao) {
      camposEditados.descricao = produtoEditado.descricao;
    }
    if (produtoEditado.categoria && typeof produtoEditado.categoria !== 'string') {
      camposEditados.categoria = produtoEditado.categoria;
    }
    if (produtoEditado.quantidadecasa) {
      camposEditados.quantidadecasa = produtoEditado.quantidadecasa;
    }
    if (produtoEditado.quantidadeloja) {
      camposEditados.quantidadeloja = produtoEditado.quantidadeloja;
    }
    if (produtoEditado.preco) {
      camposEditados.preco = produtoEditado.preco;
    }
    if (produtoEditado.custo) {
      camposEditados.custo = produtoEditado.custo;
    }

    axios.put(`https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-produtos/${novosProdutos[produtoEditando].key}`, { data: camposEditados }, config)
      .then((response) => {
        if (response.status === 200) {
          setProdutos(novosProdutos);
          setProdutosOriginal(novosProdutos);
          setProdutosFiltrados(novosProdutos);
          atualizaLista();
        } else {
          console.error('Erro de servidor:', response);
        }
      })
      .catch((error) => {
        console.error('Erro ao editar o produto:', error);
      });
  };

  // Função para excluir os Produtos
  const excluirProduto = (produtoId) => {
    console.log(produtoId);

    // Fazer uma chamada à API para verificar se existem item vendas relacionados ao produto
    axios.get(`https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-produtos/${produtoId}/?populate=*`, config)
      .then((response) => {
        if (response.status === 200) {
          const produtoExcluidoNome = response.data.data.attributes.descricao;
          const vendasRelacionadas = response.data.data.attributes.item_vendas.data;
          console.log('Produtos relacionados à categoria:', vendasRelacionadas);

          if (vendasRelacionadas .length > 0) {
            // Se existe, impede o processo
            alert('Não é possível excluir o produto, pois existem vendas cadastradas relacionadas ao produto.');
          } else {
            // Não existem, nesse caso se pode excluir
            confirmarExclusaoProduto(produtoId, produtoExcluidoNome);
          }
        } else {
          console.error('Erro ao verificar as vendas relacionadas:', response);
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar as vendas relacionadas:', error);
      });
  };

  // Função para confirmar a exclusão do produto 
  const confirmarExclusaoProduto = (produtoId, produtoExcluidoNome) => {
    const confirmarExclusao = window.confirm(`Tem certeza de que deseja excluir o produto: ${produtoExcluidoNome}?`);
    if (confirmarExclusao) {
      axios.delete(`https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/decor-produtos/${produtoId}`, config)
        .then((response) => {
          if (response.status === 200) {
              atualizaLista();
          } else {
            console.error('Erro na resposta da API ao excluir o produto');
          }
        })
        .catch((error) => {
          console.error('Erro ao fazer a chamada da API para excluir o produto:', error);
        });
    }
  };

  // Lógica de Pesquisar Produtos
  const pesquisarProduto = () => {
    const nomePesquisado = pesquisaNome.trim().toLowerCase();
    const resultadoPesquisa = produtosOriginal.filter((produto) =>
      produto.descricao.toLowerCase().includes(nomePesquisado)
    );
    setProdutosFiltrados(resultadoPesquisa);
  };

  return (
    <div>
      <Header />
      <Bvoltar />
      <div className="container">
        <InputForm
          nome={nome}
          email={email}
          telefone={telefone}
          endereco={endereco}
          onNomeChange={(e) => setNome(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onTelefoneChange={(e) => setTelefone(e.target.value)}
          onEnderecoChange={(e) => setEndereco(e.target.value)}
          onAdicionar={adicionarProduto}
          config={config}
        />
        <BarraPesquisa
          pesquisaNome={pesquisaNome}
          onPesquisaNomeChange={(e) => setPesquisaNome(e.target.value)}
          onPesquisar={pesquisarProduto}
        />
        <ListaProdutos
          produtos={produtosFiltrados}
          onEditarProduto={handleEditarProduto}
          onExcluirProduto={excluirProduto}
        />
        <EditarProdutoModal
          produto={produtos[produtoEditando]}
          open={editarModalVisivel}
          onCancel={() => setEditarModalVisivel(false)}
          config={config}
          onSave={(produtoEditado) => {
            editarProduto(produtoEditado, produtoEditando);
            setEditarModalVisivel(false);
          }}
        />
      </div>
    </div>
  );
};

export default Estoque;