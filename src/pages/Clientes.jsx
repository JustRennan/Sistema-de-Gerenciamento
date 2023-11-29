import React, { useState, useEffect } from 'react';
import '../styles/clientes.css';
import Header from './Header.jsx';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Table, Button, Modal, Form, Input } from 'antd';


// Botão de Voltar para Mobile

const Bvoltar = () => {
  return (
      <a className="bvoltar" href="/">
        <i className="fas fa-arrow-left"></i>🡸 Voltar
      </a>
  )
};

// Formulário de input

const InputForm = ({ onAdicionar }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onAdicionar(data);
    reset();
  };

  return (
    <div className="input-container">
      <div className="titulo-container">Clientes</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-row">
          <label htmlFor="nome">Nome:</label>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="text" {...field} placeholder="Digite o nome" />}
          />
        </div>
        <div className="input-row">
          <label htmlFor="aniversario">Aniversário:</label>
          <Controller
            name="aniversario"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="date" {...field} placeholder="Digite o aniversario" />}
          />
        </div>
        <div className="input-row">
          <label htmlFor="telefone">Telefone:</label>
          <Controller
            name="telefone"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="tel" {...field} placeholder="Digite o telefone" />}
          />
        </div>
        <div className="input-row">
          <label htmlFor="cpf">CPF:</label>
          <Controller
            name="cpf"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="text" {...field} placeholder="Digite o CPF" />}
          />
        </div>
        <button id="adicionar" className="buttonc" type="submit">
          Adicionar Cliente
        </button>
      </form>
    </div>
  );
};

// Modal para Edição de Clientes
const EditarClienteModal = ({ cliente, visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(cliente);
  }, [cliente, form]);

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
      title="Editar Cliente"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form form={form}>
        <Form.Item
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome do cliente!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="aniversario"
          label="Aniversario"
          rules={[
            { required: true, message: 'Por favor, insira o aniversario do cliente!' },
            { type: 'date', message: 'Por favor, insira um aniversario válido!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="telefone"
          label="Telefone"
          rules={[
            { required: true, message: 'Por favor, insira o telefone do cliente!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cpf"
          label="Cpf"
          rules={[{ required: true, message: 'Por favor, insira o endereço do cliente!' }]}
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

// Tabela com a lista de clientes 

const ListaClientes = ({ clientes, onEditarCliente, onExcluirCliente }) => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      render: (text) => text || '---',
    },
    {
      title: 'Aniversario',
      dataIndex: 'aniversario',
      key: 'aniversario',
      render: (text) => text || '---',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      render: (text) => text || '---',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      render: (text) => text || '---',
    },
    {
      title: 'Editar',
      key: 'editar',
      render: (text, record) => (
        <Button onClick={() => onEditarCliente(record)}>Editar</Button>
      ),
    },
    {
      title: 'Excluir',
      key: 'excluir',
      render: (text, record) => (
        <Button onClick={() => onExcluirCliente(record.key)}>Excluir</Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={clientes} />;
};

// Token

const config = {
  headers: {
    'Authorization':'Bearer 3c5c61d8cd99722d135079ced010c929de179419a2d392d1935c3ef5df88a5e54c93717e0249f2d14d2ed738cc65970fac4eaea7a371367ac64eadd4dd1e56e4ba4451007466331d575468440ea6adfbea34793409070aba581f18496272cad6ee89d6bf9f1026de715eb54ab977f9f3b5d3baad9f94331e2c4444da6a5720f1'
  }
};

////// Componente Final

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [pesquisaNome, setPesquisaNome] = useState('');
  const [clientesOriginal, setClientesOriginal] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [editarModalVisivel, setEditarModalVisivel] = useState(false);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    atualizaLista();
  }, []);

  // Atualiza a tabela caso um comando seja executado

  function atualizaLista() {
    axios.get('https://backprojeto.pablorennan.repl.co/api/clientes', config)
      .then((response) => {
        if (response.status == 200) {
          const dados = response.data.data;
          console.log(dados);
          let dadosProcessados = dados.map((cliente) => {
            return {
              key: cliente.id,
              nome: cliente.attributes.nome,
              aniversario: cliente.attributes.aniversario,
              telefone: cliente.attributes.telefone,
              cpf: cliente.attributes.cpf,
            }
          });
          setClientes(dadosProcessados);
          setClientesOriginal(dadosProcessados);
          setClientesFiltrados(dadosProcessados);
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

  const handleEditarCliente = (cliente) => {
    const index = clientes.indexOf(cliente);
    setClienteEditando(index);
    setEditarModalVisivel(true);
  };

  // Função para adicionar clientes

  const adicionarCliente = (data) => {
    if (data.nome && data.aniversario && data.telefone && data.cpf) {
      const novoCliente = {
        data: {
          nome: data.nome,
          aniversario: data.aniversario,
          telefone: data.telefone,
          cpf: data.cpf,
        },
      };

      axios.post('https://backprojeto.pablorennan.repl.co/api/clientes', novoCliente, config)
        .then((response) => {
          if (response.status === 200) {
            atualizaLista();
          } else {
            console.error('Erro de servidor:', response);
          }
        })
        .catch((error) => {
          console.error('Erro ao adicionar o cliente:', error);
        });
    }
  };

  // Função para editar os clientes

  const editarCliente = (clienteEditado) => {
    const novosClientes = [...clientes];
    novosClientes[clienteEditando] = { ...novosClientes[clienteEditando], ...clienteEditado };

    // Objeto com apenas os campos que serão editados
    const camposEditados = {};
    if (clienteEditado.nome) {
      camposEditados.nome = clienteEditado.nome;
    }
    if (clienteEditado.aniversario) {
      camposEditados.aniversario = clienteEditado.aniversario;
    }
    if (clienteEditado.telefone) {
      camposEditados.telefone = clienteEditado.telefone;
    }
    if (clienteEditado.cpf) {
      camposEditados.cpf = clienteEditado.cpf;
    }

    axios.put(`https://backprojeto.pablorennan.repl.co/api/clientes/${novosClientes[clienteEditando].key}`, { data: camposEditados }, config)
      .then((response) => {
        if (response.status === 200) {
          setClientes(novosClientes);
          setClientesOriginal(novosClientes);
          setClientesFiltrados(novosClientes);
        } else {
          console.error('Erro de servidor:', response);
        }
      })
      .catch((error) => {
        console.error('Erro ao editar o cliente:', error);
      });
  };

  // Função para excluir os clientes
  const excluirCliente = (clienteId) => {
    console.log(clienteId);

    // Fazer uma chamada à API para verificar se existem clientes relacionados a vendas
    axios.get(`https://backprojeto.pablorennan.repl.co/api/clientes/${clienteId}/?populate=vendas`, config)
      .then((response) => {
        if (response.status === 200) {
          const clienteExcluidoNome = response.data.data.attributes.nome;
          const vendasRelacionadas = response.data.data.attributes.vendas.data;
          console.log('Produtos relacionados à categoria:', vendasRelacionadas);

          if (vendasRelacionadas .length > 0) {
            //Se existe, erro
            alert('Não é possível excluir o cliente, pois existem vendas cadastradas relacionados ao cliente.');
          } else {
            // Não existem, nesse caso se pode excluir
            confirmarExclusaoCliente(clienteId, clienteExcluidoNome);
          }
        } else {
          console.error('Erro ao verificar produtos relacionados:', response);
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar produtos relacionados:', error);
      });
  };

  // Função para confirmar a exclusão do cliente 
  const confirmarExclusaoCliente = (clienteId, clienteExcluidoNome) => {
    const confirmarExclusao = window.confirm(`Tem certeza de que deseja excluir o cliente: ${clienteExcluidoNome}?`);
    if (confirmarExclusao) {
      axios.delete(`https://backprojeto.pablorennan.repl.co/api/clientes/${clienteId}`, config)
        .then((response) => {
          if (response.status === 200) {
              atualizaLista();
          } else {
            console.error('Erro na resposta da API ao excluir o cliente');
          }
        })
        .catch((error) => {
          console.error('Erro ao fazer a chamada da API para excluir o cliente:', error);
        });
    }
  };


  // Lógica de Pesquisar Clientes
  const pesquisarCliente = () => {
    const nomePesquisado = pesquisaNome.trim().toLowerCase();
    const resultadoPesquisa = clientesOriginal.filter((cliente) =>
      cliente.nome.toLowerCase().includes(nomePesquisado)
    );
    setClientesFiltrados(resultadoPesquisa);
  };

  
  return (
    <div>
      <Header />
      <Bvoltar />
      <div className="container">
        <InputForm
          nome={nome}
          aniversario={aniversario}
          telefone={telefone}
          cpf={cpf}
          onNomeChange={(e) => setNome(e.target.value)}
          onAniversarioChange={(e) => setAniversario(e.target.value)}
          onTelefoneChange={(e) => setTelefone(e.target.value)}
          onCpfChange={(e) => setCpf(e.target.value)}
          onAdicionar={adicionarCliente}
        />
        <BarraPesquisa
          pesquisaNome={pesquisaNome}
          onPesquisaNomeChange={(e) => setPesquisaNome(e.target.value)}
          onPesquisar={pesquisarCliente}
        />
        <ListaClientes
          clientes={clientesFiltrados}
          onEditarCliente={handleEditarCliente}
          onExcluirCliente={excluirCliente}
        />
        <EditarClienteModal
          cliente={clientes[clienteEditando]}
          visible={editarModalVisivel}
          onCancel={() => setEditarModalVisivel(false)}
          onSave={(clienteEditado) => {
            editarCliente(clienteEditado, clienteEditando);
            setEditarModalVisivel(false);
          }}
        />
      </div>
    </div>
  );
};

export default Clientes;