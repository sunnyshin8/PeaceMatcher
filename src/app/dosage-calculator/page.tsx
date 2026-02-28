'use client';

import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

const MEDICINES = [
    {
        name: 'Dolo 650mg (Paracetamol)', dosages: [
            { group: '0-2 years', dose: 'Consult doctor', frequency: 'As directed', notes: 'Not recommended without medical supervision' },
            { group: '3-5 years', dose: '160mg (liquid)', frequency: 'Every 4-6 hours', notes: 'Max 5 doses in 24 hours. Use syrup form' },
            { group: '6-11 years', dose: '325mg (half tablet)', frequency: 'Every 6-8 hours', notes: 'Max 3 doses in 24 hours' },
            { group: '12-17 years', dose: '500mg', frequency: 'Every 6-8 hours', notes: 'Max 4 doses in 24 hours' },
            { group: '18-64 years', dose: '650mg (1 tablet)', frequency: 'Every 6-8 hours', notes: 'Max 4 tablets in 24 hours. Take after meals' },
            { group: '65+ years', dose: '500mg', frequency: 'Every 8 hours', notes: 'Max 3 doses. Monitor liver function' },
        ]
    },
    {
        name: 'Ibuprofen', dosages: [
            { group: '0-5 years', dose: 'Consult doctor', frequency: '-', notes: 'Use liquid form if prescribed, weight-based dosing only' },
            { group: '6-11 years', dose: '200mg', frequency: 'Every 6-8 hours', notes: 'Take with food. Max 3 doses/day' },
            { group: '12-17 years', dose: '200-400mg', frequency: 'Every 6-8 hours', notes: 'Take with food. Max 1200mg/day' },
            { group: '18-64 years', dose: '200-400mg', frequency: 'Every 4-6 hours', notes: 'Take with food. Max 1200mg/day OTC' },
            { group: '65+ years', dose: '200mg', frequency: 'Every 8 hours', notes: 'Lower doses recommended. Watch for GI side effects' },
        ]
    },
    {
        name: 'Cetirizine', dosages: [
            { group: '2-5 years', dose: '2.5mg', frequency: 'Once daily', notes: 'Use liquid form' },
            { group: '6-11 years', dose: '5mg', frequency: 'Once daily', notes: 'Half tablet or liquid' },
            { group: '12+ years', dose: '10mg', frequency: 'Once daily', notes: 'Can be taken with or without food' },
        ]
    },
    {
        name: 'Amoxicillin', dosages: [
            { group: '0-2 years', dose: '25mg/kg/day', frequency: 'Divided in 3 doses', notes: 'Prescription only. Complete full course' },
            { group: '3-11 years', dose: '250mg', frequency: 'Every 8 hours', notes: 'Complete full course. Use liquid form for young children' },
            { group: '12+ years', dose: '250-500mg', frequency: 'Every 8 hours', notes: 'Complete full 5-7 day course' },
        ]
    },
    {
        name: 'ORS (Oral Rehydration Salts)', dosages: [
            { group: '0-2 years', dose: '50-100ml per stool', frequency: 'After each loose stool', notes: 'Give small sips frequently. 1 sachet in 1L boiled cooled water' },
            { group: '3-11 years', dose: '100-200ml per stool', frequency: 'After each loose stool', notes: 'Sip throughout day. Do not add sugar' },
            { group: '12+ years', dose: '200-400ml per stool', frequency: 'Sip frequently', notes: '1 sachet in 1 liter water. Use within 24 hours' },
        ]
    },
    {
        name: 'Omeprazole', dosages: [
            { group: '1-11 years', dose: '10mg', frequency: 'Once daily', notes: 'Take 30 min before breakfast. Prescription only for children' },
            { group: '12+ years', dose: '20mg', frequency: 'Once daily', notes: 'Take 30 min before breakfast. Swallow whole' },
        ]
    },
];

export default function DosageCalculatorPage() {
    const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
    const [age, setAge] = useState('');

    const medicine = MEDICINES.find(m => m.name === selectedMedicine);

    const getAgeGroup = (ageNum: number) => {
        if (!medicine) return null;
        for (const dosage of medicine.dosages) {
            const range = dosage.group;
            if (range.endsWith('+ years') || range.endsWith('+')) {
                const min = parseInt(range);
                if (ageNum >= min) return dosage;
            }
            const match = range.match(/(\d+)-(\d+)/);
            if (match) {
                const [, min, max] = match;
                if (ageNum >= parseInt(min) && ageNum <= parseInt(max)) return dosage;
            }
        }
        return medicine.dosages[medicine.dosages.length - 1];
    };

    const ageNum = parseInt(age);
    const matchedDosage = !isNaN(ageNum) && ageNum > 0 ? getAgeGroup(ageNum) : null;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9', py: 4 }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                        💊 Dosage Calculator
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Get age-appropriate medication dosages
                    </Typography>
                </Box>

                <Box sx={{ bgcolor: 'white', borderRadius: '20px', p: { xs: 3, md: 5 }, border: '1px solid #e2e8f0', mb: 4 }}>
                    {/* Medicine Selection */}
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>1. Select Medicine</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
                        {MEDICINES.map(m => (
                            <Box key={m.name} onClick={() => setSelectedMedicine(m.name)}
                                sx={{
                                    p: 2.5, borderRadius: '14px', cursor: 'pointer',
                                    border: selectedMedicine === m.name ? '2px solid #059669' : '2px solid #e2e8f0',
                                    bgcolor: selectedMedicine === m.name ? 'rgba(5, 150, 105, 0.05)' : 'white',
                                    transition: 'all 0.2s',
                                    '&:hover': { borderColor: '#059669', transform: 'translateY(-1px)' },
                                }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{m.name}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Age Input */}
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>2. Enter Patient Age</Typography>
                    <TextField
                        placeholder="Age in years" type="number" value={age}
                        onChange={e => setAge(e.target.value)}
                        sx={{ maxWidth: 200, mb: 4, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />

                    {/* Result */}
                    {matchedDosage && (
                        <Box sx={{
                            p: 4, borderRadius: '16px',
                            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.06), rgba(13, 148, 136, 0.06))',
                            border: '1px solid rgba(5, 150, 105, 0.2)',
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#059669', mb: 2 }}>
                                ✅ Recommended Dosage
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>MEDICINE</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>{selectedMedicine}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>AGE GROUP</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>{matchedDosage.group}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>DOSE</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#059669', fontSize: '1.2rem' }}>{matchedDosage.dose}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>FREQUENCY</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>{matchedDosage.frequency}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3, p: 2, bgcolor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>SPECIAL INSTRUCTIONS</Typography>
                                <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>{matchedDosage.notes}</Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Full Dosage Table */}
                    {medicine && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                                Complete Dosage Reference: {selectedMedicine}
                            </Typography>
                            <Box sx={{ overflow: 'auto' }}>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">Age Group</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">Dose</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">Frequency</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600 border-b">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medicine.dosages.map((d, i) => (
                                            <tr key={i} className={`border-b ${matchedDosage === d ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                                                <td className="px-4 py-3 font-medium text-gray-900">{d.group}</td>
                                                <td className="px-4 py-3 font-semibold text-emerald-600">{d.dose}</td>
                                                <td className="px-4 py-3 text-gray-700">{d.frequency}</td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">{d.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Alert severity="info" sx={{ borderRadius: '12px' }}>
                    <strong>Note:</strong> These are general OTC dosage guidelines. Always follow your doctor&apos;s prescription for specific conditions.
                </Alert>
            </Container>
        </Box>
    );
}
