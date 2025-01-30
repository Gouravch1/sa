import { BarChart as RechartsBar, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import styled from '@emotion/styled';

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(99, 102, 241, 0.3),
      transparent
    );
  }
  
  h3 {
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 20px;
      background: linear-gradient(to bottom, #6366f1, transparent);
      border-radius: 4px;
    }
  }
`;

const data = [
  { name: 'Instagram', views: 25000, shares: 1200 },
  { name: 'LinkedIn', views: 15000, shares: 800 },
  { name: 'Twitter', views: 18000, shares: 1500 },
  { name: 'YouTube', views: 12000, shares: 600 },
  { name: 'Facebook', views: 20000, shares: 900 }
];

const BarChart = ({ title }) => {
  return (
    <ChartCard>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBar data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="sharesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <Bar 
            dataKey="views" 
            fill="url(#viewsGradient)"
            radius={[4, 4, 0, 0]}
            name="Views"
          />
          <Bar 
            dataKey="shares" 
            fill="url(#sharesGradient)"
            radius={[4, 4, 0, 0]}
            name="Shares"
          />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(20, 20, 40, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}
          />
          <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" />
        </RechartsBar>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default BarChart; 