import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
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

const StatCard = ({ title, value, icon, growth, isExpanded, onClose }) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = isExpanded || internalExpanded;
  const detailData = generateDetailData(value, title, growth);

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
              trendColor: '#22c55e'
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
          colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'],
          highlight: '#34d399',
          textColor: '#6ee7b7'
        };
      case "Bloom Downloads":
        return {
          colors: ['#6366f1', '#f43f5e', '#84cc16', '#8b5cf6'],
          highlight: '#818cf8',
          textColor: '#a5b4fc'
        };
      case "Luxury Goods Revenue":
        return {
          colors: ['#eab308', '#06b6d4', '#ef4444', '#10b981'],
          highlight: '#fbbf24',
          textColor: '#fcd34d'
        };
      case "Fellowship Applications":
        return {
          colors: ['#d946ef', '#0ea5e9', '#f97316', '#14b8a6'],
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
      <Card onClick={() => setInternalExpanded(true)}>
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
        isExpanded={expanded}
        setIsExpanded={(value) => {
          setInternalExpanded(value);
          if (!value) onClose?.();
        }}
        title={title}
        detailedStats={detailedStats}
        chartColors={chartTheme}
      />
    </>
  );
};

export default StatCard;