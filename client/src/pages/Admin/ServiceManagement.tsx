import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

interface Service {
    _id: string;
    name: string;
    description: string;
    price?: number;
}

const ServiceManagement: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await api.get('/admin/services');
        setServices(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/services/${editingId}`, { name, description, price: price === '' ? undefined : price });
            } else {
                await api.post('/admin/services', { name, description, price: price === '' ? undefined : price });
            }
            setName('');
            setDescription('');
            setPrice('');
            setEditingId(null);
            fetchServices();
        } catch (error) {
            alert('Error saving service');
        }
    };

    const handleEdit = (service: Service) => {
        setEditingId(service._id);
        setName(service.name);
        setDescription(service.description);
        setPrice(service.price ?? '');
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            await api.delete(`/admin/services/${id}`);
            fetchServices();
        }
    };

    return (
        <div className="glass" style={{ padding: '2rem', marginTop: '2rem' }}>
            <h2>Manage Services</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <input placeholder="Service Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Price (Optional)" value={price} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>{editingId ? 'Update Service' : 'Add Service'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setName(''); setDescription(''); setPrice(''); }} className="btn-primary" style={{ background: 'var(--secondary)' }}>Cancel</button>}
                </div>
            </form>

            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service._id}>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.price ? `$${service.price}` : 'N/A'}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEdit(service)} className="btn-primary btn-sm">Edit</button>
                                    <button onClick={() => handleDelete(service._id)} className="btn-primary btn-sm" style={{ background: 'var(--danger)' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceManagement;
