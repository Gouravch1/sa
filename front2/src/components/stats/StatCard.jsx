import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Area, AreaChart, CartesianGrid, ReferenceLine, PieChart, Pie,
  Cell, RadialBarChart, RadialBar, Legend, Bar, BarChart, Sector
} from 'recharts';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    &::before {
      opacity: 1;
    }
  }
`;

const DetailedView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }
  
  .value {
    font-size: 1.75rem;
    font-weight: 600;
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: scaleIn 0.5s ease-out;
  }
  
  .growth {
    background: rgba(76, 175, 80, 0.1);
    color: #4caf50;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    animation: fadeIn 0.5s ease-out;
  }
`;

const IconWrapper = styled.span`
  font-size: 2rem;
  animation: fadeIn 0.5s ease-out;
  transition: transform 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 0.75rem;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 300px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const generateDetailData = (value, title, growth) => {
  // Parse current value
  let currentValue = value;
  if (typeof value === 'string') {
    if (value.includes('$')) {
      currentValue = parseFloat(value.replace('$', '').replace(',', ''));
    } else if (value.includes('%')) {
      currentValue = parseFloat(value.replace('%', ''));
    } else {
      currentValue = parseFloat(value.replace(',', ''));
    }
  }

  // Parse growth rate (e.g., "+8% this month" becomes 0.08)
  let growthRate = 0;
  if (growth) {
    const numericGrowth = parseFloat(growth.match(/-?\d+/)[0]);
    growthRate = numericGrowth / 100;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [];

  // Calculate exact previous month value
  // If current value is 1000 and growth is +8%, previous month was 1000/1.08 ≈ 925.93
  const previousMonth = currentValue / (1 + growthRate);
  
  // Calculate monthly change amount
  const monthlyChange = (currentValue - previousMonth) / 5;

  // Generate data points
  for (let i = 0; i < 6; i++) {
    let monthValue;
    
    if (i === 5) {
      // Current month (June)
      monthValue = currentValue;
    } else if (i === 4) {
      // Previous month (May)
      monthValue = previousMonth;
    } else {
      // Earlier months with consistent growth
      monthValue = previousMonth - ((4 - i) * monthlyChange);
    }

    // Format based on card type
    const formattedValue = title === "Luxury Goods Revenue" 
      ? Number(monthValue.toFixed(2))
      : Math.round(monthValue);

    data.push({
      month: months[i],
      value: formattedValue,
      // Add actual percentage change for tooltip
      change: i > 0 ? 
        ((data[i-1]?.value ? (formattedValue - data[i-1].value) / data[i-1].value * 100 : 0)).toFixed(1) + '%' 
        : '0%'
    });
  }

  return data;
};

// Professional color schemes
const COLORS = {
  primary: ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'],
  success: ['#22c55e', '#4ade80', '#86efac', '#bbf7d0'],
  warning: ['#eab308', '#facc15', '#fde047', '#fef08a'],
  info: ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc']
};

const StatCard = ({ title, value, icon, growth }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePieIndex, setActivePieIndex] = useState(0);
  const detailData = generateDetailData(value, title, growth);

  // Calculate the actual growth rate for display
  const formatGrowthRate = (currentValue, previousValue) => {
    const growthValue = ((currentValue - previousValue) / previousValue) * 100;
    const formattedGrowth = growthValue.toFixed(1);
    const prefix = growthValue >= 0 ? '+' : '';
    return `${prefix}${formattedGrowth}% this month`;
  };

  // Get current and previous month values from detailData
  const currentMonthValue = detailData[detailData.length - 1].value;
  const previousMonthValue = detailData[detailData.length - 2].value;
  const displayGrowth = formatGrowthRate(currentMonthValue, previousMonthValue);

  const formatValue = (value, change) => {
    const formattedNumber = title === "Luxury Goods Revenue" 
      ? Number(value).toFixed(2).toLocaleString()
      : Math.round(value).toLocaleString();
    
    if (change) {
      const changeValue = parseFloat(change);
      const changeColor = changeValue >= 0 ? '#4ade80' : '#ef4444';
      const changePrefix = changeValue >= 0 ? '+' : '';
      return [
        formattedNumber,
        <span style={{ color: changeColor }}>
          {`${changePrefix}${change}`}
        </span>
      ];
    }
    return formattedNumber;
  };

  // Custom gradient definitions
  const gradientDef = (
    <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'rgba(26, 31, 53, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <p style={{ margin: '0 0 8px', color: '#fff', fontWeight: '500' }}>{label}</p>
          <p style={{ 
            margin: '0',
            color: '#6366f1',
            fontWeight: 'bold',
            fontSize: '1.1em'
          }}>
            {title === "Luxury Goods Revenue" 
              ? `$${payload[0].value.toFixed(2).toLocaleString()}`
              : payload[0].value.toLocaleString()}
          </p>
          {payload[0].payload.change && (
            <p style={{
              margin: '4px 0 0',
              color: payload[0].payload.change.startsWith('-') ? '#ef4444' : '#4ade80',
              fontSize: '0.9em'
            }}>
              {payload[0].payload.change}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Generate comprehensive analytics data
  const generateAnalyticsData = () => {
    const baseValue = typeof value === 'string' ? 
      parseFloat(value.replace(/[^0-9.-]+/g, "")) : value;

    return {
      distribution: [
        { name: 'Direct', value: baseValue * 0.4 },
        { name: 'Indirect', value: baseValue * 0.3 },
        { name: 'Organic', value: baseValue * 0.2 },
        { name: 'Other', value: baseValue * 0.1 }
      ],
      performance: [
        { name: 'Target', value: baseValue * 1.2 },
        { name: 'Achieved', value: baseValue },
        { name: 'Projected', value: baseValue * 1.1 }
      ],
      trends: Array.from({ length: 12 }, (_, i) => ({
        name: `Month ${i + 1}`,
        actual: baseValue * (0.8 + Math.random() * 0.4),
        expected: baseValue
      }))
    };
  };

  const analyticsData = generateAnalyticsData();

  // Custom active shape for pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#fff">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#fff">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <>
      <Card
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <StatInfo>
          <h3>{title}</h3>
          <div>
            <span className="value">{value}</span>
            <span 
              className="growth"
              style={{ 
                color: displayGrowth.startsWith('+') ? '#4ade80' : '#ef4444',
                marginLeft: '8px',
                fontWeight: '500'
              }}
            >
              {displayGrowth}
            </span>
          </div>
        </StatInfo>
        <IconWrapper>{icon}</IconWrapper>
      </Card>

      <AnimatePresence>
        {isExpanded && (
          <DetailedView>
            <button 
              onClick={() => setIsExpanded(false)}
              style={{
                position: 'absolute',
                right: '2rem',
                top: '2rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{title} Analytics</h2>

            <ChartGrid>
              {/* Distribution Pie Chart */}
              <ChartCard>
                <h3>Distribution Analysis</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activePieIndex}
                      activeShape={renderActiveShape}
                      data={analyticsData.distribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={(_, index) => setActivePieIndex(index)}
                    >
                      {analyticsData.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Performance Bar Chart */}
              <ChartCard>
                <h3>Performance Metrics</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.performance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(17, 24, 39, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="#4f46e5">
                      {analyticsData.performance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.info[index % COLORS.info.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Trends Area Chart */}
              <ChartCard style={{ gridColumn: '1 / -1' }}>
                <h3>Monthly Trends</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData.trends}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(17, 24, 39, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#4f46e5"
                      fillOpacity={1}
                      fill="url(#colorActual)"
                    />
                    <Line
                      type="monotone"
                      dataKey="expected"
                      stroke="#eab308"
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </ChartGrid>
          </DetailedView>
        )}
      </AnimatePresence>
    </>
  );
};

export default StatCard;