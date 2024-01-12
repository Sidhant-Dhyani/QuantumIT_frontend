import React, { useEffect, useState } from 'react';
import './Data.css'; // Import your CSS file
import axios from 'axios';
import { format } from 'date-fns';
import { BASE_URL } from '../../Config';

const Data = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/data/`);
            console.log(response.data);

            if (response.data) {
                const formattedData = response.data.map((user) => ({
                    ...user,
                    dob: format(new Date(user.dob), 'yyyy-MM-dd'),
                }));
                setUserData(formattedData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="data-container">
            <h1 className="data-heading">All Data</h1>
            <table className="data-table">
                <thead>
                    <tr key={1}>
                        <th className="table-header">SNo.</th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Email</th>
                        <th className="table-header">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Data;