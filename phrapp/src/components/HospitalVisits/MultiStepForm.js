import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddPersonForm from '../Persons/AddPersonForm';
import HospitalForm from '../Hospitals/AddHospitalForm';
import DiagnosisForm from '../Diagnoses/AddDiagnosisForm';
import AddTreatmentForm from '../Treatments/AddTreatmentForm';
import SummaryForm from './SummaryForm';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [personData, setPersonData] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [treatmentData, setTreatmentData] = useState(null);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handlePersonSubmit = async (data) => {
    try {
      const response = await axios.post('/api/persons', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPersonData(response.data.data);
      handleNextStep();
    } catch (error) {
      console.error('Error submitting person data:', error);
      window.alert('Unable to save person info');
    }
  };

  const handleHospitalSubmit = async (data) => {
    try {
      const response = await axios.post('/api/hospitals', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setHospitalData(response.data.data);
      handleNextStep();
    } catch (error) {
      console.error('Error submitting hospital data:', error);
      window.alert('Unable to save hospital info');
    }
  };

  const handleDiagnosisSubmit = async (data) => {
    try {
      const response = await axios.post('/api/diagnoses', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setDiagnosisData(response.data.data);
      handleNextStep();
    } catch (error) {
      console.error('Error submitting diagnosis data:', error);
      window.alert('Unable to save diagnosis info');
    }
  };

  const handleTreatmentSubmit = async (data) => {
    try {
      const response = await axios.post('/api/treatments', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTreatmentData(response.data.data);
      handleNextStep();
    } catch (error) {
      console.error('Error submitting treatment data:', error);
      window.alert('Unable to save treatment info');
    }
  };

  const handleSummarySubmit = async (data) => {
    const hospitalVisitEntry = {
      personId: personData.id,
      hospitalId: hospitalData.id,
      diagnosisId: diagnosisData.id,
      treatmentId: treatmentData.id,
      ...data,
    };

    try {
      const response = await axios.post('/api/hospitalvisitentries', hospitalVisitEntry);
      console.log('Hospital Visit Entry created successfully:', response.data);
      navigate('/view-hospital-visits'); // Redirect to ViewHospitalVisits on success
    } catch (error) {
      console.error('Error submitting hospital visit entry:', error);
      window.alert('Unable to save hospital visit entry');
    }
  };

  return (
    <div>
      {step === 1 && <AddPersonForm onSubmit={handlePersonSubmit} />}
      {step === 2 && <HospitalForm onSubmit={handleHospitalSubmit} onPrevious={handlePreviousStep} />}
      {step === 3 && <DiagnosisForm personId={personData?.id} onSubmit={handleDiagnosisSubmit} onPrevious={handlePreviousStep} />}
      {step === 4 && <AddTreatmentForm onSubmit={handleTreatmentSubmit} onPrevious={handlePreviousStep} />}
      {step === 5 && personData && hospitalData && diagnosisData && treatmentData && (
        <SummaryForm
          personData={personData}
          hospitalData={hospitalData}
          diagnosisData={diagnosisData}
          treatmentData={treatmentData}
          onSubmit={handleSummarySubmit}
          onPrevious={handlePreviousStep}
        />
      )}
    </div>
  );
};

export default MultiStepForm;