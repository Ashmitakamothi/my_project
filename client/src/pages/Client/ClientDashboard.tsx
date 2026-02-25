import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const ClientDashboard: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState('');
    const [description, setDescription] = useState('');
    const { logout } = useAuth();

    useEffect(() => {
        api.get('/client/projects').then(({ data }) => setProjects(data));
        api.get('/client/services').then(({ data }) => setServices(data));
    }, []);

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService) return alert('Please select a service');
        await api.post('/client/service-request', { service: selectedService, description });
        setSelectedService(''); setDescription('');
        alert('Service requested successfully!');
    };


    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Client Portal</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary" onClick={() => window.location.href = '/client/messages'}>Messages</button>
                    <button className="btn-primary" onClick={() => window.location.href = '/client/profile'}>Profile</button>
                    <button className="btn-primary" onClick={logout} style={{ background: 'var(--danger)' }}>Logout</button>
                </div>

            </div>

            <div className="glass" style={{ padding: '1.5rem', marginTop: '2rem' }}>
                <h2>Request New Service</h2>
                <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <option value="" disabled style={{ background: '#222' }}>Select a Service</option>
                        {services.map(s => (
                            <option key={s._id} value={s._id} style={{ background: '#222' }}>{s.name}</option>
                        ))}
                    </select>
                    <textarea placeholder="Tell us more about your needs..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />

                    <button type="submit" className="btn-primary">Submit Request</button>
                </form>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h2>Your Projects</h2>
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    {projects.map((p) => (
                        <div key={p._id} className="glass" style={{ padding: '1rem' }}>
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                            <p><strong>Status:</strong> {p.status}</p>
                            <p><strong>Created:</strong> {new Date(p.createdAt).toLocaleDateString()}</p>
                            <p><strong>Assigned:</strong> {p.assignedEmployees.map((e: any) => e.name).join(', ') || 'None yet'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
