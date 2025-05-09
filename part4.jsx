// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const calculateAverage = async () => {
    try {
      const numArr = numbers.split(',').map(num => parseFloat(num.trim()));
      if (numArr.some(isNaN)) {
        setError('Invalid input: Please enter comma-separated numbers.');
        setAverage(null);
        return;
      }
      setError('');

      const response = await axios.post('http://localhost:3001/average', { numbers: numArr });
      setAverage(response.data.average);
    } catch (err) {
      setError('Error calculating average.');
      setAverage(null);
    }
  };

  return (
    
      
        
          <input
            type="text"
            placeholder="Enter comma-separated numbers"
            value={numbers}
            onChange={e => setNumbers(e.target.value)}
          />
          <button onClick={calculateAverage}>Calculate Average</button>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {average !== null && <p>Average: {average}</p>}
      
    
  );
}

export default App;