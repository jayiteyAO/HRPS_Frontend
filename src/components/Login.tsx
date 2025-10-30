import React, { useState } from 'react';
import styles from './Login.module.css';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { theme, toggle } = useTheme();
  const { login } = useAuth();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const submit = (e: React.FormEvent) => {
     e.preventDefault();
    // Dummy auth: call AuthContext.login and navigate to dashboard
    login({ email, password, remember: true }).then(() => {
      window.location.hash = '/dashboard';
    }).catch((err) => {
      console.error('Login failed', err);
      alert('Login failed');
    });
   };

  return (
    <div className={styles.container}>
      <div className={styles.hero} role="img" aria-label="Team at work background">
        <div className={`${styles.blob} ${styles.b1}`} />
        <div className={`${styles.blob} ${styles.b2}`} />
        <div style={{ zIndex: 2 }}>
          <div className={styles.tag}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 12h18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            HR Payroll Suite
          </div>
          <h1>Smart payroll, effortless compliance</h1>
          <p>Secure payroll processing, benefits, and insights — built for modern teams and powered by Microsoft brand colors.</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.logo}>MS</div>
            <div>
              <div style={{ fontWeight: 800 }}>mPayroll</div>
              <div className={styles.hint}>HR & Payroll Platform</div>
            </div>
          </div>

          <div className={styles.togglerWrap}>
            <button className={styles.toggler} onClick={toggle} aria-label="Toggle theme">
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
              <span style={{ fontSize: 13, fontWeight: 700 }}>{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.input}>
            <label htmlFor="email">Work email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
          </div>

          <div className={styles.input}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <div className={styles.row}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontWeight: 600 }}>
              <input type="checkbox" style={{ width: 16, height: 16 }} /> Remember
            </label>

            <a id="forgot-password" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 600, fontSize: 13 }} href="#forgot-password">Forgot?</a>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <button className={styles.btn} type="submit">Sign in</button>
            <button type="button" className={`${styles.ghost} ${styles.btn}`} onClick={() => alert('SSO not configured')} style={{ background: 'transparent', color: 'var(--muted)' }}>
              Sign in with Microsoft
            </button>
          </div>

          <div className={styles.small}>By continuing, you agree to the platform policies.</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
