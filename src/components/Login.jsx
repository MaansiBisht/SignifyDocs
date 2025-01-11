import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log(process.env.REACT_APP_URL);
      // Send the ID token to your backend
      const response = await fetch(`${process.env.REACT_APP_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Send token in header
        },
      });

      const data = await response.json();
      console.log("Backend response:", data);
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert("Error while login . Please try again !!!");
    }
  };

  return (
    <div className="mt-32 flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-1/2"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10 sm:mb-6">Login</h2>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 sm:mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
        >
          Login
        </button>
      </form>
    </div>



  );
};

export default Login;
