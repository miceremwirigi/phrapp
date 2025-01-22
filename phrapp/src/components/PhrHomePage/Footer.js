import React from 'react';

function Footer() {
  console.log('Footer rendered');
  return (
    <footer className="App-footer">
      <p>&copy; {new Date().getFullYear()} PHR. All rights reserved.</p>
      <div>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;