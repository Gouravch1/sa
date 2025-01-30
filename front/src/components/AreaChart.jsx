import { AreaChart as RechartsArea, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  { name: 'Week 1', activeUsers: 8400, sessionTime: 24 },
  { name: 'Week 2', activeUsers: 9300, sessionTime: 28 },
  { name: 'Week 3', activeUsers: 8900, sessionTime: 25 },
  { name: 'Week 4', activeUsers: 11200, sessionTime: 32 },
  { name: 'Week 5', activeUsers: 12600, sessionTime: 35 }
];

const AreaChart = ({ title }) => {
  return (
    <ChartCard>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsArea data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone"
            dataKey="activeUsers"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#activeUsersGradient)"
            name="Active Users"
          />
          <Area 
            type="monotone"
            dataKey="sessionTime"
            stroke="#4ade80"
            fillOpacity={1}
            fill="url(#sessionsGradient)"
            name="Session Time"
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
        </RechartsArea>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default AreaChart; 