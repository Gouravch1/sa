import styled from '@emotion/styled';
import { useState } from 'react';

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.isOpen ? '240px' : '70px'};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isOpen ? 'flex-start' : 'center'};
  gap: 1rem;
  transition: all 0.3s ease;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    width: 240px;
  }
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  span {
    font-size: 0.9rem;
    font-weight: 500;
    display: ${props => props.isOpen ? 'block' : 'none'};
    opacity: ${props => props.isOpen ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const MenuToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  display: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: '📊', label: 'Dashboard' },
    { icon: '👥', label: 'Users' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📁', label: 'Files' },
    { icon: '📈', label: 'Analytics' }
  ];

  return (
    <>
      <MenuToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MenuToggle>
      <Nav isOpen={isOpen}>
        {navItems.map((item, index) => (
          <NavItem key={index} isOpen={isOpen}>
            {item.icon}
            <span>{item.label}</span>
          </NavItem>
        ))}
      </Nav>
    </>
  );
};

export default SideNav;