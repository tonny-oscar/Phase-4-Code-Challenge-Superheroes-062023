import React, { useEffect, useState } from 'react';

function HeroDetails({ heroId }) {
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/heroes/${heroId}`)
      .then(response => {
        if (!response.ok) throw new Error("Hero not found");
        return response.json();
      })
      .then(data => setHero(data))
      .catch(err => setError(err.message));
  }, [heroId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{hero.name} a.k.a {hero.super_name}</h1>
      <h2>Powers:</h2>
      <ul>
        {hero.hero_powers.map(hp => (
          <li key={hp.id}>
            {hp.power.name} - {hp.strength}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeroDetails;
