  
import React, { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import headerImage from '../../assets/header.jpg';
import './LandingPage.css';
import Slider from 'react-slick';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__content form", {
      ...scrollRevealOption,
      delay: 1500,
    });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const navigate = useNavigate();

  const featureData = [
    { title: 'Live Stock Prices', description: 'Access real-time stock prices and trends.' },
    { title: 'Simulated Trading', description: 'Execute trades in a risk-free environment.' },
    { title: 'AI-Powered Quizzes', description: 'Boost your knowledge with AI-generated finance quizzes.' },
    { title: 'Comprehensive Portfolio', description: 'Manage and analyze your investment portfolio easily.' },
    { title: 'Top Gainers & Losers', description: 'Stay updated with market movements by viewing top gainers and losers.' },
    { title: 'Chatbot Assistance', description: 'Get help and guidance from our AI chatbot anytime.' },
    { title: 'Latest News', description: 'Access the most recent financial news to make informed trading decisions.' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 1590, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (

    <div>
      <nav>
        <div className="nav__logo">PaperLingo</div>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#benefits">Benefits</a>
          <a href="#faq">FAQ</a>
          <button onClick={() => navigate("/signin")} className="cta-button">Login</button>
        
      </nav>

      <header className="header__container">
        <div className="header__image">
          <img src={headerImage} alt="header" />
        </div>
        <div className="header__content">
          <h1 className="large">Learn Stock Trading with <span>Zero</span> Risk.</h1>
          <p>
            Discover a world of stock trading without the risk. Practice
            trading, improve your skills, and stay updated with the latest
            finance insights—all in one place. Whether you're a beginner or
            looking to refine your skills, we've got you covered.
          </p>
          <button onClick={() => navigate("/signup")} className="cta-button">Get Started</button>
        </div>
      </header>

      <section id="features" className="features-section">
        <h1>Features</h1>
        <div className="carousel-container">
          <Slider {...settings}>
            {featureData.map((feature, index) => (
              <div key={index} className="feature-slide">
                <Card className="feature-card" sx={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography variant="h2" component="h4" gutterBottom  >
                      {feature.title }
                    </Typography>
                    <Typography variant="body2">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </section>
          {/* How It Works Section */}
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

          {/* Benefits Section */}
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

          {/* FAQ Section */}
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