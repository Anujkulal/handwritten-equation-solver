// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//     setPrediction(null);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://localhost:5000/predict', formData);
//       console.log(res.data.predicted_symbol);
      
//       setPrediction(res.data.predicted_symbol);
//     } catch (err) {
//       alert('Error: ' + err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Math Symbol Predictor</h2>
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload}>Predict</button>
//       {prediction && <h3>Predicted Symbol: {prediction}</h3>}
//     </div>
//   );
// }

// export default App;









// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//     setImageUrl(null);
//     setError(null);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://localhost:5000/predict', formData, {
//         responseType: 'blob'  // Important to get image as blob
//       });

//       const imageBlob = res.data;
//       const imageObjectUrl = URL.createObjectURL(imageBlob);
//       setImageUrl(imageObjectUrl);
//     } catch (err) {
//       const errMsg = err.response?.data?.error || err.message;
//       setError(errMsg);
//     }
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Math Symbol Predictor</h2>
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload} style={{ marginLeft: 10 }}>Predict</button>

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {imageUrl && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Prediction Result:</h3>
//           <img src={imageUrl} alt="Predicted Symbol" style={{ maxWidth: '300px', border: '1px solid #ccc' }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//     setImageUrl(null);
//     setError(null);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     setLoading(true);
//     setError(null);
//     setImageUrl(null);

//     try {
//       const res = await axios.post('http://localhost:5000/predict', formData, {
//         responseType: 'blob',
//       });

//       const imageBlob = res.data;
//       const imageObjectUrl = URL.createObjectURL(imageBlob);
//       console.log("imageBlob", imageBlob);
//       console.log("imageObjectUrl",imageObjectUrl);
      
//       setImageUrl(imageObjectUrl);
//     } catch (err) {
//       const errMsg = err.response?.data?.error || err.message;
//       setError(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl text-center space-y-6">
//         <h2 className="text-2xl font-bold text-gray-800">Math Symbol Predictor</h2>

//         <input
//           type="file"
//           onChange={handleChange}
//           className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           onClick={handleUpload}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
//           disabled={loading || !file}
//         >
//           {loading ? 'Predicting...' : 'Predict'}
//         </button>

//         {error && <p className="text-red-600 font-medium">{error}</p>}

//         {imageUrl && (
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">Prediction Result:</h3>
//             <img
//               src={imageUrl}
//               alt="Predicted Symbol"
//               className="mx-auto border border-gray-300 rounded-lg shadow-md max-h-80 object-contain"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;












import React, { useState } from 'react';
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
