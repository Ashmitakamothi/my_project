import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

const ProjectManagement: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        api.get('/admin/projects').then(({ data }) => setProjects(data));
        api.get('/admin/users').then(({ data }) => setUsers(data));
    }, []);

    const handleAssign = async (projectId: string, employeeIds: string[]) => {
        await api.put(`/admin/projects/${projectId}/assign`, { employeeIds });
        api.get('/admin/projects').then(({ data }) => setProjects(data));
    };

    return (
        <div className="glass" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <h2>Manage Projects</h2>
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                {projects.map((p) => (
                    <div key={p._id} className="glass" style={{ padding: '1rem' }}>
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <p><strong>Client:</strong> {p.client?.name}</p>
                        <p><strong>Status:</strong> {p.status}</p>
                        <p><strong>Created:</strong> {new Date(p.createdAt).toLocaleDateString()}</p>
                        <div style={{ marginTop: '0.5rem' }}>
                            <strong>Assign Employees:</strong>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                {users.filter(u => u.role.toUpperCase() === 'EMPLOYEE').map(e => (
                                    <label key={e._id} style={{ fontSize: '0.9rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={p.assignedEmployees.some((ae: any) => ae._id === e._id)}
                                            onChange={(evt) => {
                                                const currentIds = p.assignedEmployees.map((ae: any) => ae._id);
                                                const newIds = evt.target.checked
                                                    ? [...currentIds, e._id]
                                                    : currentIds.filter((id: string) => id !== e._id);
                                                handleAssign(p._id, newIds);
                                            }}
                                        /> {e.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManagement;
