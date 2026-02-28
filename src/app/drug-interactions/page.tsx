'use client';

import { useState } from 'react';
import { Container, Box, Typography, Button, TextField, Chip, Alert, CircularProgress } from '@mui/material';

const COMMON_MEDICATIONS = [
    'Dolo 650mg (Paracetamol)', 'Ibuprofen', 'Aspirin', 'Amoxicillin', 'Azithromycin',
    'Metformin', 'Losartan', 'Amlodipine', 'Omeprazole', 'Cetirizine',
    'Diclofenac', 'Atorvastatin', 'Clopidogrel', 'Metoprolol', 'Pantoprazole',
    'Ciprofloxacin', 'Doxycycline', 'Prednisolone', 'Salbutamol', 'Montelukast',
    'Ranitidine', 'Domperidone', 'Ondansetron', 'Tramadol', 'Gabapentin',
];

export default function DrugInteractionPage() {
    const [medications, setMedications] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [customMed, setCustomMed] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const filteredMeds = COMMON_MEDICATIONS.filter(m =>
        m.toLowerCase().includes(searchTerm.toLowerCase()) && !medications.includes(m)
    );

    const addMedication = (med: string) => {
        if (!medications.includes(med) && medications.length < 10) {
            setMedications(prev => [...prev, med]);
            setSearchTerm('');
        }
    };

    const addCustom = () => {
        if (customMed.trim() && !medications.includes(customMed.trim())) {
            setMedications(prev => [...prev, customMed.trim()]);
            setCustomMed('');
        }
    };

    const removeMedication = (med: string) => {
        setMedications(prev => prev.filter(m => m !== med));
    };

    const checkInteractions = async () => {
        if (medications.length < 2) return;
        setLoading(true);
        setError(null);
        try {
            const prompt = `As a clinical pharmacist, analyze the following drug combination for interactions:

**Medications:** ${medications.join(', ')}

Please provide:
1. **Interaction Summary** — Are there any known interactions between these drugs?
2. **Severity Level** — For each interaction: Minor / Moderate / Major / Contraindicated
3. **Mechanism** — How do these drugs interact?
4. **Clinical Effects** — What could happen if taken together?
5. **Recommendations** — Safe alternatives or timing adjustments
6. **Monitoring** — What should the patient or clinician watch for?

Use Indian brand medication names where applicable. Be specific and practical.`;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: prompt }),
            });

            if (!response.ok) throw new Error('Failed to check interactions');
            const data = await response.json();
            setResult(data.response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Interaction check failed');
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

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9', py: 4 }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                        💊 Drug Interaction Checker
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Check for potential interactions between your medications
                    </Typography>
                </Box>

                <Box sx={{ bgcolor: 'white', borderRadius: '20px', p: { xs: 3, md: 5 }, border: '1px solid #e2e8f0', mb: 4 }}>
                    {/* Selected Medications */}
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                        Your Medications ({medications.length}/10)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, minHeight: 48 }}>
                        {medications.length === 0 ? (
                            <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
                                Add at least 2 medications to check for interactions
                            </Typography>
                        ) : (
                            medications.map(med => (
                                <Chip
                                    key={med} label={med} onDelete={() => removeMedication(med)}
                                    sx={{
                                        bgcolor: '#059669', color: '#fff', fontWeight: 600,
                                        '& .MuiChip-deleteIcon': { color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } },
                                    }}
                                />
                            ))
                        )}
                    </Box>

                    {/* Search */}
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#64748b' }}>Search common medications</Typography>
                    <TextField
                        fullWidth size="small" placeholder="Type to search..." value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                    {searchTerm && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                            {filteredMeds.slice(0, 8).map(med => (
                                <Chip key={med} label={med} onClick={() => addMedication(med)}
                                    sx={{ cursor: 'pointer', bgcolor: '#f1f5f9', '&:hover': { bgcolor: '#e2e8f0' } }} />
                            ))}
                        </Box>
                    )}

                    {/* Custom */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        <TextField
                            size="small" placeholder="Or add custom medication" value={customMed}
                            onChange={e => setCustomMed(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addCustom()}
                            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                        <Button onClick={addCustom} variant="outlined"
                            sx={{ borderRadius: '12px', borderColor: '#059669', color: '#059669', textTransform: 'none', fontWeight: 600 }}>
                            Add
                        </Button>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                    {/* Check Button */}
                    <Button
                        fullWidth variant="contained" onClick={checkInteractions}
                        disabled={medications.length < 2 || loading}
                        sx={{
                            background: 'linear-gradient(135deg, #059669, #0d9488)',
                            borderRadius: '14px', py: 1.5, textTransform: 'none', fontWeight: 700, fontSize: '1rem',
                            '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
                        }}
                    >
                        {loading ? <><CircularProgress size={20} sx={{ color: '#fff', mr: 1 }} /> Checking Interactions...</>
                            : `Check Interactions (${medications.length} medications)`}
                    </Button>
                </Box>

                {/* Results */}
                {result && (
                    <Box sx={{ bgcolor: 'white', borderRadius: '20px', p: { xs: 3, md: 5 }, border: '1px solid #e2e8f0' }}>
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
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>Interaction Analysis</Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#f8faf9', borderRadius: '16px', p: 3, border: '1px solid #e2e8f0' }}>
                            {formatResult(result)}
                        </Box>
                        <Alert severity="warning" sx={{ mt: 3, borderRadius: '12px' }}>
                            Always consult your doctor or pharmacist before making changes to your medication regimen.
                        </Alert>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
