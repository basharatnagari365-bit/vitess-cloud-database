const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: '127.0.0.1', port: 13306, user: 'vitess', password: 'vitess123', database: 'mykeyspace'
});

db.connect(err => { 
  if (err) { console.log('DB Error:', err.message); process.exit(1); }
  else console.log('✅ Vitess Connected to mykeyspace');
});

// Helper to run queries as promise
const query = (sql) => new Promise((resolve, reject) => {
  db.query(sql, (err, results) => err ? reject(err) : resolve(results));
});

// All GET endpoints
app.get('/api/customers', async (req, res) => {
  try { res.json(await query('SELECT * FROM customers')); } 
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/products', async (req, res) => {
  try { res.json(await query('SELECT * FROM products')); } 
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/vendors', async (req, res) => {
  try { res.json(await query('SELECT * FROM vendors')); } 
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/categories', async (req, res) => {
  try { res.json(await query('SELECT * FROM categories')); } 
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/orders', async (req, res) => {
  try {
    const results = await query(`
      SELECT c.name as customer, p.name as product, oi.quantity, o.total_amount, o.status
      FROM orders o 
      JOIN customers c ON o.customer_id = c.customer_id
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
    `);
    res.json(results);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/cluster-info', async (req, res) => {
  try {
    const [customers, products, orders, vendors, categories] = await Promise.all([
      query('SELECT COUNT(*) as total FROM customers'),
      query('SELECT COUNT(*) as total FROM products'),
      query('SELECT COUNT(*) as total FROM orders'),
      query('SELECT COUNT(*) as total FROM vendors'),
      query('SELECT COUNT(*) as total FROM categories'),
    ]);
    
    res.json({
      keyspace: 'mykeyspace',
      shards: 4,
      tablets: 12,
      vtgate: 3,
      vtorc: 4,
      etcd: 3,
      customers: customers[0].total,
      products: products[0].total,
      orders: orders[0].total,
      vendors: vendors[0].total,
      categories: categories[0].total,
      uptime: Math.floor(process.uptime()),
      version: 'Vitess v21.0.6'
    });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.listen(5000, () => console.log('🚀 API Server running on http://localhost:5000'));
