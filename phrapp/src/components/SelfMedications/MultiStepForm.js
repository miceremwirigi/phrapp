import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddPersonForm from '../Persons/AddPersonForm';
import AddDiagnosisForm from '../Diagnoses/AddDiagnosisForm';
import AddTreatmentForm from '../Treatments/AddTreatmentForm';
import SummaryForm from './SummaryForm';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [personData, setPersonData] = useState(null);
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
    const selfMedicationEntry = {
      personId: personData.id,
      diagnosisId: diagnosisData.id,
      treatmentId: treatmentData.id,
      ...data,
    };

    try {
      const response = await axios.post('/api/selfmedicationentries', selfMedicationEntry);
      console.log('Self Medication Entry created successfully:', response.data);
      navigate('/view-self-medications'); // Redirect to ViewSelfMedications on success
    } catch (error) {
      console.error('Error submitting self medication entry:', error);
      window.alert('Unable to save self medication entry');
    }
  };

  return (
    <div>
      {step === 1 && <AddPersonForm onSubmit={handlePersonSubmit} />}
      {step === 2 && <AddDiagnosisForm personId={personData?.id} onSubmit={handleDiagnosisSubmit} onPrevious={handlePreviousStep} />}
      {step === 3 && <AddTreatmentForm onSubmit={handleTreatmentSubmit} onPrevious={handlePreviousStep} />}
      {step === 4 && personData && diagnosisData && treatmentData && (
        <SummaryForm
          personData={personData}
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