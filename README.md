# 🗄️ Vitess Cloud-Native Distributed Database

![Vitess](https://img.shields.io/badge/Vitess-v21.0.6-purple)
![Kubernetes](https://img.shields.io/badge/Kubernetes-K3s-blue)
![MySQL](https://img.shields.io/badge/MySQL-Compatible-orange)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)

## 📋 Overview

A **scalable, reliable, MySQL-compatible, cloud-native database** built with **Vitess** on **Kubernetes (K3s)**. Features horizontal sharding, auto-failover, live resharding, and a professional monitoring dashboard.

## 🏗️ Architecture

    React Dashboard (Vitess Cluster Monitor)
              |
              | API Calls
              |
    Node.js Backend (Express)
              |
              | MySQL Protocol
              |
      VTGate (3 instances)
      SQL Router & Load Balancer
              |
    +---------+---------+---------+
    |         |         |         |
 Shard-40  Shard-80  Shard-c0  Shard-FF
 PRIMARY   PRIMARY   PRIMARY   PRIMARY
 +2 REP    +2 REP    +2 REP    +2 REP

   4 Shards, 12 Tablets (Hash-based)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔀 Horizontal Sharding | 4 shards, hash-based on `id` column |
| 🔄 Auto Failover | VTOrc per shard, automatic PRIMARY promotion |
| 📦 Live Resharding | 2 to 4 shards with zero downtime |
| 🛡️ High Availability | 3 tablets/shard + etcd HA (3 nodes) |
| ☁️ Cloud Native | Kubernetes K3s + Helm + Vitess Operator |
| 🔌 MySQL Compatible | Standard MySQL protocol, same SQL |
| 📊 Monitoring | Grafana + Prometheus + VTAdmin API |
| 🖥️ Dashboard | React frontend with real-time cluster monitoring |

## 📊 Database Schema (E-Commerce)

| Table | Rows | Description |
|-------|------|-------------|
| customers | 20 | Customer profiles |
| products | 10 | Product catalog |
| orders | 10 | Customer orders |
| order_items | 12 | Line items per order |
| vendors | 3 | Multi-vendor marketplace |
| categories | 5 | Product categories |

## 🚀 Quick Start

### Prerequisites
- Docker + K3s + Helm
- Node.js 18+
- kubectl configured

### Backend Setup

    cd backend
    npm install
    node server.js

### Frontend Setup

    cd frontend
    npm install
    npm start

### Connect to Vitess

    mysql -h 127.0.0.1 -P 13306 -u vitess -pvitess123

## 🖥️ Available Interfaces

| Interface | URL | Purpose |
|-----------|-----|---------|
| React Dashboard | http://localhost:3000 | Cluster Monitor |
| VTGate Debug | http://localhost:15099 | Query Routing |
| VTOrc UI | http://localhost:16000 | Failover Status |
| Grafana | http://localhost:3000 | Metrics Visualization |
| Prometheus | http://localhost:9090 | Metrics Collection |

## 🛠️ Tech Stack

- **Database:** Vitess v21.0.6
- **Orchestration:** Kubernetes (K3s v1.35.4)
- **Frontend:** React 18
- **Backend:** Node.js + Express
- **Monitoring:** Grafana + Prometheus
- **Package Manager:** Helm

## 📧 Contact

**Basharat** — basharatnagari365@gmail.com

---

⭐ **Star this repo if you found it helpful!**
