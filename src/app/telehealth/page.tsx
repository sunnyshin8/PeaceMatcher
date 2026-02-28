'use client';

import { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Meeting {
  id: string;
  roomName: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  status: 'scheduled' | 'completed' | 'live';
}

const mockMeetings: Meeting[] = [
  { id: 'M1', roomName: 'consult-dr-patel-march', date: '2026-03-05', time: '10:00 AM', doctor: 'Dr. Rajesh Patel', department: 'Cardiology', status: 'scheduled' },
  { id: 'M2', roomName: 'followup-dr-sharma', date: '2026-03-08', time: '02:30 PM', doctor: 'Dr. Priya Sharma', department: 'Pediatrics', status: 'scheduled' },
  { id: 'M3', roomName: 'skin-consult-004', date: '2026-03-12', time: '11:00 AM', doctor: 'Dr. Anil Kumar', department: 'Dermatology', status: 'scheduled' },
  { id: 'M4', roomName: 'ent-checkup-feb', date: '2026-02-20', time: '03:00 PM', doctor: 'Dr. Meera Reddy', department: 'ENT', status: 'completed' },
  { id: 'M5', roomName: 'general-feb-15', date: '2026-02-15', time: '09:30 AM', doctor: 'Dr. Sarah Chen', department: 'General Medicine', status: 'completed' },
];

export default function TelehealthPage() {
  const [tab, setTab] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const createRandomRoom = () => {
    setRoomName(`PeaceMatcher-${Math.random().toString(36).slice(2, 8)}`);
  };

  const openMeetingPopup = (room: string) => {
    const url = `https://meet.jit.si/${room}`;
    const width = 900, height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no`);
  };

  const scheduled = mockMeetings.filter(m => m.status === 'scheduled');
  const past = mockMeetings.filter(m => m.status === 'completed');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9' }}>
      <Breadcrumbs />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
            📹 Telehealth Platform
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Secure video consultations with healthcare professionals
          </Typography>
        </Box>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 w-fit mx-auto">
          {['Video Consultation', 'Scheduled Meetings', 'Past Consultations'].map((label, i) => (
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

        {tab === 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {/* Quick Meeting */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Quick Meeting</h3>
                  <p className="text-sm text-gray-500">Start or join a video consultation</p>
                </div>
              </div>

              <div className="flex gap-2 mb-5">
                <TextField
                  size="small" fullWidth placeholder="Room name"
                  value={roomName} onChange={e => setRoomName(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <Button variant="outlined" onClick={createRandomRoom}
                  sx={{ borderRadius: '12px', borderColor: '#059669', color: '#059669', textTransform: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Generate
                </Button>
              </div>
              <Button
                fullWidth variant="contained" disabled={!roomName.trim()}
                onClick={() => openMeetingPopup(roomName)}
                sx={{
                  background: 'linear-gradient(135deg, #059669, #0d9488)',
                  borderRadius: '14px', py: 1.5, textTransform: 'none', fontWeight: 700,
                  '&:disabled': { bgcolor: '#e2e8f0' },
                }}
              >
                ▶ Join Meeting
              </Button>

              <div className="border-t border-gray-100 mt-5 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-semibold text-gray-700 text-sm">Schedule a meeting</h4>
                </div>
                <div className="flex gap-2 mb-3">
                  <TextField type="date" size="small" fullWidth value={scheduleDate}
                    onChange={e => setScheduleDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  <TextField type="time" size="small" fullWidth value={scheduleTime}
                    onChange={e => setScheduleTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </div>
                <Button fullWidth variant="outlined"
                  sx={{ borderRadius: '12px', borderColor: '#059669', color: '#059669', textTransform: 'none', fontWeight: 600 }}>
                  📅 Schedule
                </Button>
              </div>
            </div>

            {/* Instructions Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">How It Works</h3>
                  <p className="text-sm text-gray-500">Video consultation guide</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Create or Enter Room', desc: 'Generate a unique room name or enter one shared by your doctor' },
                  { step: '2', title: 'Join the Meeting', desc: 'Click "Join Meeting" to open a secure Jitsi video call in a new window' },
                  { step: '3', title: 'Consult with Your Doctor', desc: 'Share your screen, chat, and discuss your health concerns face-to-face' },
                  { step: '4', title: 'Get Your Report', desc: 'After the consultation, export a summary from the AI chat for your records' },
                ].map(item => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-emerald-600">{item.step}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-700">
                  🔒 <strong>Privacy:</strong> All video calls are end-to-end encrypted via Jitsi Meet. No data is stored on our servers.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Consultations ({scheduled.length})</h3>
            {scheduled.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-4xl mb-3">📅</p>
                <p className="text-gray-500 font-medium">No scheduled meetings</p>
              </div>
            ) : (
              scheduled.map(m => (
                <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{m.doctor}</h4>
                      <p className="text-sm text-gray-500">{m.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-medium">DATE</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-medium">TIME</p>
                      <p className="text-sm font-semibold text-gray-900">{m.time}</p>
                    </div>
                  </div>
                  <Button size="small" variant="contained" onClick={() => openMeetingPopup(m.roomName)}
                    sx={{
                      background: 'linear-gradient(135deg, #059669, #0d9488)',
                      borderRadius: '12px', textTransform: 'none', fontWeight: 600, px: 3,
                    }}>
                    ▶ Join
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 2 && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Past Consultations ({past.length})</h3>
            {past.map(m => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{m.doctor}</h4>
                    <p className="text-sm text-gray-500">{m.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium">DATE</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium">TIME</p>
                    <p className="text-sm font-semibold text-gray-900">{m.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full">✓ Completed</span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
}
