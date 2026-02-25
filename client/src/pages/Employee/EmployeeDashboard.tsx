import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const EmployeeDashboard: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const { logout } = useAuth();

    useEffect(() => {
        api.get('/employee/projects').then(({ data }) => setProjects(data));
    }, []);

    const updateStatus = async (id: string, status: string) => {
        await api.put(`/employee/projects/${id}/status`, { status });
        api.get('/employee/projects').then(({ data }) => setProjects(data));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Employee Portal</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary" onClick={() => window.location.href = '/employee/messages'}>Messages</button>
                    <button className="btn-primary" onClick={() => window.location.href = '/employee/profile'}>Profile</button>
                    <button className="btn-primary" onClick={logout} style={{ background: 'var(--danger)' }}>Logout</button>
                </div>

            </div>
            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                {projects.length > 0 ? (
                    projects.map((p) => (
                        <div key={p._id} className="glass" style={{ padding: '1.5rem' }}>
                            <h2>{p.name}</h2>
                            <p>{p.description}</p>
                            <p><strong>Client:</strong> {p.client?.name}</p>
                            <p><strong>Created:</strong> {new Date(p.createdAt).toLocaleDateString()}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Status:</strong>
                                <select
                                    value={p.status}
                                    onChange={(e) => updateStatus(p._id, e.target.value)}
                                    style={{ marginLeft: '1rem', padding: '0.5rem', background: 'var(--bg-card)', color: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem' }}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>No projects assigned yet.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default EmployeeDashboard;
