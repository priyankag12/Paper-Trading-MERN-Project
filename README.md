# Paper Trading Platform (Gamified with Quizzes and AI Chatbot)

This project is a **paper trading platform** designed to help users simulate stock market trading in a gamified environment. Users can practice their trading skills without risking real money, take quizzes to enhance their learning, and interact with an AI-powered chatbot for assistance and market insights.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Future Enhancements](#future-enhancements)

## Features

1. **Paper Trading Simulation**:
   - Buy and sell stocks with virtual money.
   - Real-time market data using the Alpha Vantage API.
   - Track stock performance with a dashboard.

2. **Gamified Quizzes**:
   - Take quizzes related to stock market concepts.
   - Earn virtual currency for correct answers to use in paper trading.

3. **AI Chatbot**:
   - An AI-powered chatbot helps users with trading tips and stock information.
   - Real-time responses to user queries about stock performance and financial terms.

4. **Leaderboard**:
   - Displays top users based on quiz scores and virtual portfolio performance.

5. **User Authentication**:
   - Secure user login and signup using JWT authentication.
   - Users can track their own trading history and quiz performance.

## Tech Stack

### Frontend:
- **React.js** with **MUI (Material UI)** for UI components.
- **React Router** for navigation.
- **Axios** for API calls.

### Backend:
- **Node.js** with **Express.js** for building REST APIs.
- **MongoDB** with **Mongoose** for database management.
- **Alpha Vantage API** for fetching real-time stock data.
- **JWT (JSON Web Tokens)** for secure user authentication.

### Additional Tools:
- **AI Chatbot**: Integrated using a custom AI model or a third-party service.
- **Quizzes**: Gamified quiz functionality implemented using custom algorithms.
- **Deployment**: Deployed on platforms like Heroku or AWS.

## Installation

### Prerequisites:
- Node.js
- MongoDB
- Alpha Vantage API Key (obtainable from [Alpha Vantage](https://www.alphavantage.co))

### Steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/paper-trading-platform.git
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables in the backend (`.env` file):
   ```
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your Secret Key>
   ALPHA_VANTAGE_API_KEY=<Your Alpha Vantage API Key>
   ```

4. Run the backend:
   ```
   cd backend
   npm start
   ```

5. Run the frontend:
   ```
   cd frontend
   npm start
   ```

## Frontend Features

- **Ticker Search**: A search component that allows users to search for stock tickers.
- **Trading Dashboard**: Displays stock details, transactions, and performance.
- **Quizzes**: Allows users to take quizzes on stock market concepts.
- **Chatbot**: An interactive chatbot that provides answers related to stocks and trading.
- **Leaderboard**: Displays top traders and quiz performers.

## Backend Features

- **User Authentication**: Secure signup and login using JWT tokens.
- **Stock Transactions**: Manage buy/sell transactions for stocks.
- **Quiz System**: Gamified quizzes with real-time scoring.
- **AI Chatbot**: Interactive chatbot to assist with stock trading questions.

## Future Enhancements

1. **Portfolio Management**:
   - Allow users to see detailed portfolio analytics and profit/loss reports.

2. **Live Data Integration**:
   - Implement real-time stock data updates using WebSockets or other live data streams.

3. **Social Features**:
   - Add a social feed where users can share their trades, quizzes, and strategies.

4. **AI-Powered Recommendations**:
   - Enhance the chatbot with AI-based stock recommendations based on market trends and user preferences.

---

This project is aimed at helping users learn and practice stock trading in a fun, educational way. 

---
