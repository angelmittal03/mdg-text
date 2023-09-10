// src/components/Homepage.js
import React from 'react';
import './styles/Home.css';
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div className="homepage">
      <div className="content">
        <h1 className="title">Welcome to Your Socketo</h1>
        <p className="description">Engage in real-time collaboration, beautifully designed documents, and more!</p>
        <div className="buttons">
          <Link to = "/signin"> <button className="sign-in-button">Sign In</button></Link>
          <Link to = "/signup"> <button className="sign-up-button">Sign Up</button></Link>
        </div>
        <div className="features">
          <div className="feature">
            <i className="feature-icon fas fa-check-circle"></i>
            <p className="feature-text">Real-time Collaboration</p>
          </div>
          <div className="feature">
            <i className="feature-icon fas fa-paint-brush"></i>
            <p className="feature-text">Beautiful Design</p>
          </div>
          <div className="feature">
            <i className="feature-icon fas fa-rocket"></i>
            <p className="feature-text">Fast and Efficient</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
