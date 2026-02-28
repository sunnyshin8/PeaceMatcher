'use client';

import { useState, useMemo } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, InputAdornment, IconButton, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps = ['Account Details', 'Personal Info', 'Medical History'];

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: '#ef4444' };
  if (score === 2) return { score, label: 'Fair', color: '#f59e0b' };
  if (score === 3) return { score, label: 'Good', color: '#3b82f6' };
  return { score, label: 'Strong', color: '#059669' };
}

export default function SignUpPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', phone: '', gender: '', dob: '',
    allergies: '', conditions: '', medications: '',
  });

  const passwordStrength = useMemo(() => getPasswordStrength(formData.password), [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.email || !formData.password || !formData.confirmPassword) return 'Please fill in all required fields';
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
      if (formData.password.length < 8) return 'Password must be at least 8 characters';
    }
    if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName) return 'Please fill in your name';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: `${formData.firstName} ${formData.lastName}`, loggedIn: true }));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputSx = { '& .MuiOutlinedInput-root': { borderRadius: '12px' } };

  const stepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField fullWidth label="Email" name="email" type="email" required
              value={formData.email} onChange={handleInputChange} margin="normal" sx={inputSx} />
            <TextField fullWidth label="Password" name="password" required
              type={showPassword ? 'text' : 'password'}
              value={formData.password} onChange={handleInputChange} margin="normal" sx={inputSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94a3b8' }}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formData.password && (
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: passwordStrength.color, fontWeight: 600 }}>
                    {passwordStrength.label}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {[1, 2, 3, 4].map(i => (
                    <Box key={i} sx={{
                      flex: 1, height: 4, borderRadius: 2,
                      bgcolor: i <= passwordStrength.score ? passwordStrength.color : '#e2e8f0',
                      transition: 'all 0.3s',
                    }} />
                  ))}
                </Box>
              </Box>
            )}
            <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" required
              value={formData.confirmPassword} onChange={handleInputChange} margin="normal" sx={inputSx} />
          </>
        );
      case 1:
        return (
          <>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="First Name" name="firstName" required
                value={formData.firstName} onChange={handleInputChange} margin="normal" sx={inputSx} />
              <TextField fullWidth label="Last Name" name="lastName" required
                value={formData.lastName} onChange={handleInputChange} margin="normal" sx={inputSx} />
            </Box>
            <TextField fullWidth label="Phone Number" name="phone"
              value={formData.phone} onChange={handleInputChange} margin="normal" sx={inputSx} />
            <TextField fullWidth label="Gender" name="gender" select
              value={formData.gender} onChange={handleInputChange} margin="normal" sx={inputSx}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
            </TextField>
            <TextField fullWidth label="Date of Birth" name="dob" type="date"
              value={formData.dob} onChange={handleInputChange} margin="normal"
              InputLabelProps={{ shrink: true }} sx={inputSx} />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              This information helps us provide better healthcare recommendations. All fields are optional.
            </Typography>
            <TextField fullWidth label="Known Allergies" name="allergies" multiline rows={2}
              placeholder="e.g., Penicillin, Peanuts, Latex"
              value={formData.allergies} onChange={handleInputChange} margin="normal" sx={inputSx} />
            <TextField fullWidth label="Existing Conditions" name="conditions" multiline rows={2}
              placeholder="e.g., Diabetes, Hypertension, Asthma"
              value={formData.conditions} onChange={handleInputChange} margin="normal" sx={inputSx} />
            <TextField fullWidth label="Current Medications" name="medications" multiline rows={2}
              placeholder="e.g., Metformin 500mg, Losartan 50mg"
              value={formData.medications} onChange={handleInputChange} margin="normal" sx={inputSx} />
          </>
        );
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0ea5e9 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2,
    }}>
      <Container maxWidth="sm">
        <Box sx={{
          bgcolor: '#fff', borderRadius: '24px', p: 5,
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: '16px',
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Box>
          </Box>

          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4, color: '#64748b' }}>
            Join PeaceMatcher for personalized healthcare
          </Typography>

          {/* Stepper */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
            {steps.map((label, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                  bgcolor: i <= activeStep ? '#059669' : '#e2e8f0',
                  color: i <= activeStep ? '#fff' : '#94a3b8',
                  transition: 'all 0.3s',
                }}>
                  {i + 1}
                </Box>
                <Typography variant="caption" sx={{
                  color: i <= activeStep ? '#059669' : '#94a3b8',
                  fontWeight: i === activeStep ? 700 : 400,
                  display: { xs: 'none', sm: 'block' },
                }}>
                  {label}
                </Typography>
                {i < steps.length - 1 && (
                  <Box sx={{ width: 32, height: 2, bgcolor: i < activeStep ? '#059669' : '#e2e8f0', mx: 0.5, transition: 'all 0.3s' }} />
                )}
              </Box>
            ))}
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            {stepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}
                sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>
                ← Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button variant="contained" type="submit" disabled={loading}
                  sx={{
                    px: 4, py: 1.5, fontWeight: 700, borderRadius: '14px',
                    background: 'linear-gradient(135deg, #059669, #0d9488)',
                    color: '#fff',
                    '&:hover': { background: 'linear-gradient(135deg, #047857, #0f766e)' },
                    textTransform: 'none',
                  }}>
                  {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create Account'}
                </Button>
              ) : (
                <Button variant="contained" onClick={() => {
                  const err = validateStep();
                  if (err) { setError(err); return; }
                  setError('');
                  handleNext();
                }}
                  sx={{
                    px: 4, py: 1.5, fontWeight: 700, borderRadius: '14px',
                    background: 'linear-gradient(135deg, #059669, #0d9488)',
                    color: '#fff',
                    '&:hover': { background: 'linear-gradient(135deg, #047857, #0f766e)' },
                    textTransform: 'none',
                  }}>
                  Next →
                </Button>
              )}
            </Box>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ textDecoration: 'none', color: '#059669', fontWeight: 600 }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}