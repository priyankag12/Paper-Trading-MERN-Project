import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="logo">PaperLingo</h1>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#benefits">Benefits</a>
          <a href="#faq">FAQ</a>
          <button className="cta-button">Get Started</button>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Learn Stock Trading with Zero Risk</h2>
          <p>Practice trading, improve your skills, and stay updated with the latest finance insights—all in one place.</p>
          <button className="cta-button">Sign Up for Free</button>
        </div>
      </section>

      <section id="features" className="features-section">
        <h1>Features</h1>
        <div className="features">
          <div className="feature">
            <h4>Live Stock Prices</h4>
            <p>Access real-time stock prices and trends. Please note that stock prices may be delayed by one day.</p>
          </div>
          <div className="feature">
            <h4>Simulated Trading</h4>
            <p>Execute trades in a risk-free, simulated environment.</p>
          </div>
          <div className="feature">
            <h4>AI-Powered Quizzes</h4>
            <p>Boost your knowledge with AI-generated finance quizzes.</p>
          </div>
          <div className="feature">
            <h4>Comprehensive Portfolio</h4>
            <p>Manage and analyze your investment portfolio easily.</p>
          </div>
          <div className="feature">
            <h4>Top Gainers & Losers</h4>
            <p>Stay updated with the latest market movements by viewing top gainers and losers.</p>
          </div>
          <div className="feature">
            <h4>Chatbot Assistance</h4>
            <p>Get help and guidance from our AI chatbot at any time.</p>
          </div>
          <div className="feature">
            <h4>Latest News</h4>
            <p>Access the most recent financial news to make informed trading decisions.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <h1>How It Works</h1>
        <div className="steps-container">
          <ol className="steps">
            <li>
              <div className="step-icon">1</div>
              <div className="step-content">
                <h4>Sign Up</h4>
                <p>Create your free account and get started with PaperLingo.</p>
              </div>
            </li>
            <li>
              <div className="step-icon">2</div>
              <div className="step-content">
                <h4>Choose Stocks</h4>
                <p>Browse and select stocks to trade with virtual funds.</p>
              </div>
            </li>
            <li>
              <div className="step-icon">3</div>
              <div className="step-content">
                <h4>Track Progress</h4>
                <p>Monitor your progress and enhance your trading skills.</p>
              </div>
            </li>
            <li>
              <div className="step-icon">4</div>
              <div className="step-content">
                <h4>Compete & Learn</h4>
                <p>Join the leaderboard and learn through AI quizzes.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="benefits" className="benefits-section">
        <h1>Benefits</h1>
        <div className="benefits">
          <div className="benefit">
            <h4>Risk-Free Learning</h4>
            <p>Build trading confidence without financial risk.</p>
          </div>
          <div className="benefit">
            <h4>Real-Time Insights</h4>
            <p>Stay informed with up-to-date financial resources.</p>
          </div>
          <div className="benefit">
            <h4>Progress Tracking</h4>
            <p>Review your trades and growth over time.</p>
          </div>
          <div className="benefit">
            <h4>Fun & Interactive</h4>
            <p>Learn through engaging quizzes and gamified elements.</p>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <h1>Frequently Asked Questions</h1>
        <div className="faq">
          {[
            { question: "Is this platform free?", answer: "Yes, PaperLingo is 100% free for educational purposes." },
            { question: "Do I need trading experience?", answer: "No, our platform is beginner-friendly." },
            { question: "Can I access real stock data?", answer: "Absolutely! However, please note that stock prices are delayed by one day as we retrieve them from an API." },
          ].map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h4>{item.question}</h4>
                <span>{openIndex === index ? '-' : '+'}</span>
              </div>
              {openIndex === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 PaperLingo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
