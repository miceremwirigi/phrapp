import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PhrHomePage from './components/PhrHomePage/PhrHomePage';
import Header from './components/PhrHomePage/Header';
import Footer from './components/PhrHomePage/Footer';
import ViewHospitalVisits from './components/HospitalVisits/ViewHospitalVisits';
import AddHospitalVisitForm from './components/HospitalVisits/AddHospitalVisitForm';
import UpdateHospitalVisitForm from './components/HospitalVisits/UpdateHospitalVisitForm';
import ViewSelfMedications from './components/SelfMedications/ViewSelfMedications';
import AddSelfMedicationForm from './components/SelfMedications/AddSelfMedicationForm';
import OneHospitalVisitView from './components/HospitalVisits/OneHospitalVisitView';
import OneSelfMedicationView from './components/SelfMedications/OneSelfMedicationView';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import PrivateRoute from './components/Auth/PrivateRoute';
import Cookies from 'js-cookie';

function App() {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;

    const handleMouseEnter = () => {
      if (content) {
        content.style.paddingTop = `${header.offsetHeight}px`;
      }
    };

    const handleMouseLeave = () => {
      if (content) {
        content.style.paddingTop = '20px';
      }
    };

    if (header) {
      header.addEventListener('mouseenter', handleMouseEnter);
      header.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (header) {
        header.removeEventListener('mouseenter', handleMouseEnter);
        header.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);
        console.log('Decoded Token:', decodedToken); // Add this line
        setIsLoggedIn(true);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
        setUsername('');
      }
    } else {
      console.log('No token found'); // Add this line
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('jwt');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="App">
      <Header ref={headerRef} isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
      <div ref={contentRef} className="App-content">
        <Routes>
          <Route path="/" element={<PhrHomePage />} />
          <Route path="/view-hospital-visits" element={<PrivateRoute><ViewHospitalVisits /></PrivateRoute>} />
          <Route path="/add-hospital-visit" element={<PrivateRoute><AddHospitalVisitForm /></PrivateRoute>} />
          <Route path="/hospital-visit/:id" element={<PrivateRoute><OneHospitalVisitView /></PrivateRoute>} />
          <Route path="/update-hospital-visit/:id" element={<PrivateRoute><UpdateHospitalVisitForm /></PrivateRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/add-self-medication" element={<PrivateRoute><AddSelfMedicationForm /></PrivateRoute>} />
          <Route path="/view-self-medications" element={<PrivateRoute><ViewSelfMedications /></PrivateRoute>} />
          <Route path="/self-medication/:id" element={<PrivateRoute><OneSelfMedicationView /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
