import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

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
  
  &::-webkit-scrollbar {
    display: none;
  }
  
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
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TrendIndicator = styled.div`
  font-size: 0.85rem;
  color: ${props => props.value?.startsWith('+') ? '#22c55e' : '#ef4444'};
  margin-top: 0.5rem;
`;

const ChartSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
  }
`;

const DetailedStats = ({ isExpanded, setIsExpanded, title, detailedStats, chartColors }) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <DetailedView
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ContentWrapper>
            <CloseButton onClick={() => setIsExpanded(false)}>
              ×
            </CloseButton>
            
            <DetailHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2>{title}</h2>
              </motion.div>
            </DetailHeader>
            
            <MetricsGrid>
              {detailedStats.metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue>{metric.value}</MetricValue>
                  <TrendIndicator style={{ color: metric.trendColor }}>
                    {metric.trend}
                  </TrendIndicator>
                </MetricCard>
              ))}
            </MetricsGrid>

            <ChartSection>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3>{detailedStats.breakdown.title}</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={detailedStats.breakdown.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {detailedStats.breakdown.data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={chartColors?.colors[index % chartColors.colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      verticalAlign="middle" 
                      align="right"
                      layout="vertical"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </ChartSection>
          </ContentWrapper>
        </DetailedView>
      )}
    </AnimatePresence>
  );
};

export default DetailedStats; 