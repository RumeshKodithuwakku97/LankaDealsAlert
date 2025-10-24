import React, { useState } from 'react';

const Newsletter = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h3>
          <i className="fas fa-envelope"></i>
          Get Daily Deal Alerts!
        </h3>
        <p>Never miss the best deals. We'll send you one email per day with the hottest offers.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;