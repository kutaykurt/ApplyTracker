import React from 'react';
import { ExternalLink, Trash2, User, Building2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ApplicationItem({ application, onDelete }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="application-card"
            style={{ marginBottom: '0.75rem' }}
        >
            <div className="date-badge" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                {application.date}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Building2 size={18} style={{ color: 'var(--primary)', opacity: 0.7 }} />
                <span style={{ fontWeight: 700 }}>{application.company}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <User size={18} style={{ color: 'var(--accent)', opacity: 0.7 }} />
                <span>{application.contact || '—'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Briefcase size={18} style={{ color: 'var(--text-secondary)', opacity: 0.7 }} />
                <span style={{ color: 'var(--text-secondary)' }}>{application.jobTitle}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                {application.link && (
                    <a
                        href={application.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                            padding: '0.5rem',
                            background: 'var(--border)',
                            color: 'var(--text-main)',
                            borderRadius: '0.4rem',
                            width: '40px'
                        }}
                    >
                        <ExternalLink size={18} />
                    </a>
                )}
                <button
                    onClick={() => onDelete(application.id)}
                    className="btn"
                    style={{
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--danger)',
                        borderRadius: '0.4rem',
                        width: '40px'
                    }}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
}
