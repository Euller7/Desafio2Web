import React, { useState } from 'react';
import { useEstacionamento } from '../context/EstacionamentoContext';
import { validarDadosCadastro } from '../utils/validacao';

const CadastroForm = ({ onNotificacao }) => {
  const { vagasDisponiveis, adicionarVaga } = useEstacionamento();
  const [formData, setFormData] = useState({
    placa: '',
    proprietario: '',
    apartamento: '',
    bloco: '',
    modelo: '',
    cor: '',
    vaga: ''
  });
  
  // Manipula mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar os dados do formulário
    const validacao = validarDadosCadastro(formData);
    
    if (validacao.erro) {
      onNotificacao(validacao.mensagem, validacao.tipo);
      return;
    }
    
    try {
      // Adicionar a vaga
      const vagaAdicionada = adicionarVaga(formData);
      
      // Exibir notificação de sucesso
      onNotificacao(`Reserva para a vaga ${formData.vaga} cadastrada com sucesso!`, 'success');
      
      // Log das informações conforme requisito
      console.log('Vaga cadastrada:', vagaAdicionada);
      
      // Resetar o formulário
      setFormData({
        placa: '',
        proprietario: '',
        apartamento: '',
        bloco: '',
        modelo: '',
        cor: '',
        vaga: ''
      });
    } catch (error) {
      onNotificacao('Erro ao cadastrar reserva. Por favor, tente novamente.', 'error');
      console.error('Erro ao cadastrar vaga:', error);
    }
  };
  
  return (
    <section id="cadastro-section">
      <h2>Cadastro de Reserva de Vaga</h2>
      <form id="form-cadastro" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="placa">Placa do Veículo:</label>
          <input 
            type="text" 
            id="placa" 
            name="placa" 
            value={formData.placa}
            onChange={handleChange}
            required 
            placeholder="AAA-0000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="proprietario">Nome do Proprietário:</label>
          <input 
            type="text" 
            id="proprietario" 
            name="proprietario" 
            value={formData.proprietario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="apartamento">Número do Apartamento:</label>
            <input 
              type="number" 
              id="apartamento" 
              name="apartamento" 
              value={formData.apartamento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bloco">Bloco do Apartamento:</label>
            <input 
              type="text" 
              id="bloco" 
              name="bloco" 
              value={formData.bloco}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="modelo">Modelo do Veículo:</label>
            <input 
              type="text" 
              id="modelo" 
              name="modelo" 
              value={formData.modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cor">Cor do Veículo:</label>
            <input 
              type="text" 
              id="cor" 
              name="cor" 
              value={formData.cor}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="vaga">Número da Vaga:</label>
          <select 
            id="vaga" 
            name="vaga" 
            value={formData.vaga}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma vaga disponível</option>
            {vagasDisponiveis.map(vaga => (
              <option key={vaga} value={vaga}>
                Vaga {vaga}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">Salvar Reserva</button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => setFormData({
              placa: '',
              proprietario: '',
              apartamento: '',
              bloco: '',
              modelo: '',
              cor: '',
              vaga: ''
            })}
          >
            Limpar
          </button>
        </div>
      </form>
    </section>
  );
};

export default CadastroForm;