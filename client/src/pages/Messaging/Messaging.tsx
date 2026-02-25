import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const Messaging: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const { user, logout } = useAuth();

    useEffect(() => {
        api.get('/messages/users').then(({ data }) => setUsers(data));
    }, []);


    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = () => api.get(`/messages/${selectedUser._id}`).then(({ data }) => setMessages(data));
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedUser]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !selectedUser) return;
        await api.post('/messages', { receiverId: selectedUser._id, content });
        setContent('');
        api.get(`/messages/${selectedUser._id}`).then(({ data }) => setMessages(data));
    };


    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 4rem)', gap: '1rem', padding: '1rem' }}>
            <div className="glass" style={{ width: '300px', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <button className="btn-primary" onClick={() => window.history.back()} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Back</button>
                    <button className="btn-primary" onClick={logout} style={{ background: 'var(--danger)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Logout</button>
                </div>
                <h3>Chats</h3>

                {users.map(u => (
                    <div
                        key={u._id}
                        onClick={() => setSelectedUser(u)}
                        style={{
                            padding: '0.75rem',
                            cursor: 'pointer',
                            background: selectedUser?._id === u._id ? 'var(--primary)' : 'transparent',
                            borderRadius: '0.5rem',
                            marginTop: '0.5rem'
                        }}
                    >
                        {u.name} ({u.role})
                    </div>
                ))}
            </div>
            <div className="glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                {selectedUser ? (
                    <>
                        <h3>Chat with {selectedUser.name}</h3>
                        <div style={{ flex: 1, overflowY: 'auto', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {messages.map((m, i) => (
                                <div key={i} style={{
                                    alignSelf: m.sender === user?.id ? 'flex-end' : 'flex-start',
                                    background: m.sender === user?.id ? 'var(--primary)' : 'var(--bg-card)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '1rem'
                                }}>
                                    {m.content}
                                </div>


                            ))}
                        </div>
                        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input style={{ flex: 1 }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type a message..." />
                            <button type="submit" className="btn-primary">Send</button>
                        </form>


                    </>
                ) : (
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Select a user to start chatting
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messaging;
