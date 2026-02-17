import './Home.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Inventory Management</h1>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Track Items</h3>
          <p>Keep organized records of all your inventory items with real-time tracking.</p>
        </div>
        <div className="feature-card">
          <h3>Analytics</h3>
          <p>Get insights into your inventory with detailed reports and analytics.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <Button onClick={() => navigate('/login')}>
            Login
        </Button>
      </section>
    </div>
  );
}

export default Home;