import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader';

const OnePersonView = ({ personId }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/persons/${personId}`);
        setPerson(response.data.data);
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [personId]);

  if (loading) {
    return <Loader />;
  }

  if (!person) {
    return <div>No person found</div>;
  }

  return (
    <div className="details-view">
      <h2>Person Details</h2>
      <p><strong>ID:</strong> {person.id}</p>
      <p><strong>First Name:</strong> {person.first_name}</p>
      <p><strong>Last Name:</strong> {person.last_name}</p>
      <p><strong>Date of Birth:</strong> {new Date(person.date_of_birth).toLocaleDateString()}</p>
      <p><strong>Is Dependent:</strong> {person.is_dependent ? 'Yes' : 'No'}</p>
      {person.guardian_id && (
        <p><strong>Guardian ID:</strong> {person.guardian_id}</p>
      )}
      {person.dependants && person.dependants.length > 0 && (
        <div>
          <h3>Dependants</h3>
          <ul>
            {person.dependants.map((dependant) => (
              <li key={dependant.id}>
                {dependant.first_name} {dependant.last_name} (ID: {dependant.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OnePersonView;