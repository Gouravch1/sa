import { useState, useCallback } from 'react';
import { AreaChart as RechartsArea, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts';
import styled from '@emotion/styled';
import { chartConfig } from '../utils/chartConfig';

const ChartCard = styled.div`
  ${chartConfig.chartCard}
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #fff;
  font-weight: 600;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TimeframeButton = styled.button`
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.active ? '#6366f1' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#6366f1' : 'rgba(255, 255, 255, 0.6)'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: #6366f1;
    color: #6366f1;
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.75rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}>
        <div style={{
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '0.5rem'
        }}>
          {label}
        </div>
        {payload.map((entry, index) => (
          <div key={index} style={{
            color: entry.color,
            fontSize: '1.125rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0'
          }}>
            <div style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: entry.color,
              boxShadow: `0 0 8px ${entry.color}`
            }} />
            <span>{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AreaChart = ({ title }) => {
  const [timeframe, setTimeframe] = useState('1M');
  const [hoveredDate, setHoveredDate] = useState(null);
  
  // Generate more detailed data
  const generateData = useCallback(() => {
    const periods = {
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '1Y': 365
    };
    
    const days = periods[timeframe];
    const data = [];
    let baseUsers = 8000;
    let baseTime = 24;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      // Add some randomness and trends
      const trend = Math.sin(i / 10) * 1000;
      const noise = Math.random() * 500 - 250;
      
      data.push({
        date: date.toISOString().split('T')[0],
        activeUsers: Math.max(0, Math.round(baseUsers + trend + noise)),
        sessionTime: Math.max(0, Math.round(baseTime + (trend / 100) + (noise / 50))),
        engagementScore: Math.round((Math.random() * 30 + 70) * 10) / 10
      });
    }
    return data;
  }, [timeframe]);

  const data = generateData();

  return (
    <ChartCard>
      <ChartHeader>
        <Title>{title}</Title>
      </ChartHeader>
      
      <ChartControls>
        {['1W', '1M', '3M', '1Y'].map(tf => (
          <TimeframeButton
            key={tf}
            active={timeframe === tf}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </TimeframeButton>
        ))}
      </ChartControls>

      <ResponsiveContainer width="100%" height={400}>
        <RechartsArea
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          onMouseMove={(e) => {
            if (e?.activeLabel) {
              setHoveredDate(e.activeLabel);
            }
          }}
        >
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false}
            stroke="rgba(255, 255, 255, 0.05)"
          />
          
          <XAxis 
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            dx={-10}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
          />
          
          <Area
            type="monotone"
            dataKey="activeUsers"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#gradient1)"
            dot={false}
            activeDot={{ 
              r: 6, 
              fill: '#6366f1',
              stroke: '#fff',
              strokeWidth: 2,
              filter: 'url(#glow)'
            }}
          />
          
          <Area
            type="monotone"
            dataKey="sessionTime"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#gradient2)"
            dot={false}
            activeDot={{ 
              r: 6, 
              fill: '#22c55e',
              stroke: '#fff',
              strokeWidth: 2,
              filter: 'url(#glow)'
            }}
          />
        </RechartsArea>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default AreaChart; 