import styled from '@emotion/styled';

const Card = styled.div`
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

const StatCard = ({ title, value, icon, growth }) => {
  return (
    <Card>
      <StatInfo>
        <h3>{title}</h3>
        <div>
          <span className="value">
            {value}
          </span>
          {growth && (
            <span className="growth">
              {growth}
            </span>
          )}
        </div>
      </StatInfo>
      <IconWrapper>
        {icon}
      </IconWrapper>
    </Card>
  );
};

export default StatCard;