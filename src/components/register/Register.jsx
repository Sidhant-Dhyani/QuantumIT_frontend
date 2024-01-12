import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Config'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice'
import './Register.css'

const Register = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post(`${BASE_URL}/api/auth/register`, formData);
            console.log(response);
            if (response.data) {
                const token = response.data.token;
                console.log(token);
                localStorage.setItem('token', token);
                dispatch(login(token));
                console.log('User created successfully');
            }
        } catch (error) {
            console.log('Error in submitting form: ', error);
        }
    }

    return (
        <div className='registration_form_component'>
            <h1>
                Registration Form
            </h1>
            <form className="registration_form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form_input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form_input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='Email'
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form_input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder='Password'
                />
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form_input"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    placeholder='Date of Birth'
                />

                <button type="submit" className="form_button">
                    Register
                </button>
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    )
}

export default Register