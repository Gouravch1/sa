import { useState } from 'react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import styled from '@emotion/styled';
import {chartConfig} from '../utils/chartConfig';

const ChartCard = styled.div`
  ${chartConfig.chartCard}
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.5px;
`;

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.9}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
      <text
        x={cx}
        y={cy - 15}
        textAnchor="middle"
        fill="#fff"
        fontSize="28px"
        fontWeight="600"
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        fill="rgba(255, 255, 255, 0.9)"
        fontSize="16px"
        fontWeight="500"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 40}
        textAnchor="middle"
        fill="rgba(255, 255, 255, 0.6)"
        fontSize="14px"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
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
          margin: '0 0 4px', 
          color: payload[0].payload.color,
          fontWeight: '600',
          fontSize: '14px'
        }}>
          {payload[0].name}
        </p>
        <p style={{ 
          margin: '0', 
          color: '#fff', 
          fontSize: '18px', 
          fontWeight: '600' 
        }}>
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const PieChart = ({ title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      name: 'Engineering',
      value: 245,
      color: '#6366f1'
    },
    {
      name: 'Arts & Science',
      value: 680,
      color: '#22c55e'
    },
    {
      name: 'Medical',
      value: 185,
      color: '#eab308'
    },
    {
      name: 'Management',
      value: 92,
      color: '#ec4899'
    }
  ];

  return (
    <ChartCard>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPie>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={125}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={48}
            iconType="circle"
            iconSize={10}
            formatter={(value, entry) => (
              <span style={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                fontWeight: '500',
                padding: '4px 8px'
              }}>
                {value} ({entry.payload.value})
              </span>
            )}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default PieChart; 