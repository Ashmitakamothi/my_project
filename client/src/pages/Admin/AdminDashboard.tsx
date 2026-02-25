import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

import UserManagement from './UserManagement';
import ProjectManagement from './ProjectManagement';
import ServiceRequests from './ServiceRequests';
import ServiceManagement from './ServiceManagement';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [view, setView] = useState<'stats' | 'users' | 'projects' | 'requests' | 'services'>('stats');

    const { logout } = useAuth();

    useEffect(() => {
        api.get('/admin/stats').then(({ data }) => setStats(data));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Portal</h1>
                <button className="btn-primary" onClick={logout} style={{ background: 'var(--danger)' }}>Logout</button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
                <button className="btn-primary" onClick={() => setView('stats')}>Overview</button>
                <button className="btn-primary" onClick={() => setView('users')}>Users</button>
                <button className="btn-primary" onClick={() => setView('projects')}>Projects</button>
                <button className="btn-primary" onClick={() => setView('requests')}>Requests</button>
                <button className="btn-primary" onClick={() => setView('services')}>Services</button>
                <button className="btn-primary" onClick={() => window.location.href = '/admin/messages'}>Messages</button>
                <button className="btn-primary" onClick={() => window.location.href = '/admin/profile'}>Profile</button>
            </div>

            {view === 'stats' && stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    <div className="glass" style={{ padding: '1.5rem' }}><h3>Employees</h3><p style={{ fontSize: '2rem' }}>{stats.employeesCount}</p></div>
                    <div className="glass" style={{ padding: '1.5rem' }}><h3>Clients</h3><p style={{ fontSize: '2rem' }}>{stats.clientsCount}</p></div>
                    <div className="glass" style={{ padding: '1.5rem' }}><h3>Projects</h3><p style={{ fontSize: '2rem' }}>{stats.projectsCount}</p></div>
                    <div className="glass" style={{ padding: '1.5rem' }}><h3>Pending Requests</h3><p style={{ fontSize: '2rem' }}>{stats.pendingRequestsCount}</p></div>
                </div>
            )}

            {view === 'users' && <UserManagement />}
            {view === 'projects' && <ProjectManagement />}
            {view === 'requests' && <ServiceRequests />}
            {view === 'services' && <ServiceManagement />}
        </div>
    );
};

export default AdminDashboard;

