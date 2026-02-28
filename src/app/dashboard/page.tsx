'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Weekly consultation data
const weeklyData = [
  { day: 'Mon', consultations: 12, aiChats: 45 },
  { day: 'Tue', consultations: 19, aiChats: 52 },
  { day: 'Wed', consultations: 15, aiChats: 38 },
  { day: 'Thu', consultations: 22, aiChats: 61 },
  { day: 'Fri', consultations: 18, aiChats: 55 },
  { day: 'Sat', consultations: 8, aiChats: 30 },
  { day: 'Sun', consultations: 5, aiChats: 22 },
];

// Department distribution
const departmentData = [
  { name: 'General', value: 35 },
  { name: 'Cardiology', value: 20 },
  { name: 'Pediatrics', value: 18 },
  { name: 'Dermatology', value: 15 },
  { name: 'Orthopedics', value: 12 },
];

const COLORS = ['#059669', '#0d9488', '#10b981', '#34d399', '#6ee7b7'];

// Monthly trend data
const monthlyTrend = [
  { month: 'Sep', patients: 180 },
  { month: 'Oct', patients: 220 },
  { month: 'Nov', patients: 310 },
  { month: 'Dec', patients: 290 },
  { month: 'Jan', patients: 380 },
  { month: 'Feb', patients: 420 },
];

export default function DashboardPage() {
  const stats = [
    {
      title: 'Appointments Today',
      value: '8',
      icon: CalendarTodayIcon,
      change: '+12%',
      changeType: 'up',
      color: '#059669',
      bgColor: 'rgba(5, 150, 105, 0.08)',
    },
    {
      title: 'Upcoming Visits',
      value: '24',
      icon: TrendingUpIcon,
      change: '+8%',
      changeType: 'up',
      color: '#0d9488',
      bgColor: 'rgba(13, 148, 136, 0.08)',
    },
    {
      title: 'Total Patients',
      value: '1,423',
      icon: PeopleIcon,
      change: '+23%',
      changeType: 'up',
      color: '#0ea5e9',
      bgColor: 'rgba(14, 165, 233, 0.08)',
    },
    {
      title: 'AI Consultations',
      value: '156',
      icon: MessageIcon,
      change: '+34%',
      changeType: 'up',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.08)',
    },
  ];

  const recentActivity = [
    { time: '10:30 AM', action: 'Dr. Chen completed consultation with Patient A1', type: 'success' },
    { time: '9:45 AM', action: 'AI Health Assistant handled 12 new queries', type: 'info' },
    { time: '9:15 AM', action: 'New patient registration — John D.', type: 'info' },
    { time: '8:30 AM', action: 'Telehealth session scheduled with Dr. Patel', type: 'success' },
    { time: '8:00 AM', action: 'Appointment A5 cancelled by patient', type: 'warning' },
  ];

  const quickActions = [
    { label: 'New Appointment', icon: CalendarTodayIcon, href: '/appointments' },
    { label: 'Start Telehealth', icon: LocalHospitalIcon, href: '/telehealth' },
    { label: 'AI Assistant', icon: MessageIcon, href: '/home' },
    { label: 'View Schedule', icon: AccessTimeIcon, href: '/appointments' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>
            Healthcare Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Welcome back! Here&apos;s your healthcare overview for today.
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 4,
        }}>
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Box
                key={index}
                component="a"
                href={action.href}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 2,
                  borderRadius: '14px',
                  bgcolor: 'white',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#059669',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Box sx={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: 'linear-gradient(135deg, #059669, #0d9488)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <IconComponent sx={{ color: '#fff', fontSize: 18 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {action.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Stats Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Box key={index} sx={{
                bgcolor: 'white',
                borderRadius: '16px',
                p: 3,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                  transform: 'translateY(-2px)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{
                    width: 44, height: 44, borderRadius: '12px',
                    bgcolor: stat.bgColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <IconComponent sx={{ color: stat.color, fontSize: 22 }} />
                  </Box>
                  <Box sx={{
                    px: 1.5, py: 0.5, borderRadius: '8px',
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex', alignItems: 'center', gap: 0.5,
                  }}>
                    <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700 }}>
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  {stat.title}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Charts Row */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
          mb: 4,
        }}>
          {/* Area Chart */}
          <Box sx={{
            bgcolor: 'white',
            borderRadius: '16px',
            p: 3,
            border: '1px solid #e2e8f0',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Weekly Activity
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorConsultations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAiChats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Area type="monotone" dataKey="consultations" stroke="#059669" strokeWidth={2}
                  fill="url(#colorConsultations)" name="Consultations" />
                <Area type="monotone" dataKey="aiChats" stroke="#0d9488" strokeWidth={2}
                  fill="url(#colorAiChats)" name="AI Chats" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          {/* Pie Chart */}
          <Box sx={{
            bgcolor: 'white',
            borderRadius: '16px',
            p: 3,
            border: '1px solid #e2e8f0',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 2 }}>
              By Department
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {departmentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {departmentData.map((dept, index) => (
                <Box key={dept.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS[index] }} />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>{dept.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bottom Row */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
        }}>
          {/* Patient Growth Chart */}
          <Box sx={{
            bgcolor: 'white',
            borderRadius: '16px',
            p: 3,
            border: '1px solid #e2e8f0',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Patient Growth
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="patients" fill="#059669" radius={[6, 6, 0, 0]} name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Recent Activity */}
          <Box sx={{
            bgcolor: 'white',
            borderRadius: '16px',
            p: 3,
            border: '1px solid #e2e8f0',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Recent Activity
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {recentActivity.map((activity, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 1.5,
                  borderRadius: '12px',
                  bgcolor: '#f8faf9',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#f0fdf4' },
                }}>
                  <Box sx={{
                    width: 8, height: 8, borderRadius: '50%', mt: 0.8, mr: 1.5, flexShrink: 0,
                    bgcolor: activity.type === 'success' ? '#10b981' :
                      activity.type === 'info' ? '#0ea5e9' : '#f59e0b',
                  }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, lineHeight: 1.4 }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
