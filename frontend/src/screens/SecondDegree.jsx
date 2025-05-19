import React, { useRef, useState, useEffect } from 'react';
import EquationCanvas from '../components/EquationCanvas';
import Nav from '../components/Nav';

const SecondDegree = () => {
  const [equationImages, setEquationImages] = useState(['', '']);
  const [solution, setSolution] = useState({});

  const handleDraw = (index, dataUrl) => {
    const updated = [...equationImages];
    updated[index] = dataUrl;
    setEquationImages(updated);
  };

  const solveEquations = () => {
    // Replace with actual model or API processing of equationImages[]
    setSolution({ x: 2.0, y: -1.5 });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Nav />
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Second Degree Linear Equation Solver
      </h1>

      {[0, 1].map((index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow">
          <EquationCanvas index={index} onDraw={handleDraw} />
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={solveEquations}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 cursor-pointer transition active:scale-95"
        >
          Calculate
        </button>
      </div>

      {solution.x !== undefined && (
        <div className="mt-6 bg-blue-100 p-4 rounded shadow text-lg">
          <h3 className="font-semibold text-xl mb-2">Solutions:</h3>
          <p><strong>X:</strong> {solution.x}</p>
          <p><strong>Y:</strong> {solution.y}</p>
        </div>
      )}
    </div>
  );
};

export default SecondDegree;
