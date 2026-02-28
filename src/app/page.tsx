'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'AI Health Assistant',
    description: 'Get instant, accurate health guidance powered by Gemini AI. Symptom analysis, medication info, and dosage recommendations.',
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.08)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Telehealth Consultations',
    description: 'Connect with verified healthcare professionals via secure video calls. Get care from anywhere, anytime.',
    color: '#0d9488',
    bgColor: 'rgba(13, 148, 136, 0.08)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Guardian Care System',
    description: 'Let trusted family members manage healthcare for loved ones. Multi-generational health tracking and emergency access.',
    color: '#0ea5e9',
    bgColor: 'rgba(14, 165, 233, 0.08)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Clinician Dashboard',
    description: 'Advanced clinical tools with ICU risk prediction, smart prescriptions, and drug interaction checking.',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.08)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'HIPAA Compliant',
    description: 'Built with healthcare-grade security. PHI protection, data encryption, and privacy-first architecture.',
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.08)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '24/7 Availability',
    description: 'Round-the-clock AI health assistance. Get medical guidance instantly, day or night, from anywhere.',
    color: '#0d9488',
    bgColor: 'rgba(13, 148, 136, 0.08)',
  },
];

const stats = [
  { value: '50+', label: 'Medical Services' },
  { value: '24/7', label: 'AI Availability' },
  { value: '99.9%', label: 'Uptime Target' },
  { value: '<2s', label: 'AI Response Time' },
];

const tracks = [
  { name: 'AI-Powered Diagnostics', icon: '🤖', description: 'Advanced Gemini AI analyzes symptoms, suggests treatments, and provides evidence-based medical guidance in real time.' },
  { name: 'Smart Health Screening', icon: '🔬', description: 'Intelligent screening tools with age-appropriate dosing, drug interaction checks, and personalized risk assessment.' },
  { name: 'Accessible Healthcare', icon: '🌍', description: 'Making quality healthcare guidance accessible to everyone — anytime, anywhere, in any language.' },
];

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#f8faf9' }}>
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #059669 0%, #0d9488 30%, #0ea5e9 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 14 },
      }}>
        {/* Background Decoration */}
        <Box sx={{
          position: 'absolute', top: -100, right: -100,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -80, left: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
          }}>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>


              <Typography variant="h2" sx={{
                color: '#fff', fontWeight: 800, mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.15,
              }}>
                Healthcare Intelligence
                <br />
                <Box component="span" sx={{
                  background: 'linear-gradient(90deg, #fde68a, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  For Every Family
                </Box>
              </Typography>

              <Typography variant="body1" sx={{
                color: 'rgba(255,255,255,0.85)', mb: 4,
                maxWidth: 520, fontSize: '1.1rem', lineHeight: 1.7,
                mx: { xs: 'auto', md: 0 },
              }}>
                PeaceMatcher transforms healthcare delivery through AI-powered medical assistance,
                connecting patients, families, and clinicians in one intelligent ecosystem.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                <Link href="/home" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: '#fff !important',
                      color: '#059669 !important',
                      fontWeight: 700, px: 4, py: 1.5,
                      borderRadius: '14px', fontSize: '1rem',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                      '&:hover': {
                        background: '#f0fdf4 !important',
                        color: '#047857 !important',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    Try AI Assistant →
                  </Button>
                </Link>
                <Link href="/services" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: '#fff', borderColor: 'rgba(255,255,255,0.4)',
                      fontWeight: 600, px: 4, py: 1.5,
                      borderRadius: '14px', fontSize: '1rem',
                      backdropFilter: 'blur(4px)',
                      '&:hover': {
                        borderColor: '#fff',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Explore Services
                  </Button>
                </Link>
              </Box>
            </Box>

            {/* Hero Visual */}
            <Box sx={{
              flex: 1, display: 'flex', justifyContent: 'center',
            }}>
              <Box sx={{
                width: { xs: 280, md: 360 },
                height: { xs: 280, md: 360 },
                borderRadius: '30px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                p: 4,
                boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
              }}>
                <Box sx={{
                  width: 80, height: 80, borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                }}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem', mb: 1, textAlign: 'center' }}>
                  PeaceMatcher
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textAlign: 'center' }}>
                  AI-Powered Healthcare
                </Typography>

                {/* Floating Stats */}
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  {[
                    { icon: '🤖', label: 'AI Ready' },
                    { icon: '🩺', label: 'HIPAA' },
                    { icon: '🌐', label: '24/7' },
                  ].map((badge, i) => (
                    <Box key={i} sx={{
                      px: 2, py: 1, borderRadius: '12px',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', gap: 0.5,
                    }}>
                      <span className="text-sm">{badge.icon}</span>
                      <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.7rem' }}>
                        {badge.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Bar */}
      <Box sx={{
        bgcolor: 'white', borderBottom: '1px solid #e2e8f0',
        py: 4,
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            textAlign: 'center',
          }}>
            {stats.map((stat, index) => (
              <Box key={index}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#059669', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Innovation Pillars */}
      <Box sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'white',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
              Built for Healthcare Innovation
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 500, mx: 'auto' }}>
              Our platform is built on three core pillars of modern healthcare technology
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}>
            {tracks.map((track, index) => (
              <Box key={index} sx={{
                p: 4, borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.04) 0%, rgba(13, 148, 136, 0.04) 100%)',
                border: '1px solid rgba(5, 150, 105, 0.12)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)',
                  transform: 'translateY(-2px)',
                },
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 2 }}>{track.icon}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  {track.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  {track.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>
              Complete Healthcare Ecosystem
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 600, mx: 'auto', fontSize: '1.05rem' }}>
              From AI-powered diagnostics to emergency care — everything you need for better health outcomes, all in one platform.
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{
                bgcolor: 'white',
                borderRadius: '20px',
                p: 4,
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  transform: 'translateY(-4px)',
                  borderColor: feature.color,
                },
              }}>
                <Box sx={{
                  width: 52, height: 52, borderRadius: '14px',
                  bgcolor: feature.bgColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 2.5, color: feature.color,
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* Testimonials */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
              What Users Say
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Real feedback from healthcare professionals and patients
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {[
              { name: 'Dr. Priya Sharma', role: 'General Physician', text: 'The AI symptom checker is impressively accurate. It helps my patients articulate symptoms better before consultations, saving valuable time.', avatar: '👩‍⚕️' },
              { name: 'Rahul Mehta', role: 'Father of 2', text: 'The dosage calculator is a lifesaver when my kids fall sick at night. Quick, accurate dosing info right when I need it!', avatar: '👨' },
              { name: 'Dr. Anil Kumar', role: 'Cardiologist', text: 'The drug interaction checker catches combinations I sometimes miss in poly-pharmacy cases. A great safety net for clinicians.', avatar: '👨‍⚕️' },
            ].map((t, i) => (
              <Box key={i} sx={{
                p: 4, borderRadius: '20px', bgcolor: 'white',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.06)', transform: 'translateY(-2px)' },
              }}>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className="text-amber-400 text-sm">★</span>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, mb: 3, fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{t.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>{t.role}</Typography>
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>
            Ready to Experience
            <br />
            Smarter Healthcare?
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 4, lineHeight: 1.7 }}>
            Join PeaceMatcher and get instant AI-powered health guidance, connect with doctors, and manage your family&apos;s health in one place.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #059669, #0d9488)',
                  color: '#fff', fontWeight: 700,
                  px: 5, py: 1.5, borderRadius: '14px',
                  boxShadow: '0 8px 25px rgba(5, 150, 105, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #047857, #0f766e)',
                    boxShadow: '0 12px 35px rgba(5, 150, 105, 0.35)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Get Started Free →
              </Button>
            </Link>
            <Link href="/home" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#059669', borderColor: '#059669',
                  fontWeight: 600, px: 4, py: 1.5,
                  borderRadius: '14px',
                  '&:hover': {
                    bgcolor: 'rgba(5, 150, 105, 0.05)',
                    borderColor: '#047857',
                  },
                }}
              >
                Try AI Demo
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}