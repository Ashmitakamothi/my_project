import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

const ServiceRequests: React.FC = () => {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        api.get('/admin/service-requests').then(({ data }) => setRequests(data));
    }, []);

    const handleApprove = async (id: string) => {
        await api.put(`/admin/service-requests/${id}/approve`);
        api.get('/admin/service-requests').then(({ data }) => setRequests(data));
    };

    return (
        <div className="glass" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <h2>Service Requests</h2>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                {requests.map((r) => (
                    <div key={r._id} className="glass" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3>{r.service?.name}</h3>

                            <p>{r.description}</p>
                            <p>Requested by: {r.client?.name}</p>
                            <p>Status: <span style={{ color: r.status === 'PENDING' ? 'var(--accent)' : 'var(--success)' }}>{r.status}</span></p>
                        </div>
                        {r.status === 'PENDING' && (
                            <button className="btn-primary" onClick={() => handleApprove(r._id)}>Approve</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceRequests;
