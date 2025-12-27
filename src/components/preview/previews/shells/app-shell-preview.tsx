'use client';

import { useState } from 'react';

export function AppShellPreview() {
    const [activeNav, setActiveNav] = useState(0);
    const navItems = ['Home', 'Dashboard', 'Settings', 'Profile'];

    return (
        <div className="app-shell-preview">
            <style jsx>{`
        .app-shell-preview {
          width: 100%;
          height: 280px;
          background: #0a0a0a;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          font-family: 'Segoe UI', sans-serif;
        }
        .sidebar {
          width: 180px;
          background: #111;
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .logo {
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          padding: 8px 12px;
          margin-bottom: 16px;
        }
        .nav-item {
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          color: #888;
          font-size: 14px;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
        .nav-item.active {
          background: #1a1a1a;
          color: #fff;
          font-weight: 500;
        }
        .content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .header {
          height: 56px;
          background: #0f0f0f;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: center;
          padding: 0 20px;
          justify-content: space-between;
        }
        .page-title {
          color: #fff;
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
          background: #111;
          border-radius: 8px;
          padding: 16px;
          height: 60px;
        }
        .card-label {
          color: #666;
          font-size: 11px;
          margin-bottom: 4px;
        }
        .card-value {
          color: #fff;
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
