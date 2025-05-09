import React, { useState } from 'react';
import { useEstacionamento } from '../context/EstacionamentoContext';
import Modal from './Modal';

const ListaVagas = ({ onNotificacao }) => {
  const { vagas, removerVaga, buscarVagas } = useEstacionamento();
  const [termoBusca, setTermoBusca] = useState('');
  const [vagasFiltradas, setVagasFiltradas] = useState(vagas);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, vagaId: null });

  // Atualizar lista filtrada quando termo de busca mudar
  React.useEffect(() => {
    setVagasFiltradas(buscarVagas(termoBusca));
  }, [termoBusca, vagas, buscarVagas]);

  // Manipula o input de busca
  const handleBuscaChange = (e) => {
    setTermoBusca(e.target.value);
  };

  // Manipula a exclusão de uma vaga
  const handleExcluir = (vagaId) => {
    setModalInfo({
      isOpen: true,
      vagaId: vagaId,
      message: "Tem certeza que deseja excluir esta reserva de vaga?"
    });
  };

  // Confirma a exclusão após confirmação do modal
  const confirmarExclusao = () => {
    const sucesso = removerVaga(modalInfo.vagaId);
    
    if (sucesso) {
      onNotificacao('Reserva excluída com sucesso!', 'success');
    } else {
      onNotificacao('Erro ao excluir a reserva. Tente novamente.', 'error');
    }
  };

  // Fecha o modal
  const fecharModal = () => {
    setModalInfo({ isOpen: false, vagaId: null });
  };

  return (
    <section id="listar-section">
      <h2>Vagas Ocupadas</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por placa ou proprietário"
          className="search-input"
          value={termoBusca}
          onChange={handleBuscaChange}
        />
      </div>

      {vagasFiltradas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Vaga</th>
              <th>Placa</th>
              <th>Proprietário</th>
              <th>Apartamento</th>
              <th>Bloco</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagasFiltradas.map((vaga) => (
              <tr key={vaga.id}>
                <td>{vaga.vaga}</td>
                <td>{vaga.placa}</td>
                <td>{vaga.proprietario}</td>
                <td>{vaga.apartamento}</td>
                <td>{vaga.bloco}</td>
                <td>{vaga.modelo}</td>
                <td>{vaga.cor}</td>
                <td className="table-actions">
                  <button
                    className="btn-danger"
                    onClick={() => handleExcluir(vaga.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma vaga ocupada encontrada{termoBusca ? ' para a busca realizada' : ''}.</p>
      )}

      <Modal
        isOpen={modalInfo.isOpen}
        onClose={fecharModal}
        onConfirm={confirmarExclusao}
        message={modalInfo.message}
      />
    </section>
  );
};

export default ListaVagas;