import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from "./components/pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default App;
