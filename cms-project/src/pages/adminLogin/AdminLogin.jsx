import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import {useDispatch} from "react-redux";
import { login } from '../../Features/auth';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const backendLink = useSelector((state) => state.prod.link);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log("name is",name + "value is ",value)
    };

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent the default form submission
        setError('');  // Reset error before attempting login
        try {
            setIsLoading(true);
            const response = await axios.post(`${backendLink}/api/admin/login`, formData, { withCredentials: true });
            // dispatch(login())
            alert(response.data.message);
            // Navigate to admin dashboard after successful login
            navigate('/admin-dashboard');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials and try again.');  // Set error message
        } finally {
            setIsLoading(false);  // Reset loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;