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

const gradientOffset = () => {
  return 0.6;
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
            {/* Enhanced gradients for normal state */}
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
            </linearGradient>
            
            {/* Enhanced hover gradients with more vibrant colors */}
            <linearGradient id="primaryGradientHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity={1}/>
              <stop offset="100%" stopColor="#818cf8" stopOpacity={1}/>
            </linearGradient>
            
            <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.8}/>
            </linearGradient>
            
            <linearGradient id="secondaryGradientHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" stopOpacity={1}/>
              <stop offset="100%" stopColor="#4ade80" stopOpacity={1}/>
            </linearGradient>

            {/* Enhanced glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feOffset dx="0" dy="0" result="offsetblur"/>
              <feFlood floodColor="#fff" floodOpacity="0.2" result="glowColor"/>
              <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
              <feMerge>
                <feMergeNode in="softGlow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Shine effect */}
            <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" stopOpacity={0}/>
              <stop offset="45%" stopColor="rgba(255,255,255,0.25)" stopOpacity={0.25}/>
              <stop offset="55%" stopColor="rgba(255,255,255,0.25)" stopOpacity={0.25}/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity={0}/>
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
            animationDuration={1500}
            animationBegin={0}
            onMouseEnter={(data, index) => {
              const bar = document.querySelectorAll(`.bar-${index}`)[0];
              if (bar) {
                bar.style.filter = 'brightness(1.3) url(#glow)';
                bar.style.fill = 'url(#primaryGradientHover)';
                bar.style.transform = 'translateY(-4px)';
                bar.style.transition = 'all 0.3s ease';
              }
            }}
            onMouseLeave={(data, index) => {
              const bar = document.querySelectorAll(`.bar-${index}`)[0];
              if (bar) {
                bar.style.filter = 'none';
                bar.style.fill = 'url(#primaryGradient)';
                bar.style.transform = 'translateY(0)';
              }
            }}
            className={(data, index) => `bar-${index}`}
          />
          
          <Bar 
            dataKey="engagement" 
            fill="url(#secondaryGradient)"
            radius={[6, 6, 0, 0]}
            maxBarSize={50}
            animationDuration={1500}
            animationBegin={300}
            onMouseEnter={(data, index) => {
              const bar = document.querySelectorAll(`.bar-engagement-${index}`)[0];
              if (bar) {
                bar.style.filter = 'brightness(1.3) url(#glow)';
                bar.style.fill = 'url(#secondaryGradientHover)';
                bar.style.transform = 'translateY(-4px)';
                bar.style.transition = 'all 0.3s ease';
              }
            }}
            onMouseLeave={(data, index) => {
              const bar = document.querySelectorAll(`.bar-engagement-${index}`)[0];
              if (bar) {
                bar.style.filter = 'none';
                bar.style.fill = 'url(#secondaryGradient)';
                bar.style.transform = 'translateY(0)';
              }
            }}
            className={(data, index) => `bar-engagement-${index}`}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default BarChart; 