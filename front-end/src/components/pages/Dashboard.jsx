import styled from '@emotion/styled';
import SideNav from '../layout/SideNav';    
import StatCard from '../stats/StatCard';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import AreaChart from '../charts/AreaChart';
import PieChart from '../charts/PieChart';
import "./dashboard.css";
import { useState } from 'react';

const DashboardContainer = styled.div`
  background: linear-gradient(135deg, #1a1f35 0%, #0a0f2c 100%);
  min-height: 100vh;
  padding: 1rem;
  color: white;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: fadeIn 0.5s ease-out;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  animation: fadeIn 0.5s ease-out;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  animation: fadeIn 0.5s ease-out;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ThemeButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Dashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleNavItemClick = (statCardTitle) => {
    setExpandedCard(statCardTitle);
  };

  const statCards = [
    {
      title: "Altruism Clubs",
      value: "42",
      icon: "🎓",
      growth: "+8 this month"
    },
    {
      title: "Bloom Downloads",
      value: "12,543",
      icon: "📱",
      growth: "+2.3k this week"
    },
    {
      title: "Luxury Goods Revenue",
      value: "₹8.2L",
      icon: "✨",
      growth: "+32% MTD"
    },
    {
      title: "Fellowship Applications",
      value: "789",
      icon: "🌟",
      growth: "+124 this batch"
    }
  ];

  return (
    <DashboardContainer>
      <SideNav onNavItemClick={handleNavItemClick} />
      <main>
        <Header>
          <h1>Systemic Altruism</h1>
        </Header>
        
        <StatsGrid>
          {statCards.map((card) => (
            <StatCard 
              key={card.title}
              {...card}
              isExpanded={expandedCard === card.title}
              onClose={() => setExpandedCard(null)}
            />
          ))}
        </StatsGrid>
        
        <ChartsGrid>
          <LineChart title="Monthly Donations Growth" />
          <BarChart title="Social Media Impact" />
          <AreaChart title="Bloom App Engagement" />
          <PieChart title="College Club Distribution" />
        </ChartsGrid>
      </main>
    </DashboardContainer>
  );
};

export default Dashboard; 