import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Area, AreaChart, CartesianGrid, ReferenceLine, PieChart, Pie,
  Cell, RadialBarChart, RadialBar, Legend, Bar, BarChart, Sector
} from 'recharts';
import DetailedStats from './DetailedStats';

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

const DetailedView = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%);
  backdrop-filter: blur(10px);
  z-index: 1000;
  overflow-y: auto;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const DetailHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
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

const CustomTooltip = ({ active, payload, chartType }) => {
  if (active && payload && payload.length) {
    const getTooltipColor = () => {
      switch (chartType) {
        case "Bloom Downloads":
          return '#818cf8';
        case "Altruism Clubs":
          return '#4ade80';
        case "Luxury Goods Revenue":
          return '#fbbf24';
        case "Fellowship Applications":
          return '#f472b6';
        default:
          return '#818cf8';
      }
    };

    return (
      <div
        style={{
          background: 'rgba(17, 24, 39, 0.95)',
          border: `1px solid ${getTooltipColor()}`,
          borderRadius: '0.75rem',
          padding: '1rem',
          boxShadow: `0 4px 6px -1px ${getTooltipColor()}20`,
          backdropFilter: 'blur(8px)'
        }}
      >
        <p style={{ 
          color: '#fff', 
          fontWeight: '600',
          marginBottom: '0.5rem' 
        }}>
          {payload[0].name}
        </p>
        <p style={{ 
          color: getTooltipColor(),
          fontSize: '1.25rem',
          fontWeight: '700' 
        }}>
          {payload[0].value}%
        </p>
        {payload[0].payload.amount && (
          <p style={{ 
            color: '#fff',
            opacity: 0.8,
            fontSize: '0.875rem',
            marginTop: '0.25rem'
          }}>
            {payload[0].payload.amount}
          </p>
        )}
      </div>
    );
  }
  return null;
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

  const getTrendColor = () => {
    switch (title) {
      case "Bloom Downloads":
        return '#818cf8'; // Indigo
      case "Altruism Clubs":
        return '#4ade80'; // Green
      case "Luxury Goods Revenue":
        return '#fbbf24'; // Amber
      case "Fellowship Applications":
        return '#f472b6'; // Pink
      default:
        return '#818cf8';
    }
  };

  const TrendIndicator = styled.div`
    font-size: 0.85rem;
    color: ${getTrendColor()};
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: color 0.3s ease;
  `;

  const getDetailedStats = () => {
    switch (title) {
      case "Total Donations":
        const donationValue = parseInt(value.replace(/[^0-9]/g, ''));
        return {
          metrics: [
            { 
              label: "Average Donation", 
              value: "₹" + (Math.floor(donationValue * 0.002)).toLocaleString(),
              trend: "+15% this month",
              trendColor: '#22c55e'  // Green color for positive trends
            },
            { 
              label: "Total Donors", 
              value: Math.floor(donationValue * 0.005).toLocaleString(),
              trend: "+28 today",
              trendColor: '#22c55e'
            },
            { 
              label: "Recurring Donors", 
              value: Math.floor(donationValue * 0.003).toLocaleString(),
              trend: "+12% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "Donation Success Rate", 
              value: "94%",
              trend: "+2% this month",
              trendColor: '#22c55e'
            }
          ],
          breakdown: {
            title: "Donations by Category",
            data: [
              { 
                name: "Education", 
                value: 40,
                amount: "₹" + (Math.floor(donationValue * 0.40)).toLocaleString()
              },
              { 
                name: "Healthcare", 
                value: 30,
                amount: "₹" + (Math.floor(donationValue * 0.30)).toLocaleString()
              },
              { 
                name: "Community", 
                value: 20,
                amount: "₹" + (Math.floor(donationValue * 0.20)).toLocaleString()
              },
              { 
                name: "Emergency", 
                value: 10,
                amount: "₹" + (Math.floor(donationValue * 0.10)).toLocaleString()
              }
            ]
          }
        };

      case "Bloom Downloads":
        return {
          metrics: [
            { 
              label: "iOS Downloads", 
              value: Math.floor(parseInt(value) * 0.6),
              trend: "+12% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "Android Downloads", 
              value: Math.floor(parseInt(value) * 0.4),
              trend: "+8% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "Active Users", 
              value: Math.floor(parseInt(value) * 0.75),
              trend: "+15% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "User Engagement", 
              value: "85%",
              trend: "+5% this month",
              trendColor: '#22c55e'
            }
          ],
          breakdown: {
            title: "User Distribution",
            data: [
              { name: "Metro Cities", value: 45 },
              { name: "Tier 2 Cities", value: 30 },
              { name: "Tier 3 Cities", value: 15 },
              { name: "Other Regions", value: 10 }
            ]
          }
        };

      case "Altruism Clubs":
        return {
          metrics: [
            { 
              label: "Active Members", 
              value: Math.floor(parseInt(value) * 25),
              trend: "+20% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "Events This Month", 
              value: Math.floor(parseInt(value) * 2),
              trend: "+5 from last month",
              trendColor: '#22c55e'
            },
            { 
              label: "Average Attendance", 
              value: Math.floor(parseInt(value) * 15),
              trend: "+12% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "Member Satisfaction", 
              value: "92%",
              trend: "+3% this month",
              trendColor: '#22c55e'
            }
          ],
          breakdown: {
            title: "Club Activities Distribution",
            data: [
              { name: "Community Service", value: 40 },
              { name: "Fundraising", value: 25 },
              { name: "Workshops", value: 20 },
              { name: "Social Events", value: 15 }
            ]
          }
        };

      case "Fellowship Applications":
        return {
          metrics: [
            { 
              label: "Completed Applications", 
              value: Math.floor(parseInt(value) * 0.8),
              trend: "+45 this week",
              trendColor: '#22c55e'
            },
            { 
              label: "Shortlisted", 
              value: Math.floor(parseInt(value) * 0.3),
              trend: "+15 this week",
              trendColor: '#22c55e'
            },
            { 
              label: "Interview Stage", 
              value: Math.floor(parseInt(value) * 0.15),
              trend: "+8 this week",
              trendColor: '#22c55e'
            },
            { 
              label: "Success Rate", 
              value: "18%",
              trend: "+2% this month",
              trendColor: '#22c55e'
            }
          ],
          breakdown: {
            title: "Application Status Distribution",
            data: [
              { name: "Under Review", value: 40 },
              { name: "Shortlisted", value: 30 },
              { name: "Interview", value: 20 },
              { name: "Selected", value: 10 }
            ]
          }
        };

      case "Luxury Goods Revenue":
        const baseValue = parseInt(value.replace(/[^0-9]/g, ''));
        return {
          metrics: [
            { 
              label: "Average Order Value", 
              value: "₹" + (Math.floor(baseValue/100)).toLocaleString(),
              trend: "+18% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "Total Orders", 
              value: Math.floor(baseValue/10000).toLocaleString(),
              trend: "+25 orders today",
              trendColor: '#22c55e'
            },
            { 
              label: "Customer Retention", 
              value: "78%",
              trend: "+5% this month",
              trendColor: '#22c55e'
            },
            { 
              label: "New Customers", 
              value: Math.floor(baseValue/20000).toLocaleString(),
              trend: "+12 today",
              trendColor: '#22c55e'
            }
          ],
          breakdown: {
            title: "Revenue by Category",
            data: [
              { 
                name: "Premium Jewelry", 
                value: 45,
                amount: "₹" + Math.floor(baseValue * 0.45).toLocaleString()
              },
              { 
                name: "Designer Watches", 
                value: 30,
                amount: "₹" + Math.floor(baseValue * 0.30).toLocaleString()
              },
              { 
                name: "Limited Editions", 
                value: 15,
                amount: "₹" + Math.floor(baseValue * 0.15).toLocaleString()
              },
              { 
                name: "Exclusive Items", 
                value: 10,
                amount: "₹" + Math.floor(baseValue * 0.10).toLocaleString()
              }
            ]
          }
        };

      default:
        return {
          metrics: [],
          breakdown: { title: "", data: [] }
        };
    }
  };

  const detailedStats = getDetailedStats();

  const getChartColors = () => {
    switch (title) {
      case "Total Donations":
        return {
          colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'], // Green, Blue, Amber, Pink
          highlight: '#34d399',
          textColor: '#6ee7b7'
        };
      case "Bloom Downloads":
        return {
          colors: ['#6366f1', '#f43f5e', '#84cc16', '#8b5cf6'], // Indigo, Rose, Lime, Purple
          highlight: '#818cf8',
          textColor: '#a5b4fc'
        };
      case "Luxury Goods Revenue":
        return {
          colors: ['#eab308', '#06b6d4', '#ef4444', '#10b981'], // Yellow, Cyan, Red, Emerald
          highlight: '#fbbf24',
          textColor: '#fcd34d'
        };
      case "Fellowship Applications":
        return {
          colors: ['#d946ef', '#0ea5e9', '#f97316', '#14b8a6'], // Fuchsia, Sky, Orange, Teal
          highlight: '#f472b6',
          textColor: '#f9a8d4'
        };
      default:
        return {
          colors: ['#6366f1', '#22c55e', '#f59e0b', '#ec4899'],
          highlight: '#818cf8',
          textColor: '#a5b4fc'
        };
    }
  };

  const chartTheme = getChartColors();

  return (
    <>
      <Card onClick={() => setIsExpanded(true)}>
        <StatInfo>
          <h3>{title}</h3>
          <div>
            <span className="value">{value}</span>
            <span 
              className="growth" 
              style={{ 
                color: growth.startsWith('+') ? '#22c55e' : '#ef4444',
                marginLeft: '8px',
                fontWeight: '500'
              }}
            >
              {growth}
            </span>
          </div>
        </StatInfo>
        <IconWrapper>{icon}</IconWrapper>
      </Card>

      <DetailedStats 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        title={title}
        detailedStats={detailedStats}
        chartColors={chartTheme}
      />
    </>
  );
};

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
`;

const MetricCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 1.75rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
`;

const MetricLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const MetricValue = styled.div`
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const ChartSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: translateY(-2px);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: center;
    transition: color 0.3s ease;
  }
`;

export default StatCard;