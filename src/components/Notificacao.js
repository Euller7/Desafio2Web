import React, { useEffect } from 'react';

const Notificacao = ({ mensagem, tipo, onClose }) => {
  useEffect(() => {
    // Fechar notificação automaticamente após 3 segundos
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);
    
    // Limpar o timer quando o componente for desmontado
    return () => clearTimeout(timer);
  }, [onClose]);
  
  // Cores baseadas no tipo de notificação
  const estilosNotificacao = {
    success: {
      backgroundColor: '#ebf8ee',
      color: '#276749',
      borderLeft: '4px solid #38a169'
    },
    error: {
      backgroundColor: '#feebed',
      color: '#9b2c2c',
      borderLeft: '4px solid #e53e3e'
    },
    warning: {
      backgroundColor: '#fffbeb',
      color: '#975a16',
      borderLeft: '4px solid #d69e2e'
    },
    info: {
      backgroundColor: '#ebf8ff',
      color: '#2a4365',
      borderLeft: '4px solid #3182ce'
    }
  };
  
  const estiloBase = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '4px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
    minWidth: '280px',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease forwards',
    ...estilosNotificacao[tipo || 'info']
  };
  
  return (
    <div style={estiloBase} className="notificacao-container">
      {mensagem}
    </div>
  );
};

export default Notificacao;