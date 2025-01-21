import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg'; // Ensure you have a logo image

const Header = React.forwardRef((props, ref) => {
  const { isLoggedIn, username, handleLogout } = props;

  return (
    <header className="App-header" ref={ref}>
      <div className="left-section">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <Link to="/" className="title-link">
          <h1 className="title">PHR</h1>
        </Link>
      </div>
      <div className="center-section">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button className="search-button">Search</button>
      </div>
      <div className="right-section">
        {isLoggedIn ? (
          <div className="profile">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <Link className="signin" to="/signin">Sign In</Link>
            <Link className="signup" to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
});

export default Header;