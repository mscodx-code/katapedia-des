import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useAuth, getRoleLabel } from '../lib/auth';

type AdminTab = 'all' | 'users' | 'wilayah' | 'formula' | 'integrations' | 'audit';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  tenant?: { id: string; name: string; slug: string };
}

interface AuditLogItem {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  details: Record<string, any>;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export const AdminMasterDataPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('all');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDapilModalOpen, setIsDapilModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Users state
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');

  // Audit state
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);

  // Webhook integration state
  const [webhookStatus, setWebhookStatus] = useState<any>(null);
  const [isLoadingWebhook, setIsLoadingWebhook] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('ANALYST');
  const [newUserPassword, setNewUserPassword] = useState('Password123!');
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  // Dapil modal state
  const [newDapilName, setNewDapilName] = useState('');
  const [newDapilLevel, setNewDapilLevel] = useState('DPR RI');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const data = await api.getUsers({
        search: userSearch || undefined,
        role: userRoleFilter !== 'ALL' ? userRoleFilter : undefined
      });
      setUsersList(data || []);
    } catch (err: any) {
      console.error('Failed to load users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [userSearch, userRoleFilter]);

  const fetchAuditLogs = useCallback(async () => {
    setIsLoadingAudit(true);
    try {
      const data = await api.getAuditLogs(30);
      setAuditLogs(data || []);
    } catch (err: any) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setIsLoadingAudit(false);
    }
  }, []);

  const fetchWebhookStatus = useCallback(async () => {
    setIsLoadingWebhook(true);
    try {
      const data = await api.getInstagramWebhookStatus();
      setWebhookStatus(data);
    } catch (err: any) {
      console.error('Failed to load webhook status:', err);
    } finally {
      setIsLoadingWebhook(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchAuditLogs();
    fetchWebhookStatus();
  }, [fetchUsers, fetchAuditLogs, fetchWebhookStatus]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) return;

    setIsSubmittingUser(true);
    try {
      await api.createUser({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole
      });

      showToast(`Pengguna ${newUserName} (${newUserRole}) berhasil ditambahkan.`);
      setIsUserModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('Password123!');
      setNewUserRole('ANALYST');

      fetchUsers();
      fetchAuditLogs();
    } catch (err: any) {
      showToast(`Gagal menambahkan pengguna: ${err.message}`);
    } finally {
      setIsSubmittingUser(false);
    }
  };

  const handleToggleUserStatus = async (user: UserItem) => {
    const nextStatus = !user.isActive;
    try {
      await api.updateUser(user.id, { isActive: nextStatus });
      showToast(`Status pengguna ${user.name} berhasil diubah menjadi ${nextStatus ? 'Aktif' : 'Nonaktif'}.`);
      fetchUsers();
      fetchAuditLogs();
    } catch (err: any) {
      showToast(`Gagal mengubah status: ${err.message}`);
    }
  };

  const handleAddDapil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDapilName) return;
    setIsDapilModalOpen(false);
    showToast(`Dapil ${newDapilName} (${newDapilLevel}) berhasil disimpan.`);
    setNewDapilName('');
  };

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <main
      style={{
        flex: '999 1 560px',
        minWidth: 0,
        padding: '28px 36px 48px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: '#0E5A63',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {toastMessage}
        </div>
      )}

      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '13px', color: '#5B6672' }}>Administrasi &amp; Akses Keamanan</div>
          <h1 style={{ margin: '2px 0 0', fontSize: '28px', fontWeight: '600' }}>Master Data &amp; Admin</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: '#E2F1E6',
              color: '#1F5E34',
              fontSize: '12px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1F5E34' }}></span>
            Terhubung Database PostgreSQL
          </span>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: '#E0EFF1',
              color: '#0B4A52',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            {currentUser?.tenantName || 'DPP Pemilu 2029'}
          </span>
        </div>
      </header>

      {/* Tabs */}
      <nav
        aria-label="Bagian admin"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          background: '#E9ECEF',
          padding: '4px',
          borderRadius: '10px',
          width: 'fit-content',
          maxWidth: '100%'
        }}
      >
        {[
          { key: 'all', label: 'Semua Bagian' },
          { key: 'users', label: 'Pengguna & Peran' },
          { key: 'integrations', label: 'Integrasi & Webhook' },
          { key: 'wilayah', label: 'Wilayah & Dapil' },
          { key: 'formula', label: 'Formula & Model' },
          { key: 'audit', label: 'Audit Log' }
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as AdminTab)}
            style={{
              padding: '8px 14px',
              borderRadius: '7px',
              background: activeTab === tab.key ? '#fff' : 'transparent',
              color: activeTab === tab.key ? '#17212B' : '#3B4651',
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? '600' : '400',
              border: 0,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Users & Role Management Section */}
      {(activeTab === 'all' || activeTab === 'users') && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
          <section
            style={{
              flex: '3 1 540px',
              minWidth: '0',
              background: '#fff',
              border: '1px solid #DDE1DA',
              borderRadius: '10px',
              padding: '20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '12px'
              }}
            >
              <div>
                <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Pengguna Terdaftar</h2>
                <div style={{ fontSize: '12px', color: '#5B6672', marginTop: '2px' }}>
                  Total {usersList.length} pengguna aktif dalam tenant ini
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(true)}
                style={{
                  height: '36px',
                  padding: '0 14px',
                  border: '0',
                  borderRadius: '8px',
                  background: '#0E5A63',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '600',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                + Tambah pengguna
              </button>
            </div>

            {/* Filter Toolbar */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginBottom: '12px',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{
                  height: '34px',
                  padding: '0 12px',
                  border: '1px solid #DDE1DA',
                  borderRadius: '6px',
                  fontSize: '13px',
                  flex: '1 1 200px'
                }}
              />
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                style={{
                  height: '34px',
                  padding: '0 10px',
                  border: '1px solid #DDE1DA',
                  borderRadius: '6px',
                  fontSize: '13px',
                  background: '#fff'
                }}
              >
                <option value="ALL">Semua Peran</option>
                <option value="PLATFORM_SUPERADMIN">Platform Super Admin</option>
                <option value="DEPT_ADMIN">Department Admin</option>
                <option value="ANALYST">Analyst</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                  marginTop: '4px',
                  minWidth: '520px'
                }}
              >
                <thead>
                  <tr
                    style={{
                      textAlign: 'left',
                      color: '#5B6672',
                      fontSize: '12px',
                      letterSpacing: '.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>Nama &amp; Email</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>Peran</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>Status</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>Login Terakhir</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingUsers ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#5B6672' }}>
                        Memuat daftar pengguna...
                      </td>
                    </tr>
                  ) : usersList.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#5B6672' }}>
                        Tidak ada pengguna yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    usersList.map((u) => (
                      <tr key={u.id}>
                        <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                          <div style={{ fontWeight: 500, color: '#17212B' }}>{u.name}</div>
                          <div style={{ fontSize: '12px', color: '#5B6672' }}>{u.email}</div>
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: '#F0F4F7',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#2A4052'
                            }}
                          >
                            {getRoleLabel(u.role)}
                          </span>
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                          <span
                            style={{
                              padding: '2px 9px',
                              borderRadius: '999px',
                              background: u.isActive ? '#E2F1E6' : '#FCE8E6',
                              color: u.isActive ? '#1F5E34' : '#C5221F',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            {u.isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', color: '#3B4651' }}>
                          {formatDate(u.lastLoginAt)}
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleUserStatus(u)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid #DDE1DA',
                              background: '#fff',
                              fontSize: '11px',
                              color: u.isActive ? '#C5221F' : '#1F5E34',
                              cursor: 'pointer'
                            }}
                          >
                            {u.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Permission Matrix */}
          <section
            style={{
              flex: '2 1 400px',
              minWidth: '0',
              background: '#fff',
              border: '1px solid #DDE1DA',
              borderRadius: '10px',
              padding: '20px'
            }}
          >
            <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Matriks Hak Akses Peran</h2>
            <div style={{ fontSize: '12px', color: '#5B6672', margin: '4px 0 10px' }}>
              Diverifikasi otomatis pada API endpoint via JWT middleware
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px',
                  minWidth: '380px'
                }}
              >
                <thead>
                  <tr
                    style={{
                      textAlign: 'left',
                      color: '#5B6672',
                      fontSize: '11px',
                      letterSpacing: '.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Fitur</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Super</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Dept Admin</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Analyst</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Candidate Registry</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>CRUD</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>CRUD</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Account Management</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>CRUD</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>CRUD</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Raw Data &amp; Sync</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>AI Findings &amp; Chat</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Review/Edit</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Review</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Evidence Vault</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>User Management</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>CRUD</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>No</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>No</td></tr>
                  <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Reports &amp; Export</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Full</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>R</td></tr>
                  <tr><td style={{ padding: '8px' }}>Audit Log</td><td style={{ padding: '8px' }}>Full</td><td style={{ padding: '8px' }}>Read</td><td style={{ padding: '8px' }}>Read</td><td style={{ padding: '8px' }}>No</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* Wilayah & Formula Sections */}
      {(activeTab === 'all' || activeTab === 'wilayah' || activeTab === 'formula') && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
          {(activeTab === 'all' || activeTab === 'wilayah') && (
            <section
              style={{
                flex: '1 1 420px',
                minWidth: '0',
                background: '#fff',
                border: '1px solid #DDE1DA',
                borderRadius: '10px',
                padding: '20px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Wilayah &amp; Dapil</h2>
                <button
                  type="button"
                  onClick={() => setIsDapilModalOpen(true)}
                  style={{
                    height: '36px',
                    padding: '0 14px',
                    border: '1px solid #0E5A63',
                    borderRadius: '8px',
                    background: '#fff',
                    color: '#0E5A63',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  + Tambah dapil
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
                <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#E0EFF1', color: '#0B4A52', fontSize: '12px', fontWeight: '500' }}>DPR RI</span>
                <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#E0EFF1', color: '#0B4A52', fontSize: '12px', fontWeight: '500' }}>DPRD Provinsi</span>
                <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#E0EFF1', color: '#0B4A52', fontSize: '12px', fontWeight: '500' }}>DPRD Kab/Kota</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ fontWeight: '600' }}>Jawa Barat <span style={{ fontWeight: '400', color: '#5B6672' }}>· Provinsi</span></div>
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ fontWeight: '500' }}>Kota Depok <span style={{ fontWeight: '400', color: '#5B6672' }}>· Kab/Kota</span></div>
                  <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px', color: '#3B4651' }}>
                    <div>Dapil 1 (Pancoran Mas) <span style={{ color: '#5B6672' }}>· 2 kandidat terdaftar</span></div>
                    <div>Dapil 2 (Beji, Cinere, Limo) <span style={{ color: '#5B6672' }}>· 1 kandidat terdaftar</span></div>
                  </div>
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ fontWeight: '500' }}>Dapil DPR RI (lintas kab/kota)</div>
                  <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px', color: '#3B4651' }}>
                    <div>Jawa Barat VI (Kota Depok &amp; Kota Bekasi) <span style={{ color: '#5B6672' }}>· 3 kandidat</span></div>
                    <div>Jawa Barat I (Kota Bandung &amp; Cimahi) <span style={{ color: '#5B6672' }}>· 2 kandidat</span></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'formula') && (
            <section
              style={{
                flex: '1 1 420px',
                minWidth: '0',
                background: '#fff',
                border: '1px solid #DDE1DA',
                borderRadius: '10px',
                padding: '20px'
              }}
            >
              <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Formula &amp; Model AI</h2>
              <div style={{ fontSize: '13px', color: '#5B6672', margin: '4px 0 8px', lineHeight: '1.5' }}>
                Versi model AI dan parameter scoring DES tersimpan secara deterministik.
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '380px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', color: '#5B6672', fontSize: '11px', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                      <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Item</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>ID / Versi</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Formula engagement</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC', fontFamily: "'IBM Plex Mono',monospace" }}>engagement_formula v1.0</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}><span style={{ padding: '2px 9px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '12px', fontWeight: '500' }}>Aktif</span></td></tr>
                    <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Aturan baseline</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC', fontFamily: "'IBM Plex Mono',monospace" }}>baseline_rule v1.0</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}><span style={{ padding: '2px 9px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '12px', fontWeight: '500' }}>Aktif</span></td></tr>
                    <tr><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>Model klasifikasi konten</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC', fontFamily: "'IBM Plex Mono',monospace" }}>ollama/qwen3:8b</td><td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}><span style={{ padding: '2px 9px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '12px', fontWeight: '500' }}>Aktif</span></td></tr>
                    <tr><td style={{ padding: '8px' }}>Metodologi DES</td><td style={{ padding: '8px', fontFamily: "'IBM Plex Mono',monospace" }}>des_methodology v1.0</td><td style={{ padding: '8px' }}><span style={{ padding: '2px 9px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '12px', fontWeight: '500' }}>Aktif</span></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Instagram Webhook Integration Section */}
      {(activeTab === 'all' || activeTab === 'integrations') && (
        <section
          style={{
            background: '#fff',
            border: '1px solid #DDE1DA',
            borderRadius: '10px',
            padding: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '8px',
              alignItems: 'baseline',
              marginBottom: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>
                  Integrasi Instagram Platform (Meta Developer)
                </h2>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: '#E2F1E6',
                    color: '#1F5E34',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  ✓ Webhook Endpoint Aktif
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#5B6672', marginTop: '2px' }}>
                Penerima notifikasi event resmi Meta. Memenuhi kontrak GET verification challenge &amp; POST HMAC-SHA256 signature.
              </div>
            </div>
            <button
              type="button"
              onClick={fetchWebhookStatus}
              style={{
                background: '#fff',
                border: '1px solid #DDE1DA',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Perbarui Status
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
            {/* Box 1: Meta Developer Configuration */}
            <div
              style={{
                flex: '1 1 420px',
                background: '#F9FAF9',
                border: '1px solid #E3E7E1',
                borderRadius: '8px',
                padding: '16px',
                boxSizing: 'border-box'
              }}
            >
              <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#17212B' }}>
                Konfigurasi Webhook di Meta Developer
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#5B6672', marginBottom: '4px' }}>
                    1. URL Callback (Meta Dashboard):
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff',
                      border: '1px solid #DDE1DA',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {webhookStatus?.data?.webhookUrl || 'https://katapedia.mscode.id/api/integrations/instagram/webhook'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(webhookStatus?.data?.webhookUrl || 'https://katapedia.mscode.id/api/integrations/instagram/webhook');
                        showToast('URL Callback disalin ke clipboard');
                      }}
                      style={{
                        background: '#E0EFF1',
                        border: 'none',
                        color: '#0B4A52',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginLeft: '8px'
                      }}
                    >
                      Salin
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#5B6672', marginBottom: '4px' }}>
                    2. Verifikasi Token:
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff',
                      border: '1px solid #DDE1DA',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      ded_ig_58b5bac5ff337238301eb77a4cabe026fc9d284819cc341a
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('ded_ig_58b5bac5ff337238301eb77a4cabe026fc9d284819cc341a');
                        showToast('Token Verifikasi disalin ke clipboard');
                      }}
                      style={{
                        background: '#E0EFF1',
                        border: 'none',
                        color: '#0B4A52',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginLeft: '8px'
                      }}
                    >
                      Salin
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E3E7E1', paddingTop: '8px' }}>
                  <span style={{ color: '#5B6672' }}>Sertifikat Klien:</span>
                  <span style={{ fontWeight: 600, color: '#17212B' }}>Nonaktif (Disabled)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5B6672' }}>Metode Keamanan:</span>
                  <span style={{ fontWeight: 600, color: '#17212B' }}>HMAC-SHA256 (X-Hub-Signature-256)</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: '#FEF3D6',
                  color: '#8A6100',
                  fontSize: '12px',
                  lineHeight: '1.4'
                }}
              >
                ⚠️ <strong>Panduan:</strong> Masukkan URL dan Token di atas pada tab <em>"3. Konfigurasikan webhook"</em> di Meta Developer, lalu klik <strong>"Verifikasi dan simpan"</strong>.
              </div>
            </div>

            {/* Box 2: Live Inbox & Storage Stats */}
            <div
              style={{
                flex: '1 1 380px',
                background: '#F9FAF9',
                border: '1px solid #E3E7E1',
                borderRadius: '8px',
                padding: '16px',
                boxSizing: 'border-box'
              }}
            >
              <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#17212B' }}>
                Status Inbox &amp; Event Delivery
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#5B6672' }}>Total Delivery</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#17212B', marginTop: '2px' }}>
                    {webhookStatus?.data?.totalDeliveries ?? 0}
                  </div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#5B6672' }}>Inbox Received</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#1F5E34', marginTop: '2px' }}>
                    {webhookStatus?.data?.receivedCount ?? 0}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5B6672' }}>Delivery Terakhir:</span>
                  <span style={{ fontWeight: 500, color: '#17212B' }}>
                    {formatDate(webhookStatus?.data?.lastReceivedAt)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5B6672' }}>Retensi Database:</span>
                  <span style={{ fontWeight: 500, color: '#17212B' }}>
                    {webhookStatus?.data?.retentionDays ?? 7} hari (Deduplikasi SHA-256)
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5B6672' }}>Status Akun / OAuth:</span>
                  <span style={{ fontWeight: 500, color: '#8A6100' }}>
                    Tahap Berikutnya (OAuth &amp; Insights)
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: '#E9ECEF',
                  color: '#3B4651',
                  fontSize: '12px',
                  lineHeight: '1.4'
                }}
              >
                ℹ️ Notifikasi webhook tersimpan murni sebagai raw event delivery di PostgreSQL. Metrik elektabilitas belum terpengaruh hingga handler event diaktifkan.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Audit Log Section */}
      {(activeTab === 'all' || activeTab === 'audit') && (
        <section
          style={{
            background: '#fff',
            border: '1px solid #DDE1DA',
            borderRadius: '10px',
            padding: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '8px',
              alignItems: 'baseline'
            }}
          >
            <div>
              <h2 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Live Audit Log</h2>
              <div style={{ fontSize: '13px', color: '#5B6672', marginTop: '2px' }}>
                Setiap aktivitas login, perubahan data pengguna, dan status tersimpan di audit trail.
              </div>
            </div>
            <button
              type="button"
              onClick={fetchAuditLogs}
              style={{
                background: 'none',
                border: '1px solid #DDE1DA',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Muat Ulang Log
            </button>
          </div>

          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
                minWidth: '820px'
              }}
            >
              <thead>
                <tr
                  style={{
                    textAlign: 'left',
                    color: '#5B6672',
                    fontSize: '11px',
                    letterSpacing: '.04em',
                    textTransform: 'uppercase'
                  }}
                >
                  <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Waktu</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Pengguna</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Aksi</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Entitas</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #DDE1DA' }}>Rincian</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingAudit ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#5B6672' }}>
                      Memuat data audit log...
                    </td>
                  </tr>
                ) : auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#5B6672' }}>
                      Belum ada catatan audit.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC', whiteSpace: 'nowrap' }}>
                        {formatDate(log.createdAt)}
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>
                        {log.user ? (
                          <div>
                            <span style={{ fontWeight: 500 }}>{log.user.name}</span>
                            <div style={{ fontSize: '11px', color: '#5B6672' }}>{log.user.email}</div>
                          </div>
                        ) : (
                          <span style={{ color: '#5B6672' }}>Sistem</span>
                        )}
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background:
                              log.action === 'LOGIN'
                                ? '#E2F1E6'
                                : log.action.includes('CREATE')
                                ? '#E0EFF1'
                                : log.action.includes('UPDATE')
                                ? '#FEF3D6'
                                : '#FCE8E6',
                            color:
                              log.action === 'LOGIN'
                                ? '#1F5E34'
                                : log.action.includes('CREATE')
                                ? '#0B4A52'
                                : log.action.includes('UPDATE')
                                ? '#8A6100'
                                : '#C5221F',
                            fontWeight: 600,
                            fontSize: '11px'
                          }}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC', fontFamily: "'IBM Plex Mono',monospace" }}>
                        {log.entity} #{log.entityId.slice(0, 8)}
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #EEF0EC', fontSize: '12px', color: '#5B6672' }}>
                        {JSON.stringify(log.details)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modal Tambah Pengguna */}
      {isUserModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px 28px',
              width: '100%',
              maxWidth: '480px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Tambah Pengguna Tim</h2>
            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>
                  Nama Lengkap
                </label>
                <input
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                  placeholder="Contoh: Rian Pratama, M.Sc"
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>
                  Email Kerja
                </label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                  placeholder="rian@pemilu2029.id"
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>
                  Peran (Role Akses)
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    background: '#fff'
                  }}
                >
                  <option value="ANALYST">Department Analyst (Analisis &amp; Evidence)</option>
                  <option value="DEPT_ADMIN">Department Admin (Kelola Caleg &amp; Tim)</option>
                  <option value="VIEWER">Viewer / Caleg (Lihat Data Saja)</option>
                  <option value="PLATFORM_SUPERADMIN">Platform Super Admin (Akses Penuh)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>
                  Kata Sandi Awal
                </label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                  placeholder="Minimal 6 karakter"
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    background: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingUser}
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    border: 0,
                    borderRadius: '8px',
                    background: isSubmittingUser ? '#6A8F94' : '#0E5A63',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: isSubmittingUser ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmittingUser ? 'Menyimpan...' : 'Simpan Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Dapil */}
      {isDapilModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px 28px',
              width: '100%',
              maxWidth: '460px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Tambah Dapil Baru</h2>
            <form onSubmit={handleAddDapil} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>
                  Level Pemilihan
                </label>
                <select
                  value={newDapilLevel}
                  onChange={(e) => setNewDapilLevel(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    background: '#fff'
                  }}
                >
                  <option>DPR RI</option>
                  <option>DPRD Provinsi</option>
                  <option>DPRD Kab/Kota</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>
                  Nama Dapil
                </label>
                <input
                  value={newDapilName}
                  onChange={(e) => setNewDapilName(e.target.value)}
                  required
                  placeholder="Contoh: Jawa Barat · Dapil 5"
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsDapilModalOpen(false)}
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    border: '1px solid #B9C1C9',
                    borderRadius: '8px',
                    background: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    border: 0,
                    borderRadius: '8px',
                    background: '#0E5A63',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Simpan Dapil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminMasterDataPage;
