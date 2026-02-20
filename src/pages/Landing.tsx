import './Landing.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-content">
          <div className="landing-header">
            <h1>Inventory Management</h1>
            <p className="landing-subtitle">Organize your inventory with ease</p>
          </div>

          <section className="landing-features">
            <h2>Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Simple & Intuitive</h3>
                <p>Easy-to-use interface designed for everyone</p>
              </div>
              <div className="feature-item">
                <h3>Real-time Tracking</h3>
                <p>Monitor your inventory instantly and stay organized</p>
              </div>
              <div className="feature-item">
                <h3>Secure & Reliable</h3>
                <p>Your data is safe with enterprise-grade security</p>
              </div>
            </div>
          </section>

          <section className="landing-cta">
            <h2>Get Started Today</h2>
            <div className="cta-buttons">
              <button onClick={() => navigate('/signin')} className="cta-button primary">
                Sign In
              </button>
              <button onClick={() => navigate('/signup')} className="cta-button secondary">
                Create Account
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;