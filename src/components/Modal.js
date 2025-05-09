import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  const modalRef = useRef(null);
  
  // Adiciona evento de clique fora do modal para fechar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };
  
  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
    maxWidth: '90%',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };
  
  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    gap: '10px',
  };
  
  const buttonStyle = (primary) => ({
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    backgroundColor: primary ? '#3182ce' : '#e2e8f0',
    color: primary ? 'white' : '#4a5568',
  });
  
  return (
    <div style={modalStyle} className="modal">
      <div style={modalContentStyle} className="modal-content" ref={modalRef}>
        <button style={closeButtonStyle} onClick={onClose}>&times;</button>
        <p>{message}</p>
        <div style={buttonContainerStyle}>
          <button 
            style={buttonStyle(false)} 
            onClick={onClose} 
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button 
            style={buttonStyle(true)} 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="btn-primary"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;