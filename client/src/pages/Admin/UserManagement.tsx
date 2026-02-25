import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPLOYEE');
    const [clientCompany, setClientCompany] = useState('');

    const fetchUsers = () => api.get('/admin/users').then(({ data }) => setUsers(data));

    useEffect(() => { fetchUsers(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.post('/admin/users', { name, email, password, role, clientCompany });
        setName(''); setEmail(''); setPassword(''); setClientCompany('');
        fetchUsers();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this user?')) return;
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
    };

    return (
        <div className="glass" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <h2>Manage Users</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' }}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-card)', color: 'white' }}>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="CLIENT">Client</option>
                </select>
                {role === 'CLIENT' && <input placeholder="Company Name" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} required />}
                <button type="submit" className="btn-primary">Add User</button>
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Company</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '1rem' }}>{u.name}</td>
                            <td style={{ padding: '1rem' }}>{u.email}</td>
                            <td style={{ padding: '1rem' }}>{u.role}</td>
                            <td style={{ padding: '1rem' }}>{u.clientCompany || '-'}</td>

                            <td style={{ padding: '1rem' }}><button onClick={() => handleDelete(u._id)} style={{ color: 'var(--danger)' }}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default UserManagement;
