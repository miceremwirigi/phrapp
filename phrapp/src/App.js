import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './components/PhrHomePage/Header';
import Footer from './components/PhrHomePage/Footer';
import PhrHomePage from './components/PhrHomePage/PhrHomePage';
import PrivateRoute from './components/PrivateRoute';
import ViewHospitalVisits from './components/HospitalVisits/ViewHospitalVisits';
import AddHospitalVisitForm from './components/HospitalVisits/AddHospitalVisitForm';
import OneHospitalVisitView from './components/HospitalVisits/OneHospitalVisitView';
import UpdateHospitalVisitForm from './components/HospitalVisits/UpdateHospitalVisitForm';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import AddSelfMedicationForm from './components/SelfMedications/AddSelfMedicationForm';
import ViewSelfMedications from './components/SelfMedications/ViewSelfMedications';
import OneSelfMedicationView from './components/SelfMedications/OneSelfMedicationView';
import OnePersonView from './components/Persons/OnePersonView';
import ViewHospitals from './components/Hospitals/ViewHospitals';
import ViewHeartRateEntries from './components/HeartRateMonitor/ViewHeartRateEntries';
import axios from 'axios';
import './App.css';
import NotFound from './components/NotFound';
import Loader from './components/Loader';

const AppContent = ({ isLoggedIn, setIsLoggedIn, setUsername, personId }) => {
  return (
    <div className="content-container">
      <Routes>
        <Route path="/" element={<PhrHomePage />} />
        <Route 
          path="/view-hospital-visits" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ViewHospitalVisits isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-hospital-visit" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddHospitalVisitForm isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/hospital-visit/:id" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <OneHospitalVisitView isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/update-hospital-visit/:id" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <UpdateHospitalVisitForm isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/signin" 
          element={<Signin setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} 
        />
        <Route 
          path="/add-self-medication" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddSelfMedicationForm isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/view-self-medications" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ViewSelfMedications isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/self-medication/:id" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <OneSelfMedicationView isLoggedIn={isLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/my-details" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <OnePersonView personId={personId} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/view-hospitals" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ViewHospitals />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/view-heart-rate-entries" 
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ViewHeartRateEntries />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [personId, setPersonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/check-auth`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response); // Log the response to debug
        if (response.data && response.data.data.personId && response.data.data.username) {
          setIsLoggedIn(true);
          setUsername(response.data.data.username);
          setPersonId(response.data.data.personId);
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          console.error('Invalid response structure:', response.data);
          setIsLoggedIn(false);
          setUsername('');
          setPersonId(null);
          localStorage.removeItem('isLoggedIn');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoggedIn(false);
        setUsername('');
        setPersonId(null);
        localStorage.removeItem('isLoggedIn');
      } finally {
        setLoading(false);
      }
    };

    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('jwt');
    setIsLoggedIn(false);
    setUsername('');
    setPersonId(null);
    localStorage.removeItem('isLoggedIn');
    navigate('/signin');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Header ref={headerRef} isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
      <div ref={contentRef} className="App-content">
        <AppContent 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          setUsername={setUsername} 
          personId={personId} 
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
