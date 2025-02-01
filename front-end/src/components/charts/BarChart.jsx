import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';
import {chartConfig} from '../utils/chartConfig';

const ChartCard = styled.div`
  ${chartConfig.chartCard}
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.85)',
        padding: '12px 16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)'
      }}>
        <p style={{ 
          color: '#fff', 
          margin: '0 0 8px',
          fontWeight: '500'
        }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            color: entry.color,
            margin: '4px 0',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarChart = ({ title }) => {
  const data = [
    { name: 'Jan', users: 4000, engagement: 2400 },
    { name: 'Feb', users: 3000, engagement: 1398 },
    { name: 'Mar', users: 2000, engagement: 9800 },
    { name: 'Apr', users: 2780, engagement: 3908 },
    { name: 'May', users: 1890, engagement: 4800 },
    { name: 'Jun', users: 2390, engagement: 3800 },
    { name: 'Jul', users: 3490, engagement: 4300 },
  ];

  return (
    <ChartCard>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBar
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
            </linearGradient>
            
            <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.8}/>
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255, 255, 255, 0.1)"
            vertical={false}
          />
          
          <XAxis 
            dataKey="name"
            stroke="rgba(255, 255, 255, 0.6)"
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
          />
          
          <YAxis 
            stroke="rgba(255, 255, 255, 0.6)"
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          
          <Bar 
            dataKey="users" 
            fill="url(#primaryGradient)"
            radius={[6, 6, 0, 0]}
            maxBarSize={50}
          />
          
          <Bar 
            dataKey="engagement" 
            fill="url(#secondaryGradient)"
            radius={[6, 6, 0, 0]}
            maxBarSize={50}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default BarChart; 