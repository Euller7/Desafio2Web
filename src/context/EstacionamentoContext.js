import React, { createContext, useState, useEffect, useContext } from 'react';

// Criando o contexto
const EstacionamentoContext = createContext();

// Provider do contexto
export const EstacionamentoProvider = ({ children }) => {
  const [vagas, setVagas] = useState([]);
  const [vagasDisponiveis, setVagasDisponiveis] = useState([]);
  const [totalVagas] = useState(50); // Total de vagas fixo no estacionamento
  
  // Carrega dados iniciais quando o componente é montado
  useEffect(() => {
    carregarDados();
  }, []);
  
  // Atualiza lista de vagas disponíveis quando 'vagas' muda
  useEffect(() => {
    atualizarVagasDisponiveis();
  }, [vagas]);
  
  // Carrega os dados do localStorage ou configura dados de demonstração
  const carregarDados = () => {
    const vagasSalvas = localStorage.getItem('estacionamento_vagas');
    
    if (vagasSalvas) {
      setVagas(JSON.parse(vagasSalvas));
    } else {
      // Dados iniciais para demonstração
      const dadosIniciais = [
        {
          id: 1,
          placa: 'ABC-1234',
          proprietario: 'João Silva',
          apartamento: 101,
          bloco: 'A',
          modelo: 'Toyota Corolla',
          cor: 'Prata',
          vaga: 15
        },
        {
          id: 2,
          placa: 'DEF-5678',
          proprietario: 'Maria Oliveira',
          apartamento: 302,
          bloco: 'B',
          modelo: 'Honda Civic',
          cor: 'Preto',
          vaga: 23
        },
        {
          id: 3,
          placa: 'GHI-9012',
          proprietario: 'Pedro Santos',
          apartamento: 204,
          bloco: 'C',
          modelo: 'Volkswagen Gol',
          cor: 'Branco',
          vaga: 7
        }
      ];
      setVagas(dadosIniciais);
      salvarDados(dadosIniciais);
    }
  };
  
  // Salva os dados no localStorage
  const salvarDados = (dadosAtualizados) => {
    localStorage.setItem('estacionamento_vagas', JSON.stringify(dadosAtualizados || vagas));
  };

  // Adiciona uma nova reserva de vaga
  const adicionarVaga = (dadosVaga) => {
    // Gerar um ID único como número
    const id = Number(Date.now());
    
    // Criar o objeto da nova vaga
    const novaVaga = {
      id,
      placa: dadosVaga.placa,
      proprietario: dadosVaga.proprietario,
      apartamento: parseInt(dadosVaga.apartamento),
      bloco: dadosVaga.bloco,
      modelo: dadosVaga.modelo,
      cor: dadosVaga.cor,
      vaga: parseInt(dadosVaga.vaga)
    };
    
    // Adicionar ao array de vagas
    const vagasAtualizadas = [...vagas, novaVaga];
    setVagas(vagasAtualizadas);
    
    // Salvar os dados atualizados
    salvarDados(vagasAtualizadas);
    
    return novaVaga;
  };

  // Remove uma vaga pelo ID
  const removerVaga = (id) => {
    // Converter o id para número, independentemente do formato
    const idNumerico = Number(id);
    
    const vagasFiltradas = vagas.filter(vaga => vaga.id !== idNumerico);
    
    if (vagasFiltradas.length !== vagas.length) {
      setVagas(vagasFiltradas);
      salvarDados(vagasFiltradas);
      return true;
    }
    
    return false;
  };

  // Busca vagas por termo (placa ou proprietário)
  const buscarVagas = (termo) => {
    if (!termo) return vagas;
    
    termo = termo.toLowerCase();
    return vagas.filter(vaga => 
      vaga.placa.toLowerCase().includes(termo) || 
      vaga.proprietario.toLowerCase().includes(termo)
    );
  };

  // Obtém os números das vagas ocupadas
  const obterVagasOcupadas = () => {
    return vagas.map(vaga => vaga.vaga);
  };

  // Atualiza a lista de vagas disponíveis
  const atualizarVagasDisponiveis = () => {
    const vagasOcupadas = obterVagasOcupadas();
    const novasVagasDisponiveis = [];
    
    for (let i = 1; i <= totalVagas; i++) {
      if (!vagasOcupadas.includes(i)) {
        novasVagasDisponiveis.push(i);
      }
    }
    
    setVagasDisponiveis(novasVagasDisponiveis);
  };

  // Verifica se uma vaga específica está disponível
  const verificarVagaDisponivel = (numeroVaga) => {
    return !vagas.some(vaga => vaga.vaga === parseInt(numeroVaga));
  };
  
  // Valor a ser disponibilizado no contexto
  const value = {
    vagas,
    vagasDisponiveis,
    obterVagasOcupadas,
    adicionarVaga,
    removerVaga,
    buscarVagas,
    verificarVagaDisponivel,
    totalVagas
  };

  return (
    <EstacionamentoContext.Provider value={value}>
      {children}
    </EstacionamentoContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useEstacionamento = () => {
  const context = useContext(EstacionamentoContext);
  
  if (!context) {
    throw new Error('useEstacionamento deve ser usado dentro de um EstacionamentoProvider');
  }
  
  return context;
};