import React from 'react';

const Header = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'cadastro', label: 'Cadastro de Reserva' },
    { id: 'listar', label: 'Listar Vagas Ocupadas' },
    { id: 'disponiveis', label: 'Vagas Disponíveis' }
  ];
  
  return (
    <header className="header">
      <h1>Sistema de Controle de Estacionamento</h1>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`}
                className={activePage === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;