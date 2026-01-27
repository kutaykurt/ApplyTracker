import React, { useState, useEffect } from 'react';
import { PlusCircle, Link as LinkIcon } from 'lucide-react';

export default function ApplicationForm({ onAdd, defaultDate }) {
    const [formData, setFormData] = useState({
        company: '',
        contact: '',
        jobTitle: '',
        link: '',
        date: defaultDate || new Date().toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    });

    useEffect(() => {
        if (defaultDate) {
            setFormData(prev => ({ ...prev, date: defaultDate }));
        }
    }, [defaultDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.company || !formData.jobTitle) return;

        onAdd({
            ...formData,
            id: Date.now().toString()
        });

        setFormData({
            company: '',
            contact: '',
            jobTitle: '',
            link: '',
            date: new Date().toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        });
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel form-container fade-in">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Neue Bewerbung hinzufügen</h3>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Unternehmen"
                    className="input-field"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Ansprechperson"
                    className="input-field"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Jobtitel"
                    className="input-field"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    required
                />
            </div>
            <div className="input-group" style={{ gridTemplateColumns: '1fr 150px' }}>
                <div style={{ position: 'relative' }}>
                    <input
                        type="url"
                        placeholder="Link zum Stellenangebot (https://...)"
                        className="input-field"
                        style={{ paddingLeft: '2.5rem' }}
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                    <LinkIcon
                        size={18}
                        style={{
                            position: 'absolute',
                            left: '0.8rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)'
                        }}
                    />
                </div>
                <input
                    type="text"
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <PlusCircle size={20} />
                Bewerbung speichern
            </button>
        </form>
    );
}
