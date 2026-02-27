# ShadowTrace 🛡️
**OSINT & Privacy Intelligence Suite with DPDP Compliance Auditing**

ShadowTrace is a high-performance privacy intelligence platform designed to aggregate, correlate, and audit digital footprints across global platforms. Built for the modern security landscape, it addresses **Problem Statement #64** by transforming raw OSINT data into actionable privacy insights.

## 🚀 Key Features
- **Deep Identity Correlation**: Aggregates data from GitHub, Reddit, Pastebin, and breach databases to build unified identifier clusters.
- **AI-Powered PII Detector**: Regex-driven engine to identify Aadhaar, PAN, Emails, and Private Keys within raw datasets.
- **DPDP Compliance Auditor**: Real-time mapping of discovered data leaks to the **Digital Personal Data Protection Act (2023)**.
- **Interactive Identity Graph**: Dynamic visualization of interconnected digital nodes and identifier relationships.
- **Secure Operator Node**: Authenticated dashboard with session persistence and automated search history logs.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion (Animations), Lucide React (Icons).
- **Backend**: Python 3.13, FastAPI (Async Web Framework), Uvicorn.
- **OSINT Logic**: Asynchronous Scrapers (Asyncio), HTTPX, BeautifulSoup4.
- **Intelligence**: Custom PII Regex Processor, Risk Scoring Engine, DPDP Legal Mapper.

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### 2. Backend Setup
Navigate to the root directory and install dependencies:
```bash
pip install -r requirements.txt
