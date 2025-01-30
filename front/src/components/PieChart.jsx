import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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
  { name: 'Engineering', clubs: 18 },
  { name: 'Medical', clubs: 8 },
  { name: 'Arts & Science', clubs: 10 },
  { name: 'Management', clubs: 6 }
];

const COLORS = ['#6366f1', '#4ade80', '#f472b6', '#fb923c'];

const PieChart = ({ title }) => {
  return (
    <ChartCard>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="clubs"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'rgba(20, 20, 40, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{value}</span>}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default PieChart; 