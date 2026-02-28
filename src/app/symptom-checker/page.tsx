'use client';

import { useState } from 'react';
import { Container, Box, Typography, Button, Chip, Alert, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const BODY_AREAS = [
    { id: 'head', label: 'Head & Face', icon: '🧠', symptoms: ['headache', 'dizziness', 'blurred vision', 'migraine', 'ear pain', 'sore throat', 'toothache'] },
    { id: 'chest', label: 'Chest & Lungs', icon: '🫁', symptoms: ['chest pain', 'shortness of breath', 'cough', 'wheezing', 'palpitations', 'asthma'] },
    { id: 'stomach', label: 'Stomach & Abdomen', icon: '🤢', symptoms: ['nausea', 'vomiting', 'diarrhea', 'acidity', 'heartburn', 'abdominal pain', 'bloating', 'indigestion'] },
    { id: 'skin', label: 'Skin & Allergies', icon: '🤧', symptoms: ['rash', 'itching', 'hives', 'allergies', 'swelling', 'eczema'] },
    { id: 'general', label: 'General / Whole Body', icon: '🤒', symptoms: ['fever', 'fatigue', 'body ache', 'muscle aches', 'weakness', 'chills', 'dehydration'] },
    { id: 'joints', label: 'Bones & Joints', icon: '🦴', symptoms: ['joint pain', 'back pain', 'arthritis', 'muscle pain', 'stiffness', 'sports injury'] },
    { id: 'mental', label: 'Mental Health', icon: '😰', symptoms: ['anxiety', 'insomnia', 'stress', 'depression', 'panic attacks'] },
    { id: 'womens', label: "Women's Health", icon: '♀️', symptoms: ['menstrual cramps', 'irregular periods', 'PCOS', 'pregnancy nausea'] },
];

const SEVERITY = [
    { id: 'mild', label: 'Mild', desc: 'Noticeable but manageable', color: '#10b981' },
    { id: 'moderate', label: 'Moderate', desc: 'Affecting daily activities', color: '#f59e0b' },
    { id: 'severe', label: 'Severe', desc: 'Very painful or distressing', color: '#ef4444' },
];

const DURATION = [
    { id: 'today', label: 'Just today' },
    { id: 'few_days', label: 'A few days' },
    { id: 'week', label: 'About a week' },
    { id: 'longer', label: 'Over a week' },
    { id: 'chronic', label: 'Recurring/chronic' },
];

export default function SymptomCheckerPage() {
    const [step, setStep] = useState(0);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [severity, setSeverity] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const currentArea = BODY_AREAS.find(a => a.id === selectedArea);

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
        );
    };

    const canProceed = () => {
        switch (step) {
            case 0: return !!selectedArea;
            case 1: return selectedSymptoms.length > 0;
            case 2: return !!severity && !!duration;
            default: return true;
        }
    };

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        try {
            const prompt = `Patient presents with the following:
- Body area: ${currentArea?.label}
- Symptoms: ${selectedSymptoms.join(', ')}
- Severity: ${severity}
- Duration: ${DURATION.find(d => d.id === duration)?.label}
${age ? `- Age: ${age} years` : ''}

Please provide:
1. **Likely Conditions** (top 3 possibilities)
2. **Recommended OTC Medications** with dosages
3. **Home Remedies** that may help
4. **Red Flags** - when to seek immediate medical attention
5. **Recommended Specialist** to consult

Keep it practical and include Indian brand medication names where applicable.`;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: prompt }),
            });

            if (!response.ok) throw new Error('Failed to get AI analysis');

            const data = await response.json();
            setResult(data.response);
            setStep(3);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed');
        } finally {
            setLoading(false);
        }
    };

    const formatResult = (text: string) => {
        return text.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <h3 key={i} className="font-bold text-lg mt-4 mb-1 text-gray-900">{trimmed.replace(/\*\*/g, '')}</h3>;
            }
            if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
                return <h3 key={i} className="font-bold text-lg mt-4 mb-1 text-gray-900">{trimmed.replace(/^#+\s/, '')}</h3>;
            }
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return <li key={i} className="ml-4 text-gray-700 mb-1">{trimmed.slice(2)}</li>;
            }
            if (/^\d+\.\s/.test(trimmed)) {
                const content = trimmed.replace(/^\d+\.\s/, '');
                const boldMatch = content.match(/^\*\*(.+?)\*\*(.*)/);
                if (boldMatch) {
                    return <p key={i} className="mb-1"><strong className="text-gray-900">{boldMatch[1]}</strong>{boldMatch[2]}</p>;
                }
                return <p key={i} className="ml-4 text-gray-700 mb-1">{content}</p>;
            }
            if (trimmed === '') return <div key={i} className="h-2" />;
            const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
            return (
                <p key={i} className="text-gray-700 mb-1">
                    {parts.map((part, j) =>
                        part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} className="text-gray-900">{part.slice(2, -2)}</strong>
                            : part
                    )}
                </p>
            );
        });
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                            Where are you experiencing symptoms?
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            Select the body area most affected
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                            {BODY_AREAS.map(area => (
                                <Box
                                    key={area.id}
                                    onClick={() => setSelectedArea(area.id)}
                                    sx={{
                                        p: 3, borderRadius: '16px', cursor: 'pointer',
                                        border: selectedArea === area.id ? '2px solid #059669' : '2px solid #e2e8f0',
                                        bgcolor: selectedArea === area.id ? 'rgba(5, 150, 105, 0.05)' : 'white',
                                        transition: 'all 0.2s', textAlign: 'center',
                                        '&:hover': { borderColor: '#059669', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' },
                                    }}
                                >
                                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>{area.icon}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{area.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                            Select your symptoms
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            Choose all that apply for {currentArea?.label}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {currentArea?.symptoms.map(symptom => (
                                <Chip
                                    key={symptom}
                                    label={symptom}
                                    onClick={() => toggleSymptom(symptom)}
                                    sx={{
                                        px: 1, py: 2.5, fontSize: '0.9rem', borderRadius: '12px',
                                        fontWeight: selectedSymptoms.includes(symptom) ? 700 : 500,
                                        bgcolor: selectedSymptoms.includes(symptom) ? '#059669' : '#f1f5f9',
                                        color: selectedSymptoms.includes(symptom) ? '#fff' : '#334155',
                                        border: selectedSymptoms.includes(symptom) ? '2px solid #059669' : '2px solid transparent',
                                        '&:hover': { bgcolor: selectedSymptoms.includes(symptom) ? '#047857' : '#e2e8f0' },
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Box>
                        {selectedSymptoms.length > 0 && (
                            <Typography variant="body2" sx={{ mt: 3, color: '#059669', fontWeight: 600 }}>
                                {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
                            </Typography>
                        )}
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                            Tell us more
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            This helps our AI provide more accurate recommendations
                        </Typography>

                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>Severity</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                            {SEVERITY.map(s => (
                                <Box
                                    key={s.id} onClick={() => setSeverity(s.id)}
                                    sx={{
                                        flex: 1, minWidth: 140, p: 2, borderRadius: '14px', cursor: 'pointer',
                                        border: severity === s.id ? `2px solid ${s.color}` : '2px solid #e2e8f0',
                                        bgcolor: severity === s.id ? `${s.color}10` : 'white',
                                        transition: 'all 0.2s',
                                        '&:hover': { borderColor: s.color },
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: s.color }}>{s.label}</Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>{s.desc}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>How long have you had these symptoms?</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
                            {DURATION.map(d => (
                                <Chip
                                    key={d.id} label={d.label} onClick={() => setDuration(d.id)}
                                    sx={{
                                        px: 1, py: 2.5, fontSize: '0.85rem', borderRadius: '12px',
                                        fontWeight: duration === d.id ? 700 : 500,
                                        bgcolor: duration === d.id ? '#059669' : '#f1f5f9',
                                        color: duration === d.id ? '#fff' : '#334155',
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: duration === d.id ? '#047857' : '#e2e8f0' },
                                    }}
                                />
                            ))}
                        </Box>

                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>Age (optional)</Typography>
                        <input
                            type="number" placeholder="Enter your age" value={age}
                            onChange={e => setAge(e.target.value)}
                            className="w-full max-w-xs px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                        />
                    </Box>
                );
            case 3:
                return (
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Box sx={{
                                width: 48, height: 48, borderRadius: '14px',
                                background: 'linear-gradient(135deg, #059669, #0d9488)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Box>
                            <div>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>AI Analysis Complete</Typography>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    Based on: {selectedSymptoms.join(', ')} • {SEVERITY.find(s => s.id === severity)?.label} severity
                                </Typography>
                            </div>
                        </Box>

                        <Box sx={{ bgcolor: '#f8faf9', borderRadius: '16px', p: 3, border: '1px solid #e2e8f0', mb: 3 }}>
                            <div className="prose prose-sm max-w-none">
                                {result && formatResult(result)}
                            </div>
                        </Box>

                        <Alert severity="info" sx={{ borderRadius: '12px', mb: 3 }}>
                            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical consultation.
                        </Alert>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Link href="/home" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" sx={{
                                    background: 'linear-gradient(135deg, #059669, #0d9488)', borderRadius: '12px',
                                    textTransform: 'none', fontWeight: 600,
                                }}>
                                    Chat with AI for more details
                                </Button>
                            </Link>
                            <Link href="/appointments" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" sx={{
                                    borderColor: '#059669', color: '#059669', borderRadius: '12px',
                                    textTransform: 'none', fontWeight: 600,
                                }}>
                                    Book an Appointment
                                </Button>
                            </Link>
                            <Button variant="text" onClick={() => { setStep(0); setSelectedArea(null); setSelectedSymptoms([]); setSeverity(null); setDuration(null); setAge(''); setResult(null); }}
                                sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>
                                Start Over
                            </Button>
                        </Box>
                    </Box>
                );
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9', py: 4 }}>
            <Container maxWidth="md">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                        🩺 Symptom Checker
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Describe your symptoms and get AI-powered health recommendations
                    </Typography>
                </Box>

                {/* Progress */}
                {step < 3 && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 5, justifyContent: 'center' }}>
                        {['Body Area', 'Symptoms', 'Details', 'Analysis'].map((label, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    bgcolor: i <= step ? '#059669' : '#e2e8f0',
                                    color: i <= step ? '#fff' : '#94a3b8',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem', fontWeight: 700,
                                }}>
                                    {i < step ? '✓' : i + 1}
                                </Box>
                                <Typography variant="caption" sx={{
                                    fontWeight: i === step ? 700 : 500,
                                    color: i <= step ? '#1e293b' : '#94a3b8',
                                    display: { xs: 'none', sm: 'block' },
                                }}>
                                    {label}
                                </Typography>
                                {i < 3 && <Box sx={{ width: 40, height: 2, bgcolor: i < step ? '#059669' : '#e2e8f0', mx: 1, display: { xs: 'none', sm: 'block' } }} />}
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Content Card */}
                <Box sx={{ bgcolor: 'white', borderRadius: '20px', p: { xs: 3, md: 5 }, border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                    {renderStep()}

                    {/* Navigation Buttons */}
                    {step < 3 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                            <Button
                                onClick={() => setStep(s => s - 1)}
                                disabled={step === 0}
                                startIcon={<ArrowBackIcon />}
                                sx={{ color: '#64748b', textTransform: 'none' }}
                            >
                                Back
                            </Button>
                            {step < 2 ? (
                                <Button
                                    onClick={() => setStep(s => s + 1)}
                                    disabled={!canProceed()}
                                    endIcon={<ArrowForwardIcon />}
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(135deg, #059669, #0d9488)',
                                        borderRadius: '12px', px: 4, textTransform: 'none', fontWeight: 600,
                                        '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
                                    }}
                                >
                                    Continue
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={!canProceed() || loading}
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(135deg, #059669, #0d9488)',
                                        borderRadius: '12px', px: 4, textTransform: 'none', fontWeight: 600,
                                        '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
                                    }}
                                >
                                    {loading ? <><CircularProgress size={20} sx={{ color: '#fff', mr: 1 }} /> Analyzing...</> : 'Get AI Analysis'}
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
