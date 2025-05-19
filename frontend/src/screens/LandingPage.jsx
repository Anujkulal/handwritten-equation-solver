import React from 'react';
import { Link } from 'react-router-dom';
import equationIllustration from '../assets/second-deg.png';
import drawingIllustration from '../assets/third-deg.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 text-blue-800">Welcome to the Equation Solver</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Solve handwritten third-degree linear equations with ease. Just draw your equations, hit calculate, and get instant solutions.
        </p>
        
        <div className=" flex gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 cursor-pointer transition active:scale-95"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 cursor-pointer transition active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          <img src={equationIllustration} alt="Equation solving" className="rounded-lg shadow-lg" />
        </div>
        <div className="text-left space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Draw Equations Easily</h2>
          <p className="text-gray-600">
            Our intuitive canvas lets you draw equations just like you would on paper. No need to type complex syntax—just write and solve.
          </p>
        </div>

        <div className="text-left space-y-4 order-last md:order-none">
          <h2 className="text-2xl font-bold text-gray-800">Real-Time Solutions</h2>
          <p className="text-gray-600">
            The system processes your handwriting and solves the equation instantly, giving you accurate values for X, Y, and Z.
          </p>
        </div>
        <div>
          <img src={drawingIllustration} alt="Drawing on canvas" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
