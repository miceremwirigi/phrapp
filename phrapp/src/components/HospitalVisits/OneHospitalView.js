import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

const OneHospitalView = () => {
  const { id } = useParams();
  const [hospitalVisit, setHospitalVisit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalVisit = async () => {
      try {
        const response = await axios.get(`/api/hospitalvisitentries/${id}`);
        setHospitalVisit(response.data);
      } catch (error) {
        console.error('Error fetching hospital visit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalVisit();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!hospitalVisit) {
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