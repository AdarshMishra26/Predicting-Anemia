import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    axios.post('http://localhost:8000/api/predict/', formData)
      .then(response => {
        setPrediction(response.data.prediction);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Anaemia Detection</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {image && (
        <div>
          <h2>Image Preview</h2>
          <img src={URL.createObjectURL(image)} alt="Preview" />
        </div>
      )}

      {loading && (
        <div>
          <h2>Loading...</h2>
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      )}

      {prediction !== null && !loading && (
        <div>
          <h2>Prediction</h2>
          <p>{prediction === 0 ? 'Normal' : 'Anaemia'}</p>
        </div>
      )}

      {error && !loading && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
