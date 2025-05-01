import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction(null);
    setImageBase64(null);  // Clear any previous prediction
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);

      // Handle the response which contains the predicted label and image in base64
      setPrediction(res.data.predicted_label);
      setImageBase64(res.data.image); // Set the base64-encoded image for display

    } catch (err) {
      alert('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center bg-gray-200'>

    <div className="container mx-auto p-4 flex flex-col items-center justify-center bg-gray-50 h-fit w-fit rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Math Symbol Predictor</h2>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleChange}
          className="bg-blue-200 p-2 rounded cursor-pointer hover:bg-blue-300 transition duration-200"
        />
      </div>
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700 transition duration-200"
      >
        Predict
      </button>

      {prediction && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Predicted Symbol: {prediction}</h3>
          <div className="mt-4">
            <img
              src={`data:image/png;base64,${imageBase64}`}
              alt="Predicted symbol"
              className="max-w-full h-auto border border-green-300 mt-4"
            />
          </div>
        </div>
      )}
    </div> </div>
  );
}

export default App;
