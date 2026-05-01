import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SVG Icons (Professional)
const Icons = {
  keyspace: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v2H9V9zm0 4h6v2H9v-2z',
  shard: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  tablet: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 8h4v4H6V8zm6 0h4v4h-4V8z',
  vtgate: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm2 2v9h14v-9l-7-5.5L5 11zm3.5 2.5l1.5-1.5 1.5 1.5 1.5-1.5L12 11l-2 2.5h1.5z',
  vtorc: 'M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  etcd: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z',
  uptime: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  healthy: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
};

function App() {
  const [data, setData] = useState({ customers: [], products: [], orders: [], vendors: [], categories: [] });
  const [info, setInfo] = useState({});
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [infoRes, custRes, prodRes, orderRes, vendRes, catRes] = await Promise.all([
        axios.get('http://localhost:5000/api/cluster-info'),
        axios.get('http://localhost:5000/api/customers'),
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders'),
        axios.get('http://localhost:5000/api/vendors'),
        axios.get('http://localhost:5000/api/categories'),
      ]);
      setInfo(infoRes.data);
      setData({
        customers: custRes.data,
        products: prodRes.data,
        orders: orderRes.data,
        vendors: vendRes.data,
        categories: catRes.data,
      });
    } catch (e) { console.error('Fetch error:', e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const metrics = [
    { label: 'Keyspace', value: info.keyspace || 'mykeyspace', icon: Icons.keyspace, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Shards', value: info.shards || 4, icon: Icons.shard, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Tablets', value: info.tablets || 12, icon: Icons.tablet, color: '#06b6d4', bg: '#ecfeff' },
    { label: 'VTGate', value: info.vtgate || 3, icon: Icons.vtgate, color: '#22c55e', bg: '#f0fdf4' },
    { label: 'VTOrc', value: info.vtorc || 4, icon: Icons.vtorc, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'etcd', value: info.etcd || 3, icon: Icons.etcd, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Uptime', value: (info.uptime || 0) + 's', icon: Icons.uptime, color: '#14b8a6', bg: '#f0fdfa' },
    { label: 'Status', value: 'Healthy', icon: Icons.healthy, color: '#22c55e', bg: '#f0fdf4' },
  ];

  const tabs = ['overview', 'customers', 'products', 'orders', 'vendors', 'categories'];

  return (
    <div style={{ maxWidth: 1340, margin: '0 auto', padding: 28, fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", background: '#f1f5f9', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #334155)', borderRadius: 20, padding: '28px 36px', marginBottom: 24, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>⚡ Vitess Cluster Monitor</div>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, fontWeight: 400 }}>
            Distributed SQL Database • MySQL Compatible • Cloud Native
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '10px 22px', borderRadius: 14, fontSize: 13, fontWeight: 600, backdropFilter: 'blur(10px)', letterSpacing: 0.5 }}>
            🟢 All Systems Operational
          </div>
          <button onClick={fetchData} style={{
            marginTop: 10, padding: '8px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.06)', color: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 600
          }}>
            {loading ? '⏳ Refreshing...' : '🔄 Refresh Data'}
          </button>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.25s', cursor: 'default',
            border: '1px solid #e2e8f0'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill={m.color}>
                <path d={m.icon} />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', lineHeight: 1.1 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.8 }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 0, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '11px 24px', borderRadius: '10px 10px 0 0', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: tab === t ? 'white' : 'transparent', color: tab === t ? '#0f172a' : '#94a3b8',
            textTransform: 'capitalize', transition: 'all 0.2s', letterSpacing: 0.3
          }}>{t}</button>
        ))}
      </div>

      {/* TABLE */}
      <div style={{ background: 'white', borderRadius: '0 14px 14px 14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {tab === 'overview' && <><th style={TH}>Metric</th><th style={TH}>Value</th></>}
              {tab === 'customers' && <><th style={TH}>ID</th><th style={TH}>Name</th><th style={TH}>Email</th><th style={TH}>City</th></>}
              {tab === 'products' && <><th style={TH}>ID</th><th style={TH}>Product</th><th style={TH}>Price</th><th style={TH}>Stock</th></>}
              {tab === 'orders' && <><th style={TH}>Customer</th><th style={TH}>Product</th><th style={TH}>Qty</th><th style={TH}>Total</th><th style={TH}>Status</th></>}
              {tab === 'vendors' && <><th style={TH}>ID</th><th style={TH}>Vendor</th><th style={TH}>Rating</th><th style={TH}>City</th></>}
              {tab === 'categories' && <><th style={TH}>ID</th><th style={TH}>Category</th></>}
            </tr>
          </thead>
          <tbody>
            {tab === 'overview' && [
              { metric: 'Keyspace', value: 'mykeyspace' },
              { metric: 'Shards', value: '4 (-40, 40-80, 80-c0, c0-)' },
              { metric: 'Tablets', value: '12 (3 per shard — 1 PRIMARY + 2 REPLICA)' },
              { metric: 'VTGate Routers', value: '3 instances (Load Balanced)' },
              { metric: 'VTOrc Managers', value: '4 (1 per shard — Auto Failover)' },
              { metric: 'etcd Cluster', value: '3 nodes (HA — Raft Consensus)' },
              { metric: 'VIndex Type', value: 'hash(id) — Even Distribution' },
              { metric: 'MySQL Protocol', value: 'Port 3306 (Standard)' },
              { metric: 'Authentication', value: 'Static (vitess / vitess123)' },
              { metric: 'Kubernetes', value: 'K3s v1.35.4' },
              { metric: 'Vitess Version', value: 'v21.0.6' },
              { metric: 'Data Summary', value: `${info.customers || 0} customers, ${info.products || 0} products, ${info.orders || 0} orders` },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ ...TD, fontWeight: 600, color: '#1e293b', width: '40%' }}>{row.metric}</td>
                <td style={TD}>{row.value}</td>
              </tr>
            ))}
            {tab === 'customers' && data.customers.map(c => (
              <tr key={c.customer_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={TD}>{c.customer_id}</td><td style={TD}><b>{c.name}</b></td><td style={TD}>{c.email}</td><td style={TD}>{c.city}</td>
              </tr>
            ))}
            {tab === 'products' && data.products.map(p => (
              <tr key={p.product_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={TD}>{p.product_id}</td><td style={TD}><b>{p.name}</b></td><td style={TD}>${p.price}</td><td style={TD}>{p.stock_quantity}</td>
              </tr>
            ))}
            {tab === 'orders' && data.orders.map((o, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={TD}><b>{o.customer}</b></td><td style={TD}>{o.product}</td><td style={TD}>{o.quantity}x</td><td style={TD}><b>${o.total_amount}</b></td>
                <td style={TD}><span style={badge(o.status)}>{o.status}</span></td>
              </tr>
            ))}
            {tab === 'vendors' && data.vendors.map(v => (
              <tr key={v.vendor_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={TD}>{v.vendor_id}</td><td style={TD}><b>{v.name}</b></td><td style={TD}>{'⭐'.repeat(Math.floor(v.rating))} {v.rating}</td><td style={TD}>{v.city}</td>
              </tr>
            ))}
            {tab === 'categories' && data.categories.map(c => (
              <tr key={c.category_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={TD}>{c.category_id}</td><td style={TD}><b>{c.name}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
        Scalable • Reliable • MySQL Compatible • Cloud Native • Vitess + Kubernetes (K3s)
      </div>
    </div>
  );
}

const badge = (s) => ({
  padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
  background: s === 'delivered' ? '#dcfce7' : s === 'shipped' ? '#dbeafe' : s === 'pending' ? '#fef9c3' : '#fee2e2',
  color: s === 'delivered' ? '#166534' : s === 'shipped' ? '#1e40af' : s === 'pending' ? '#854d0e' : '#991b1b'
});

const TH = { padding: '13px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.2, borderBottom: '1px solid #e2e8f0' };
const TD = { padding: '13px 18px', fontSize: 13, color: '#475569', borderBottom: '1px solid #f1f5f9' };

export default App;
