import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons for visibility toggle
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            setError("Passwords don't match!");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken(); // Get Firebase ID token

            // Send the ID token and additional user data to your backend
            const response = await fetch(`${process.env.REACT_APP_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`, // Send token in header
                },
                body: JSON.stringify({
                    role,
                    name
                }),
            });

            const data = await response.json();
            console.log("Backend response:", data);

            setEmail('');
            setPassword('');
            setRePassword('');
            setRole('user'); // Reset role
            setError('');
            navigate('/login');
        } catch (err) {
            console.log(err);
            alert("Error while registeration . Please try again !!!");
        }
    };

    return (
        <div className="mt-12 flex items-center justify-center bg-gray-50">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <AiFillEyeInvisible size={24} />
                        ) : (
                            <AiFillEye size={24} />
                        )}
                    </button>
                </div>

                <div className="mb-6 relative">
                    <input
                        type={showRePassword ? 'text' : 'password'}
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Re-type Password"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowRePassword(!showRePassword)}
                    >
                        {showRePassword ? (
                            <AiFillEyeInvisible size={24} />
                        ) : (
                            <AiFillEye size={24} />
                        )}
                    </button>
                </div>

                {/* User Role Selection */}
                <div className="mb-6">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => setRole('user')}
                        />
                        User
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                        />
                        Admin
                    </label>
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
