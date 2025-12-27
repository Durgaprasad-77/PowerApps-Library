'use client';

import { useState } from 'react';

export function DashboardLayoutPreview() {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = ['Overview', 'Analytics', 'Reports'];

    return (
        <div className="dashboard-preview">
            <style jsx>{`
        .dashboard-preview {
          width: 100%;
          height: 280px;
          background: #0a0a0a;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Segoe UI', sans-serif;
        }
        .top-nav {
          height: 48px;
          background: #111;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: center;
          padding: 0 16px;
          justify-content: space-between;
        }
        .logo {
          color: #fff;
          font-weight: bold;
          font-size: 14px;
        }
        .nav-tabs {
          display: flex;
          gap: 4px;
        }
        .nav-tab {
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          color: #888;
          font-size: 13px;
          transition: all 0.2s;
        }
        .nav-tab:hover {
          color: #fff;
        }
        .nav-tab.active {
          background: #1a1a1a;
          color: #fff;
          font-weight: 500;
        }
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }
        .main-area {
          flex: 1;
          display: flex;
        }
        .sidebar {
          width: 160px;
          background: #0f0f0f;
          padding: 12px 8px;
          border-right: 1px solid #222;
        }
        .sidebar-item {
          padding: 8px 12px;
          border-radius: 6px;
          color: #888;
          font-size: 12px;
          cursor: pointer;
          margin-bottom: 2px;
        }
        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
        .sidebar-section {
          color: #555;
          font-size: 10px;
          text-transform: uppercase;
          padding: 8px 12px 4px 12px;
          margin-top: 8px;
        }
        .content {
          flex: 1;
          padding: 16px;
        }
        .content-header {
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .stats-row {
          display: flex;
          gap: 12px;
        }
        .stat-card {
          flex: 1;
          background: #111;
          border-radius: 8px;
          padding: 12px;
        }
        .stat-label {
          color: #666;
          font-size: 10px;
        }
        .stat-value {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          margin-top: 4px;
        }
        .stat-change {
          color: #22c55e;
          font-size: 11px;
          margin-top: 2px;
        }
      `}</style>

            <div className="top-nav">
                <div className="logo">Dashboard</div>
                <div className="nav-tabs">
                    {tabs.map((tab, index) => (
                        <div
                            key={tab}
                            className={`nav-tab ${selectedTab === index ? 'active' : ''}`}
                            onClick={() => setSelectedTab(index)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="avatar" />
            </div>

            <div className="main-area">
                <div className="sidebar">
                    <div className="sidebar-section">Analytics</div>
                    <div className="sidebar-item">Overview</div>
                    <div className="sidebar-item">Traffic</div>
                    <div className="sidebar-item">Conversions</div>
                    <div className="sidebar-section">Data</div>
                    <div className="sidebar-item">Users</div>
                    <div className="sidebar-item">Revenue</div>
                </div>
                <div className="content">
                    <div className="content-header">{tabs[selectedTab]}</div>
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-label">Total Views</div>
                            <div className="stat-value">45.2K</div>
                            <div className="stat-change">+12.5%</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Visitors</div>
                            <div className="stat-value">12.8K</div>
                            <div className="stat-change">+8.3%</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Revenue</div>
                            <div className="stat-value">$24.5K</div>
                            <div className="stat-change">+18.2%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
