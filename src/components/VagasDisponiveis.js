import React from 'react';
import { useEstacionamento } from '../context/EstacionamentoContext';

const VagasDisponiveis = () => {
  const { vagasDisponiveis, totalVagas, vagas } = useEstacionamento();
  
  // Calcula estatísticas das vagas
  const vagasOcupadas = vagas.length;
  const porcentagemOcupada = ((vagasOcupadas / totalVagas) * 100).toFixed(1);
  const porcentagemDisponivel = ((vagasDisponiveis.length / totalVagas) * 100).toFixed(1);
  
  return (
    <section id="disponiveis-section">
      <h2>Vagas Disponíveis no Estacionamento</h2>
      
      <div className="stats-container" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-cards" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div 
            className="stat-card" 
            style={{ 
              flex: 1, 
              backgroundColor: '#edf2f7', 
              padding: '1rem', 
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <h3 style={{ color: '#2c5282', marginBottom: '0.5rem' }}>Total de Vagas</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalVagas}</p>
          </div>
          
          <div 
            className="stat-card" 
            style={{ 
              flex: 1, 
              backgroundColor: '#fed7d7', 
              padding: '1rem', 
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <h3 style={{ color: '#c53030', marginBottom: '0.5rem' }}>Vagas Ocupadas</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{vagasOcupadas} ({porcentagemOcupada}%)</p>
          </div>
          
          <div 
            className="stat-card" 
            style={{ 
              flex: 1, 
              backgroundColor: '#c6f6d5', 
              padding: '1rem', 
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <h3 style={{ color: '#276749', marginBottom: '0.5rem' }}>Vagas Disponíveis</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{vagasDisponiveis.length} ({porcentagemDisponivel}%)</p>
          </div>
        </div>
      </div>
      
      <h3>Lista de Vagas Disponíveis</h3>
      {vagasDisponiveis.length > 0 ? (
        <div className="vagas-grid">
          {vagasDisponiveis.map(vaga => (
            <div key={vaga} className="vaga-item">
              Vaga {vaga}
            </div>
          ))}
        </div>
      ) : (
        <p>Não há vagas disponíveis no momento.</p>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#ebf8ff', borderRadius: '8px' }}>
        <h3 style={{ color: '#2c5282' }}>Informações</h3>
        <p>O estacionamento do condomínio possui um total de {totalVagas} vagas numeradas de 1 a {totalVagas}.</p>
        <p>Para reservar uma vaga, acesse a seção "Cadastro de Reserva" e preencha os dados solicitados.</p>
      </div>
    </section>
  );
};

export default VagasDisponiveis;