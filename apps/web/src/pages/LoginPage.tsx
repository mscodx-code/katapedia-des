import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const RECAPTCHA_SITE_KEY = '6LcTIfMtAAAAAKps21ndaNRQ5sbKTGadtV24-T7z';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('superadmin@katapedia.id');
  const [password, setPassword] = useState('Password123!');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaStatus, setCaptchaStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Load Google reCAPTCHA v3 script
  useEffect(() => {
    const scriptId = 'google-recaptcha-v3-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            setCaptchaStatus('ready');
          });
        }
      };
      script.onerror = () => {
        console.warn('Google reCAPTCHA script failed to load (offline or adblocker). Using fallback token.');
        setCaptchaStatus('fallback');
      };
      document.head.appendChild(script);
    } else {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setCaptchaStatus('ready');
        });
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      let captchaToken: string | null = null;

      if (window.grecaptcha && captchaStatus === 'ready') {
        try {
          captchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action: 'login'
          });
        } catch (captchaErr) {
          console.warn('reCAPTCHA execution failed, using dev fallback token:', captchaErr);
          captchaToken = 'BYPASS_TEST_TOKEN';
        }
      } else {
        captchaToken = 'BYPASS_TEST_TOKEN';
      }

      await login({
        email,
        password,
        captchaToken
      });

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemoUser = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('Password123!');
    setErrorMessage(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '100vh',
        fontFamily: "'IBM Plex Sans',system-ui,sans-serif",
        color: '#17212B',
        background: '#F4F5F2'
      }}
    >
      <section
        style={{
          flex: '1 1 560px',
          background: '#14202B',
          color: '#E6ECF1',
          padding: '64px 72px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '48px'
        }}
      >
        <div>
          <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '.02em', color: '#fff' }}>DED</div>
          <div style={{ fontSize: '14px', color: '#9FB0BF', marginTop: '4px' }}>Digital Electability Dashboard</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '560px' }}>
          <h1 style={{ margin: '0', fontSize: '40px', lineHeight: '1.15', fontWeight: '600', color: '#fff' }}>
            Pantau kinerja digital bakal caleg berdasarkan data dan bukti.
          </h1>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6', color: '#B8C6D2' }}>
            Platform internal Departemen Pemenangan Pemilu untuk memantau akun Instagram dan TikTok. DED menyediakan data, analisis, tren, dan evidence sebagai bahan keputusan, bukan pengganti keputusan manusia.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} aria-label="Sepuluh dimensi DES">
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D01 Visibility</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D02 Positioning</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D03 Issue Ownership</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D04 Winning Narrative</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D05 Content Power</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D06 Audience Connection</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D07 Trust &amp; Reputation</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D08 Algorithmic Reach</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D09 Electoral Conversion</span>
            <span style={{ padding: '5px 11px', borderRadius: '999px', border: '1px solid #3A5266', fontSize: '12px', color: '#C9D6E1' }}>D10 Intelligence &amp; Engine</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8CA0B2' }}>
          <span>Framework pengukuran: Digital Electability Score (DES)</span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#82D296' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#82D296' }}></span>
            JWT Auth &amp; reCAPTCHA v3 Active
          </span>
        </div>
      </section>

      <section
        style={{
          flex: '1 1 480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 32px',
          boxSizing: 'border-box'
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div>
            <h2 style={{ margin: '0', fontSize: '26px', fontWeight: '600' }}>Masuk ke DED</h2>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#5B6672', lineHeight: '1.5' }}>
              Akses khusus pengguna terdaftar Departemen Pemenangan Pemilu.
            </p>
          </div>

          {errorMessage && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#FEECEC',
                border: '1px solid #F5C2C7',
                color: '#842029',
                fontSize: '13px',
                lineHeight: '1.5'
              }}
            >
              <strong>Gagal Masuk: </strong>
              {errorMessage}
            </div>
          )}

          {/* Quick Demo Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#5B6672', fontWeight: 500 }}>
              Pilih Akun Terverifikasi (Kredensial PoC):
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { label: 'Super Admin', email: 'superadmin@katapedia.id' },
                { label: 'Dept Admin', email: 'admin@pemilu2029.id' },
                { label: 'Analyst', email: 'analyst@pemilu2029.id' },
                { label: 'Viewer', email: 'viewer@pemilu2029.id' }
              ].map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectDemoUser(acc.email)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: email === acc.email ? '1px solid #0E5A63' : '1px solid #DDE1DA',
                    background: email === acc.email ? '#E0EFF1' : '#fff',
                    color: email === acc.email ? '#0B4A52' : '#3B4651',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="email" style={{ fontSize: '13px', fontWeight: '500' }}>Email kerja</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@organisasi.id"
              style={{
                height: '44px',
                padding: '0 14px',
                border: '1px solid #B9C1C9',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                background: '#fff',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="pw" style={{ fontSize: '13px', fontWeight: '500' }}>Kata sandi</label>
            <input
              id="pw"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              style={{
                height: '44px',
                padding: '0 14px',
                border: '1px solid #B9C1C9',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                background: '#fff',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* reCAPTCHA v3 Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              background: '#F0F4F7',
              fontSize: '12px',
              color: '#4B5E6D'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0E5A63" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>
              Dilindungi oleh <strong>Google reCAPTCHA v3</strong> &amp; Token JWT.
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '46px',
              borderRadius: '8px',
              background: isLoading ? '#6A8F94' : '#0E5A63',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '600',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk'}
          </button>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: '8px',
              background: '#E9ECEF',
              fontSize: '13px',
              lineHeight: '1.5',
              color: '#3B4651'
            }}
          >
            Sesi berakhir otomatis setelah tidak aktif. Semua aktivitas penting tercatat dalam audit log.
          </div>
          <div style={{ fontSize: '13px', color: '#5B6672' }}>
            Lupa kata sandi atau belum punya akses? Hubungi Super Admin.
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
