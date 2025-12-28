'use client';

import { useState } from 'react';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

export function AppShellPreview() {
  const { theme } = usePreviewTheme();
  const [activeNav, setActiveNav] = useState(0);
  const navItems = ['Home', 'Dashboard', 'Settings', 'Profile'];

  const shellBg = theme === 'dark' ? '#0a0a0a' : '#f9fafb';
  const sidebarBg = theme === 'dark' ? '#111' : '#ffffff';
  const headerBg = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const borderColor = theme === 'dark' ? '#222' : '#e5e7eb';
  const textColor = theme === 'dark' ? '#fff' : '#111827';
  const textMuted = theme === 'dark' ? '#888' : '#6b7280';
  const cardBg = theme === 'dark' ? '#111' : '#ffffff';
  const activeItemBg = theme === 'dark' ? '#1a1a1a' : '#f3f4f6';
  const hoverItemBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const logoColor = theme === 'dark' ? '#fff' : '#111827';
  const cardLabelColor = theme === 'dark' ? '#666' : '#9ca3af';

  return (
    <div className="app-shell-preview">
      <style jsx>{`
        .app-shell-preview {
          width: 100%;
          height: 280px;
          background: ${shellBg};
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          font-family: 'Segoe UI', sans-serif;
        }
        .sidebar {
          width: 180px;
          background: ${sidebarBg};
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .logo {
          color: ${logoColor};
          font-weight: bold;
          font-size: 16px;
          padding: 8px 12px;
          margin-bottom: 16px;
        }
        .nav-item {
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          color: ${textMuted};
          font-size: 14px;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background: ${hoverItemBg};
          color: ${textColor};
        }
        .nav-item.active {
          background: ${activeItemBg};
          color: ${textColor};
          font-weight: 500;
        }
        .content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .header {
          height: 56px;
          background: ${headerBg};
          border-bottom: 1px solid ${borderColor};
          display: flex;
          align-items: center;
          padding: 0 20px;
          justify-content: space-between;
        }
        .page-title {
          color: ${textColor};
          font-weight: 600;
          font-size: 16px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }
        .main-content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .card {
          background: ${cardBg};
          border-radius: 8px;
          padding: 16px;
          height: 60px;
          box-shadow: ${theme === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'};
        }
        .card-label {
          color: ${cardLabelColor};
          font-size: 11px;
          margin-bottom: 4px;
        }
        .card-value {
          color: ${textColor};
          font-weight: 600;
          font-size: 18px;
        }
      `}</style>

      <div className="sidebar">
        <div className="logo">MyApp</div>
        {navItems.map((item, index) => (
          <div
            key={item}
            className={`nav-item ${activeNav === index ? 'active' : ''}`}
            onClick={() => setActiveNav(index)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="content-area">
        <div className="header">
          <div className="page-title">{navItems[activeNav]}</div>
          <div className="avatar" />
        </div>
        <div className="main-content">
          <div className="card-grid">
            <div className="card">
              <div className="card-label">Total Users</div>
              <div className="card-value">1,234</div>
            </div>
            <div className="card">
              <div className="card-label">Revenue</div>
              <div className="card-value">$12.5K</div>
            </div>
            <div className="card">
              <div className="card-label">Orders</div>
              <div className="card-value">89</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
