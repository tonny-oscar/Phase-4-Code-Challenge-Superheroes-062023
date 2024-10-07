import React, { useState } from 'react';

function CreateHeroPowerForm() {
  const [heroId, setHeroId] = useState('');
  const [powerId, setPowerId] = useState('');
  const [strength, setStrength] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    fetch('http://localhost:5555/hero_powers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hero_id: heroId, power_id: powerId, strength }),
    })
      .then(response => response.json())
      .then(data => {
        setSuccessMessage(`Assigned ${data.power.name} to ${data.hero.super_name}`);
        setError('');
      })
      .catch(err => {
        setError('Failed to assign power');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <h2>Assign Power to Hero</h2>
      <input
        type="text"
        value={heroId}
        onChange={(e) => setHeroId(e.target.value)}
        placeholder="Hero ID"
      />
      <input
        type="text"
        value={powerId}
        onChange={(e) => setPowerId(e.target.value)}
        placeholder="Power ID"
      />
      <input
        type="text"
        value={strength}
        onChange={(e) => setStrength(e.target.value)}
        placeholder="Strength (Strong, Weak, Average)"
      />
      <button onClick={handleCreate}>Assign Power</button>

      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default CreateHeroPowerForm;
