# ShadowTrace 🛡️
**AI-Powered Digital Footprint Correlation & DPDP Compliance Suite**

Developed for **HackWithAI 2026** at **KLH University (Bachupally Campus), Hyderabad**.

## 📖 Project Overview
ShadowTrace is an advanced OSINT (Open Source Intelligence) platform built during the 24-hour HackWithAI challenge to solve **Problem Statement #64: Aggregate & Correlate Identifiers**. 

In an era of rising data breaches, ShadowTrace empowers users and privacy professionals to visualize their digital exposure. By orchestrating asynchronous scrapers across global platforms (GitHub, Reddit, Breach Databases), it identifies exposed PII and maps them directly to the **Digital Personal Data Protection (DPDP) Act 2023** framework.

## 🚀 Key Features
- **Deep Identity Correlation**: Uses asynchronous scrapers to link disparate identifiers (emails, usernames) into a unified digital profile.
- **Interactive Identity Graph**: A dynamic D3-inspired visualization engine that maps the "Root Node" to various points of exposure.
- **AI-Driven PII Detection**: Specialized pattern-matching logic to detect sensitive data like Aadhaar, PAN, and Private Keys in raw text.
- **DPDP Act (2023) Auditor**: Automated legal mapping that flags violations of Section 6 (Consent) and Section 8 (Security Safeguards).
- **Secure Operator Dashboard**: Modern, high-performance UI designed for rapid security auditing.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion (Animations), Lucide Icons.
- **Backend**: Python 3.13, FastAPI (Asynchronous Framework), Uvicorn.
- **OSINT Intelligence**: Asyncio, HTTPX, BeautifulSoup4.
- **Legal Logic**: Custom DPDP Compliance Engine & Risk Scorer.

## ⚙️ Installation & Setup (KLH Evaluation Team)

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup
```bash
# From the root directory
pip install -r requirements.txt
python run.py
