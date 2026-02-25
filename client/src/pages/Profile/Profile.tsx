import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put('/auth/profile', { name, email, password });
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', maxWidth: '500px', marginBottom: '1rem' }}>
                <button className="btn-primary" onClick={() => window.history.back()}>Back</button>
                <button className="btn-primary" onClick={logout} style={{ background: 'var(--danger)', marginLeft: '1rem' }}>Logout</button>
            </div>
            <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
                <h1>Edit Profile</h1>

                {message && <p style={{ margin: '1rem 0', color: 'var(--success)' }}>{message}</p>}
                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label>New Password (leave blank to keep current)</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <button type="submit" className="btn-primary">Update Profile</button>

                </form>
            </div>

        </div>
    );
};

export default Profile;
