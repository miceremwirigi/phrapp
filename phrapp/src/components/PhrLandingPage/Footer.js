import React from 'react';

function Footer() {
  return (
    <footer className="App-footer">
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      <div>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;