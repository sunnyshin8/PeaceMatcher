'use client';

import Link from 'next/link';
import { Container, Box, Typography } from '@mui/material';
import Breadcrumbs from '@/components/Breadcrumbs';

const services = [
  {
    title: 'AI Health Assistant',
    description: 'Get instant AI-powered health guidance. Describe symptoms, ask about medications, or get dosage recommendations.',
    icon: '🤖',
    href: '/home',
    color: '#059669',
    features: ['Gemini AI powered', 'Symptom analysis', 'Medicine info', 'Voice input'],
  },
  {
    title: 'Symptom Checker',
    description: 'Interactive wizard to analyze your symptoms. Select body area, describe symptoms, and get AI analysis.',
    icon: '🩺',
    href: '/symptom-checker',
    color: '#0d9488',
    features: ['Step-by-step wizard', 'AI diagnosis suggestions', 'Severity assessment', 'Action recommendations'],
  },
  {
    title: 'Drug Interaction Checker',
    description: 'Check potential interactions between your medications. Essential for multi-drug regimens.',
    icon: '💊',
    href: '/drug-interactions',
    color: '#0ea5e9',
    features: ['25+ common medications', 'AI-powered analysis', 'Severity ratings', 'Alternative suggestions'],
  },
  {
    title: 'Dosage Calculator',
    description: 'Get age-appropriate medication dosages. Safe dosing from pediatric to elderly patients.',
    icon: '⚖️',
    href: '/dosage-calculator',
    color: '#8b5cf6',
    features: ['Age-based dosing', '6 common medicines', 'Special instructions', 'Complete reference tables'],
  },
  {
    title: 'Telehealth Consultations',
    description: 'Connect with healthcare professionals via secure video calls from anywhere.',
    icon: '📹',
    href: '/telehealth',
    color: '#059669',
    features: ['Video consultations', 'Jitsi Meet integration', 'Patient records', 'Appointment scheduling'],
  },
  {
    title: 'Clinician Dashboard',
    description: 'Advanced clinical tools for healthcare professionals with AI-assisted features.',
    icon: '🏥',
    href: '/clinician',
    color: '#0d9488',
    features: ['Smart prescriptions', 'ICU risk prediction', 'Drug interaction alerts', 'Patient analytics'],
  },
  {
    title: 'Guardian Care',
    description: 'Manage healthcare for your family members. Multi-generational health tracking.',
    icon: '👨‍👩‍👧',
    href: '/guardians',
    color: '#0ea5e9',
    features: ['Family health management', 'Verification system', 'Access control', 'Emergency contacts'],
  },
  {
    title: 'Appointments',
    description: 'Schedule and manage your healthcare appointments with ease.',
    icon: '📅',
    href: '/appointments',
    color: '#8b5cf6',
    features: ['Easy scheduling', 'Status tracking', 'Cancellation', 'Reminders'],
  },
];

export default function ServicesPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8faf9' }}>
      <Breadcrumbs />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
            Our Services
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 520, mx: 'auto' }}>
            Comprehensive healthcare tools powered by AI — from symptom checking to telehealth consultations
          </Typography>
        </Box>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group block">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${service.color}10` }}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Box>
  );
}
