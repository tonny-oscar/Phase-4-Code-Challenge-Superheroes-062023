import React, { useState } from 'react';

function UpdatePowerForm({ powerId }) {
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = () => {
    fetch(`http://localhost:5555/powers/${powerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.errors.join(', '));
          });
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage(`Updated Power: ${data.name}`);
        setError('');
      })
      .catch(err => {
        setError(err.message);
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <h2>Update Power</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Update description"
      />
      <button onClick={handleUpdate}>Update</button>

      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default UpdatePowerForm;
