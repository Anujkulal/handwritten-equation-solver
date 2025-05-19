import React, { useRef, useState, useEffect } from "react";
import EquationCanvas from "../components/EquationCanvas";
import Nav from "../components/Nav";

const ThirdDegree = () => {
  const [equationImages, setEquationImages] = useState<string[]>(["", "", ""]);
  const [solution, setSolution] = useState<{
    x?: number;
    y?: number;
    z?: number;
  }>({});

  const handleDraw = (index: number, dataUrl: string) => {
    const updated = [...equationImages];
    updated[index] = dataUrl;
    setEquationImages(updated);
  };

  const solveEquations = () => {
    // Replace with actual model or API processing of equationImages[]
    setSolution({ x: 1.111, y: -0.111, z: 0.777 });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Nav />
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Third Degree Linear Equation Solver
      </h1>

      {[0, 1, 2].map((index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-xl shadow">
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
        <div className="mt-6 bg-green-200 p-4 rounded-xl shadow text-lg">
          <h3 className="font-semibold text-xl mb-2">Solutions:</h3>
          <p>
            <strong>X:</strong> {solution.x}
          </p>
          <p>
            <strong>Y:</strong> {solution.y}
          </p>
          <p>
            <strong>Z:</strong> {solution.z}
          </p>
        </div>
      )}
    </div>
  );
};

export default ThirdDegree;
