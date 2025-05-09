import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CadastroForm from './CadastroForm';
import ListaVagas from './ListaVagas';
import VagasDisponiveis from './VagasDisponiveis';
import Notificacao from './Notificacao';
import { EstacionamentoProvider } from '../context/EstacionamentoContext';
import '../App.css';

const App = () => {
  const [activePage, setActivePage] = useState('cadastro');
  const [notificacao, setNotificacao] = useState(null);

  // Navegação entre páginas
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
  };

  // Gerenciamento de notificações
  const handleNotificacao = (mensagem, tipo = 'info') => {
    setNotificacao({ mensagem, tipo });
  };

  // Limpar notificação
  const clearNotificacao = () => {
    setNotificacao(null);
  };

  // Renderizar componente com base na página ativa
  const renderContent = () => {
    switch (activePage) {
      case 'cadastro':
        return <CadastroForm onNotificacao={handleNotificacao} />;
      case 'listar':
        return <ListaVagas onNotificacao={handleNotificacao} />;
      case 'disponiveis':
        return <VagasDisponiveis />;
      default:
        return <CadastroForm onNotificacao={handleNotificacao} />;
    }
  };

  return (
    <EstacionamentoProvider>
      <div className="app">
        <Header activePage={activePage} onNavigate={handleNavigate} />
        
        <main className="container">
          {renderContent()}
        </main>
        
        <Footer />
        
        {notificacao && (
          <Notificacao 
            mensagem={notificacao.mensagem} 
            tipo={notificacao.tipo} 
            onClose={clearNotificacao} 
          />
        )}
      </div>
    </EstacionamentoProvider>
  );
};

export default App;