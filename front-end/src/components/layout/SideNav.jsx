import styled from '@emotion/styled';
import { useState } from 'react';

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  background: linear-gradient(
    180deg, 
    rgba(17, 24, 39, 0.95), 
    rgba(17, 24, 39, 0.98)
  );
  backdrop-filter: blur(20px);
  border-radius: 0 24px 24px 0;
  padding: 2rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(
        circle at 50% 0%, 
        rgba(99, 102, 241, 0.15),
        transparent 40%
      ),
      radial-gradient(
        circle at 50% 100%, 
        rgba(99, 102, 241, 0.1),
        transparent 40%
      ),
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.03) 30%,
        rgba(255, 255, 255, 0.03) 70%,
        transparent
      );
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    @media (min-width: 1025px) {
      width: 260px;
      box-shadow: 
        0 4px 30px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(99, 102, 241, 0.1);

      &::before {
        background: 
          radial-gradient(
            circle at 50% 0%, 
            rgba(99, 102, 241, 0.2),
            transparent 50%
          ),
          radial-gradient(
            circle at 50% 100%, 
            rgba(99, 102, 241, 0.15),
            transparent 50%
          ),
          linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05) 30%,
            rgba(255, 255, 255, 0.05) 70%,
            transparent
          );
      }

      button {
        padding: 0.875rem 1.25rem;
        justify-content: flex-start;
        
        span {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
      }
    }
  }

  @media (max-width: 1024px) {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    width: 100%;
    height: 75px;
    flex-direction: row;
    justify-content: center;
    border-radius: 24px 24px 0 0;
    padding: 0.75rem 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 640px) {
    height: 65px;
    padding: 0.5rem 1rem;
    gap: 1rem;
  }
`;

const NavItem = styled.button`
  position: relative;
  width: 100%;
  border: none;
  color: rgba(255, 255, 255, ${props => props.active ? '0.95' : '0.6'});
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.15)' : 'transparent'};
  padding: 0.875rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${props => props.active ? 'rgba(99, 102, 241, 0.2)' : 'transparent'};

  @media (max-width: 1024px) {
    width: auto;
    padding: 0.75rem;
    justify-content: center;
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 3px;
    height: ${props => props.active ? '100%' : '0%'};
    background: linear-gradient(180deg, #6366f1, #818cf8);
    transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 4px 4px 0;
    opacity: ${props => props.active ? '1' : '0'};

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &:hover {
    color: white;
    background: rgba(99, 102, 241, 0.15);
    transform: translateX(4px);

    @media (max-width: 1024px) {
      transform: translateY(-4px);
    }

    &::before {
      height: 100%;
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.97);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 1.4rem;
  transition: all 0.2s ease;
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      inset: -5px;
      border-radius: 12px;
      background: radial-gradient(circle at center, rgba(99, 102, 241, 0.2), transparent);
      z-index: -1;
    }
  `}

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
`;

const NavText = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  color: inherit;
  letter-spacing: 0.3px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  border: 2px solid rgba(17, 24, 39, 0.98);
`;

const SideNav = ({ onNavItemClick }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [notifications, setNotifications] = useState(3);

  const navItems = [
    { 
      icon: '🏠', 
      label: 'Dashboard', 
      notifications: 0,
      statCard: null 
    },
    { 
      icon: '🎭', 
      label: 'SA Club', 
      notifications: 0,
      statCard: 'Altruism Clubs'
    },
    { 
      icon: '🌸', 
      label: 'Bloom Insights', 
      notifications: notifications,
      statCard: 'Bloom Downloads'
    },
    { 
      icon: '💎', 
      label: 'Luxury Goods', 
      notifications: 0,
      statCard: 'Luxury Goods Revenue'
    },
    { 
      icon: '🌟', 
      label: 'Fellowship', 
      notifications: 0,
      statCard: 'Fellowship Applications'
    }
  ];

  return (
    <Nav>
      {navItems.map((item, index) => (
        <NavItem 
          key={index}
          active={activeItem === index}
          onClick={() => {
            setActiveItem(index);
            if (item.statCard) {
              onNavItemClick(item.statCard);
            } else {
              onNavItemClick(null);
            }
          }}
        >
          <IconWrapper active={activeItem === index}>
            {item.icon}
            {item.notifications > 0 && (
              <Badge>{item.notifications}</Badge>
            )}
          </IconWrapper>
          <NavText>{item.label}</NavText>
        </NavItem>
      ))}
    </Nav>
  );
};

export default SideNav;