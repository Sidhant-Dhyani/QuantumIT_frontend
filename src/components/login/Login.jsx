
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { BASE_URL } from '../../Config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
            if (response.data) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                dispatch(login(token));
                console.log('Logged in successfully!!');
                navigate('/');
            }
        } catch (error) {
            console.log('Error logging in: ', error);
        }
    }

    return (
        <div className="login_container">
            <h2 className="login_heading">Login</h2>
            <form onSubmit={handleSubmit} className="login_form">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="login_input"
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="login_input"
                    placeholder='Password'
                />

                <button type="submit" className="login_button">Login</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    );
}

export default Login;
