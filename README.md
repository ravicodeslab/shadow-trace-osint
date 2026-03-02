# ShadowTrace 🛡️  
### AI-Powered Digital Footprint Correlation & DPDP Compliance Suite  

Developed for **HackWithAI 2026** at **KLH University (Bachupally Campus), Hyderabad**.

---

## 📖 Project Overview

ShadowTrace is an advanced OSINT (Open Source Intelligence) platform built during a 24-hour hackathon to solve **Problem Statement #64: Aggregate & Correlate Identifiers**.

In today’s data-driven world, personal identifiers are scattered across platforms and frequently exposed in breaches. ShadowTrace enables users and privacy professionals to:

- Aggregate fragmented digital identifiers  
- Detect exposed Personally Identifiable Information (PII)  
- Visualize digital footprint exposure  
- Map violations directly to the **Digital Personal Data Protection (DPDP) Act, 2023**

The system combines asynchronous intelligence gathering, AI-powered detection, and automated legal mapping into a unified compliance dashboard.

---

## 🚀 Key Features

### 🔍 Deep Identity Correlation  
Asynchronous scrapers aggregate identifiers (emails, usernames) from multiple public platforms and unify them into a single correlated digital profile.

### 🌐 Interactive Identity Graph  
Dynamic visualization engine inspired by graph-based network modeling. The "Root Node" connects to exposure points across platforms for intuitive analysis.

### 🤖 AI-Driven PII Detection  
Pattern recognition and structured detection logic identify:
- Aadhaar Numbers  
- PAN Numbers  
- Email Addresses  
- Private Keys  
- Sensitive Tokens  

### ⚖️ DPDP Act (2023) Compliance Auditor  
Automated mapping engine that flags potential violations under:
- Section 6 (Consent)  
- Section 8 (Security Safeguards)  

Includes a built-in risk scoring system.

### 🧭 Secure Operator Dashboard  
High-performance modern interface optimized for rapid auditing and analysis.

---

## 🛠️ Tech Stack

### Frontend
- React 19  
- Vite  
- Tailwind CSS 4  
- Framer Motion  
- Lucide Icons  

### Backend
- Python 3.13  
- FastAPI (Asynchronous API Framework)  
- Uvicorn  

### Intelligence Layer
- Asyncio  
- HTTPX  
- BeautifulSoup4  

### Legal & Risk Engine
- Custom DPDP Compliance Logic  
- Risk Scoring Module  

---

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.10+  
- Node.js 18+  

---

## 1️⃣ Backend Setup

From the root directory:

```bash
pip install -r requirements.txt
python run.py
or   pip install fastapi uvicorn httpx pydantic pydantic[email] email-validator python-dotenv
```

The backend server will typically start at:

```
http://localhost:8000
```

---

## 2️⃣ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically run at:

```
http://localhost:5173
```

---

## 🧠 Architecture Summary

ShadowTrace follows a modular architecture:

1. Async Scraper Engine → Collects OSINT data  
2. Correlation Engine → Links identifiers  
3. PII Detection Layer → Detects sensitive information  
4. DPDP Compliance Engine → Maps violations  
5. Visualization Layer → Graph-based UI  

This separation ensures scalability, maintainability, and real-time performance.

---

## 🔐 Security & Ethical Use

- Designed for educational and ethical security research purposes  
- Does not store scraped data permanently  
- Intended strictly for lawful compliance auditing  

---

## 📌 Hackathon Context

Built during a 24-hour rapid development sprint at HackWithAI 2026, ShadowTrace demonstrates:

- Asynchronous backend engineering  
- Legal-tech integration  
- OSINT automation  
- AI-assisted compliance auditing  
- Full-stack system design under time constraints  

---

## 📈 Future Improvements

- OAuth-based secure authentication  
- Persistent encrypted storage  
- Advanced ML-based entity resolution  
- Real-time breach API integrations  
- Production deployment configuration  

---
