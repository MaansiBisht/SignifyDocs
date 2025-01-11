import React from 'react';
import useUserRole from '../hooks/useUserRole';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
    const { user, role } = useUserRole();

    if (!user) {
        return <p>Please log in.</p>;
    }

    return (
        <div>
            <h1 className='flex justify-center mt-2'> Welcome, {user.email}</h1>
            {role === 'admin' && <AdminDashboard user={user} />}
            {role === 'user' && <UserDashboard user={user} />}
        </div>
    );
};

export default Dashboard;

