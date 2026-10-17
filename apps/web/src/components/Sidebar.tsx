import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/candidates', label: 'Daftar Kandidat' },
    { to: '/contents', label: 'Content Explorer' },
    { to: '/ai-findings', label: 'Temuan AI' },
    { to: '/cohorts', label: 'Konteks Cohort' },
    { to: '/cohort-comparison', label: 'Cohort Comparison' },
    { to: '/historical-trend', label: 'Tren Historis' },
    { to: '/data-quality', label: 'Kualitas Data & Sync' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Master Data & Admin' },
  ];

  return (
    <nav
      aria-label="Navigasi utama"
      style={{
        flex: '1 1 232px',
        maxWidth: '260px',
        minWidth: '232px',
        background: '#14202B',
        color: '#C9D3DC',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '24px',
        boxSizing: 'border-box',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ padding: '0 8px' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '.02em' }}>
            DED
          </div>
          <div style={{ fontSize: '12px', lineHeight: 1.4, marginTop: '4px', color: '#9FB0BF' }}>
            Digital Electability Dashboard
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: '#8CA0B2',
              padding: '0 8px 6px',
            }}
          >
            Pemantauan
          </div>
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '9px 12px',
                borderRadius: '6px',
                background: isActive ? '#25394A' : 'transparent',
                color: isActive ? '#fff' : '#C9D3DC',
                fontWeight: isActive ? 600 : 400,
                fontSize: '14px',
                textDecoration: 'none',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: '#8CA0B2',
              padding: '0 8px 6px',
            }}
          >
            Administrasi
          </div>
          {adminLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '9px 12px',
                borderRadius: '6px',
                background: isActive ? '#25394A' : 'transparent',
                color: isActive ? '#fff' : '#C9D3DC',
                fontWeight: isActive ? 600 : 400,
                fontSize: '14px',
                textDecoration: 'none',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 8px',
          borderTop: '1px solid #2A3E50',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#2E4a5E',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {user?.name
            ? user.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()
            : 'AD'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '13px',
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={user?.name}
          >
            {user?.name || 'Administrator'}
          </div>
          <div style={{ fontSize: '11px', color: '#9FB0BF' }}>
            {user?.roleLabel || user?.role || 'Pengguna Terverifikasi'}
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Keluar dari sesi"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '12px',
            color: '#9FB0BF',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: '4px',
          }}
        >
          Keluar
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
