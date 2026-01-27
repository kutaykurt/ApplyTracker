import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ApplicationForm from './components/ApplicationForm';
import ApplicationItem from './components/ApplicationItem';
import { LayoutDashboard, Target, CheckCircle2, Clock } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [applications, setApplications] = useLocalStorage('job-applications', []);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }));

    // Calculate date range: from earliest application to today
    const getDateRange = () => {
        const today = new Date();
        const dates = [];

        let start = new Date();
        if (applications.length > 0) {
            const allDates = applications.map(app => {
                const [d, m, y] = app.date.split('.');
                return new Date(y, m - 1, d);
            });
            start = new Date(Math.min(...allDates));
        }

        // Safety check if start is in future
        if (start > today) start = today;

        const current = new Date(start);
        while (current <= today) {
            dates.push(new Date(current).toLocaleDateString('de-DE', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            }));
            current.setDate(current.getDate() + 1);
        }
        return dates.reverse(); // Show newest first
    };

    const dates = getDateRange();

    const addApplication = (application) => {
        setApplications([application, ...applications]);
    };

    const deleteApplication = (id) => {
        setApplications(applications.filter(app => app.id !== id));
    };

    const filteredApplications = applications.filter(app => app.date === selectedDate);

    return (
        <div className="container">
            <header className="app-header fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                        background: 'var(--primary)',
                        padding: '0.5rem',
                        borderRadius: '0.75rem',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                    }}>
                        <Target size={32} />
                    </div>
                    <h1 className="title-gradient">ApplyTracker</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Behalte den Überblick über deine Bewerbungen mit Stil. Organisiert, professionell und immer griffbereit.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{applications.length}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Gesamt</div>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                            {applications.filter(a => a.link).length}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Mit Links</div>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                            {new Set(applications.map(a => a.date)).size}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tage</div>
                    </div>
                </div>
            </div>

            <div className="date-navigator-container glass-panel">
                <div className="date-navigator">
                    {dates.map(date => (
                        <button
                            key={date}
                            className={`date-tab ${selectedDate === date ? 'active' : ''}`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <div className="date-tab-inner">
                                <span className="date-text">{date}</span>
                                {applications.some(a => a.date === date) && (
                                    <span className="date-dot"></span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <ApplicationForm onAdd={addApplication} defaultDate={selectedDate} />

            <div className="application-list" style={{ marginTop: '2rem' }}>
                <div className="application-list-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} />
                        <span>Bewerbungen am {selectedDate}</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                        {filteredApplications.length} Einträge gefunden
                    </div>
                </div>

                <div className="list-header">
                    <span>Datum</span>
                    <span>Unternehmen</span>
                    <span>Kontakt</span>
                    <span>Jobtitel</span>
                    <span style={{ textAlign: 'right' }}>Aktionen</span>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <AnimatePresence mode="popLayout">
                        {filteredApplications.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem',
                                color: 'var(--text-secondary)',
                                border: '2px dashed var(--border)',
                                borderRadius: '1rem'
                            }}>
                                Keine Bewerbungen am {selectedDate} hinterlegt.
                            </div>
                        ) : (
                            filteredApplications.map(app => (
                                <ApplicationItem
                                    key={app.id}
                                    application={app}
                                    onDelete={deleteApplication}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', paddingBottom: '2rem' }}>
                &copy; 2026 ApplyTracker &bull; Alle Daten werden lokal in deinem Browser gespeichert.
            </footer>
        </div>
    );
}

export default App;
