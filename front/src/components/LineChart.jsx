import { LineChart as RechartsLine, Line, XAxis, YAxis, ResponsiveContainer, Area, CartesianGrid, Tooltip } from 'recharts';
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
  
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: rgba(255, 255, 255, 0.05);
  }
  
  .recharts-tooltip-wrapper {
    background: rgba(20, 20, 40, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
  }
`;

const data = [
  { name: 'Jan', donations: 250000, campaigns: 3 },
  { name: 'Feb', donations: 320000, campaigns: 4 },
  { name: 'Mar', donations: 280000, campaigns: 3 },
  { name: 'Apr', donations: 450000, campaigns: 5 },
  { name: 'May', donations: 520000, campaigns: 6 }
];

const formatRupees = (value) => {
  return `₹${(value/1000).toFixed(1)}K`;
};

const LineChart = ({ title }) => {
  return (
    <ChartCard>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLine data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Line 
            type="monotone" 
            dataKey="donations" 
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 8, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }}
            name="Donations"
          />
          <Line 
            type="monotone" 
            dataKey="campaigns" 
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 8, fill: '#fff', stroke: '#4ade80', strokeWidth: 2 }}
            name="Campaigns"
            yAxisId="right"
          />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
            tickFormatter={formatRupees}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
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
            formatter={(value, name) => [
              name === 'Donations' ? formatRupees(value) : value,
              name
            ]}
          />
          <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" />
        </RechartsLine>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default LineChart; 