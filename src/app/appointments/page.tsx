'use client';

import { useState } from 'react';
import { Container, Box, Typography, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  department: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
  type: string;
}

const mockAppointments: Appointment[] = [
  { id: 'A1', date: '2026-03-05', time: '10:00 AM', doctorName: 'Dr. Sarah Chen', department: 'General Medicine', location: 'Main Clinic, Room 203', status: 'upcoming', notes: 'Regular checkup', type: 'In-Person' },
  { id: 'A2', date: '2026-03-08', time: '02:30 PM', doctorName: 'Dr. Rajesh Patel', department: 'Cardiology', location: 'Heart Center, Room 501', status: 'upcoming', notes: 'Follow-up ECG review', type: 'In-Person' },
  { id: 'A3', date: '2026-03-12', time: '11:00 AM', doctorName: 'Dr. Priya Sharma', department: 'Pediatrics', location: 'Children Wing, Room 102', status: 'upcoming', notes: 'Child vaccination', type: 'In-Person' },
  { id: 'A4', date: '2026-03-15', time: '04:00 PM', doctorName: 'Dr. Anil Kumar', department: 'Dermatology', location: 'Video Call', status: 'upcoming', notes: 'Skin rash consultation', type: 'Telehealth' },
  { id: 'A5', date: '2026-02-20', time: '09:30 AM', doctorName: 'Dr. Sarah Chen', department: 'General Medicine', location: 'Main Clinic, Room 203', status: 'completed', notes: 'Blood work review — all normal', type: 'In-Person' },
  { id: 'A6', date: '2026-02-15', time: '03:00 PM', doctorName: 'Dr. Emily Wilson', department: 'Orthopedics', location: 'Video Call', status: 'completed', notes: 'Post-surgery follow-up. Recovery on track.', type: 'Telehealth' },
  { id: 'A7', date: '2026-02-10', time: '11:00 AM', doctorName: 'Dr. Meera Reddy', department: 'ENT', location: 'ENT Wing, Room 305', status: 'completed', notes: 'Ear infection treatment. Antibiotics prescribed.', type: 'In-Person' },
  { id: 'A8', date: '2026-02-05', time: '10:30 AM', doctorName: 'Dr. Rajesh Patel', department: 'Cardiology', location: 'Heart Center, Room 501', status: 'completed', notes: 'Routine heart checkup. ECG normal.', type: 'In-Person' },
  { id: 'A9', date: '2026-02-01', time: '02:00 PM', doctorName: 'Dr. Vikram Singh', department: 'Psychiatry', location: 'Video Call', status: 'cancelled', notes: 'Patient requested reschedule', type: 'Telehealth' },
  { id: 'A10', date: '2026-01-25', time: '09:00 AM', doctorName: 'Dr. Priya Sharma', department: 'Pediatrics', location: 'Children Wing, Room 102', status: 'cancelled', notes: 'Doctor unavailable', type: 'In-Person' },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  upcoming: { label: 'Upcoming', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-400' },
  'in-progress': { label: 'In Progress', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
};

const departments = ['General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'ENT', 'Psychiatry', 'Neurology'];

export default function AppointmentsPage() {
  const [tab, setTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ doctorName: '', department: '', date: '', time: '', notes: '', type: 'In-Person' });

  const tabs = ['Upcoming', 'Past Appointments', 'Cancelled'];
  const filtered = mockAppointments.filter(a => {
    if (tab === 0) return a.status === 'upcoming' || a.status === 'in-progress';
    if (tab === 1) return a.status === 'completed';
    return a.status === 'cancelled';
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9' }}>
      <Breadcrumbs />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <div>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>My Appointments</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>Manage your healthcare appointments</Typography>
          </div>
          <Button
            variant="contained"
            onClick={() => setDialogOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              borderRadius: '14px', px: 3, py: 1.5,
              textTransform: 'none', fontWeight: 700,
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)',
            }}
          >
            📅 Schedule Appointment
          </Button>
        </Box>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Upcoming', count: mockAppointments.filter(a => a.status === 'upcoming').length, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Completed', count: mockAppointments.filter(a => a.status === 'completed').length, color: '#059669', bg: '#ecfdf5' },
            { label: 'Cancelled', count: mockAppointments.filter(a => a.status === 'cancelled').length, color: '#ef4444', bg: '#fef2f2' },
            { label: 'Total', count: mockAppointments.length, color: '#8b5cf6', bg: '#f5f3ff' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.count}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 w-fit">
          {tabs.map((label, i) => (
            <button key={i}
              onClick={() => setTab(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === i
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-500 font-medium">No {tabs[tab].toLowerCase()} found</p>
            </div>
          ) : (
            filtered.map(apt => {
              const status = statusConfig[apt.status];
              return (
                <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-emerald-100 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{apt.doctorName}</h3>
                        <p className="text-sm text-gray-500">{apt.department}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-400">{apt.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 font-medium">DATE</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(apt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 font-medium">TIME</p>
                        <p className="text-sm font-semibold text-gray-900">{apt.time}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 font-medium">TYPE</p>
                        <p className="text-sm font-semibold text-gray-900">{apt.type}</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bg} w-fit`}>
                      <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                      <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {apt.notes && (
                    <div className="mt-3 pl-15 ml-15">
                      <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2 inline-block">
                        📝 {apt.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </Container>

      {/* Schedule Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: '#1e293b' }}>Schedule New Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField label="Doctor Name" fullWidth value={form.doctorName}
              onChange={e => setForm({ ...form, doctorName: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
            <TextField label="Department" fullWidth select value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
              {departments.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Date" type="date" fullWidth value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              <TextField label="Time" type="time" fullWidth value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
            </Box>
            <TextField label="Appointment Type" fullWidth select value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
              <MenuItem value="In-Person">🏥 In-Person</MenuItem>
              <MenuItem value="Telehealth">📹 Telehealth</MenuItem>
            </TextField>
            <TextField label="Notes (optional)" fullWidth multiline rows={2} value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: '#64748b', textTransform: 'none' }}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}
            sx={{
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              borderRadius: '12px', textTransform: 'none', fontWeight: 600, px: 4,
            }}>
            Confirm Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}