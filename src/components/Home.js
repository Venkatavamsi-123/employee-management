import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 flex flex-col justify-center items-center px-6 py-20 text-center text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl max-w-3xl p-12">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          Welcome to the <span className="text-yellow-400">Employee Management System</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-xl mx-auto">
          This system allows you to <span className="font-semibold">manage employees</span> efficiently and streamline your organizational processes.
        </p>

        <div className="mt-10 flex justify-center space-x-6">
          <button
            onClick={() => navigate('/add')}
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/about')}
            className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
