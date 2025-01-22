import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

const OneHospitalView = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOneHospital = async () => {
      try {
        const response = await axios.get(`/api/hospitals/${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error('Error fetching hospital visit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOneHospital();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!hospital) {
    return <div>No hospital visit found</div>;
  }

  return (
    <div>
      <h2>Hospital Visit Details</h2>
      {/* Render hospital visit details here */}
    </div>
  );
};

export default OneHospitalView;