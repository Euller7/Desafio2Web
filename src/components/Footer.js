import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Sistema de Controle de Estacionamento</p>
    </footer>
  );
};

export default Footer;