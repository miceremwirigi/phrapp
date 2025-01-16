import React from 'react';
// import logo from './logo.svg'; // Adjust the path as necessary

function Header() {
  return (
    <header className="header">
      <h1 className="title">Welcome to PhrLandingPage</h1>
      <input type="text" className="search-bar" placeholder="Search..." />
      <div className="profile">
        <p>User Profile</p>
      </div>
    </header>
  );
}

export default Header;