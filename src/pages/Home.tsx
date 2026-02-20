import './Home.css';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate();
  const { signOutUser } = UserAuth()!;

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signOutUser();
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <h1>Inventory Management</h1>
          <button onClick={handleSignOut} className="signout-button">Sign Out</button>
        </div>
      </div>

      <div className="home-content">
        <section className="welcome-section">
          <h2>Welcome Back</h2>
          <p>You're logged in and ready to manage your inventory</p>
        </section>

        <section className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Track Items</h3>
              <p>Keep organized records of all your inventory items with real-time tracking.</p>
            </div>
            <div className="feature-card">
              <h3>Analytics</h3>
              <p>Get insights into your inventory with detailed reports and analytics.</p>
            </div>
            <div className="feature-card">
              <h3>Easy Management</h3>
              <p>Manage your stock quickly with our intuitive and responsive interface.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;