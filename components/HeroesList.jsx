import React, { useEffect, useState } from 'react';

function HeroesList() {
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5555/heroes')
      .then(response => response.json())
      .then(data => setHeroes(data))
      .catch(err => setError('Failed to fetch heroes'));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Heroes</h1>
      <ul>
        {heroes.map(hero => (
          <li key={hero.id}>
            {hero.name} a.k.a {hero.super_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeroesList;
