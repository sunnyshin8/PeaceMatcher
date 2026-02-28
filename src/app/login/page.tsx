'use client';

import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!formData.email || !formData.password) throw new Error('Please fill in all fields');
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('user', JSON.stringify({ email: formData.email, loggedIn: true }));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
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
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4, color: '#64748b' }}>
            Sign in to access your healthcare dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" name="email" type="email"
              value={formData.email} onChange={handleInputChange} margin="normal" required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
            <TextField fullWidth label="Password" name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password} onChange={handleInputChange} margin="normal" required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
            <Box sx={{ mt: 1, mb: 3 }}>
              <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: '#059669', fontWeight: 500, '&:hover': { color: '#047857' } }}>
                  Forgot password?
                </Typography>
              </Link>
            </Box>
            <Button fullWidth variant="contained" size="large" type="submit" disabled={loading}
              sx={{
                mb: 2, py: 1.5, fontSize: '1rem', fontWeight: 700, borderRadius: '14px',
                background: 'linear-gradient(135deg, #059669, #0d9488)',
                color: '#fff',
                boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #047857, #0f766e)',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
                transition: 'all 0.2s',
              }}>
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Don&apos;t have an account?{' '}
              <Link href="/signup" style={{ textDecoration: 'none', color: '#059669', fontWeight: 600 }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}