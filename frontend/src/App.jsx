import React, { useState, useEffect } from 'react';
import { 
  Shield, Search, LayoutDashboard, FileText, 
  AlertTriangle, Settings, ExternalLink, ShieldCheck, 
  Globe, Fingerprint, Lock, Database, Info, Share2, Server,
  User, History, LogOut, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- HELPER COMPONENT: IDENTITY GRAPH ---
function IdentityGraph({ results, userEmail }) {
  const nodes = results && results.exposures.length > 0 
    ? results.exposures.map((exp, idx) => ({
        id: idx + 1,
        label: exp.match || exp.platform,
        type: exp.platform,
        x: Math.cos(idx * 1.5) * 200,
        y: Math.sin(idx * 1.5) * 150
      }))
    : [
        { id: 1, label: 'md-rasheed-dev', type: 'GitHub', x: -160, y: -80 },
        { id: 2, label: userEmail || 'operator@shadowtrace.io', type: 'Email', x: 180, y: -120 },
        { id: 3, label: '+91 98XXX XXX01', type: 'Phone', x: 200, y: 100 },
        { id: 4, label: 'u/rasheed_aiml', type: 'Reddit', x: -180, y: 120 },
      ];

  return (
    <div className="relative h-[600px] w-full bg-[#0d0d0e] rounded-3xl border border-[#27272a] overflow-hidden flex items-center justify-center shadow-inner">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="z-10 bg-blue-600 p-8 rounded-full shadow-[0_0_60px_rgba(37,99,235,0.6)] border-4 border-blue-400/50 flex flex-col items-center"
      >
        <Fingerprint size={48} className="text-white" />
        <span className="text-[10px] font-black mt-2 text-white/80 uppercase">Root Node</span>
      </motion.div>

      {nodes.map((node) => (
        <React.Fragment key={node.id}>
          <motion.div 
            initial={{ width: 0 }} animate={{ width: 250 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute h-[1px] bg-gradient-to-r from-blue-600 to-transparent origin-left opacity-40"
            style={{ 
              transform: `rotate(${Math.atan2(node.y, node.x)}rad)`,
              left: '50%', top: '50%'
            }}
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + node.id * 0.1 }}
            className="absolute bg-[#161618]/95 backdrop-blur-md border border-[#27272a] p-4 rounded-2xl shadow-2xl flex flex-col items-center min-w-[150px]"
            style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{node.type}</span>
            </div>
            <span className="text-xs font-mono font-bold truncate max-w-[130px]">{node.label}</span>
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [targetInput, setTargetInput] = useState('');
  
  // LOGIN & PROFILE STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  
  // STATE FOR REAL BACKEND DATA
  const [scanResults, setScanResults] = useState({
    target: '',
    total_leaks: 0,
    risk_score: 0,
    exposures: []
  });

  // REMOVED STRONG SECURITY - Simple check only
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginPass.length > 0) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter any password to authorize.");
    }
  };

  const handleScan = async () => {
    if (!targetInput) return alert("Please enter a target email or username");

    setIsScanning(true);
    setScanComplete(false);
    
    try {
      const response = await fetch("http://localhost:8000/api/v1/scan/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          target_email: targetInput,
          target_username: targetInput.includes('@') ? '' : targetInput 
        }),
      });

      if (!response.ok) throw new Error("Backend unreachable");
      const data = await response.json();
      
      setScanResults(data);
      setScanComplete(true);
      
      // Update Search History
      setSearchHistory(prev => [{
        id: Date.now(),
        query: targetInput,
        timestamp: new Date().toLocaleTimeString(),
        score: data.risk_score,
        findings: data.total_leaks
      }, ...prev].slice(0, 10));

    } catch (error) {
      console.error("Scan failed:", error);
      alert("Error: Check if backend is running or PII detector regex is correct");
    } finally {
      setIsScanning(false);
    }
  };

  // --- LOGIN PAGE ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 selection:bg-blue-500/30">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#1e1b4b,_transparent_70%)]"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#161618] border border-[#27272a] p-10 rounded-[2.5rem] shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-4 bg-blue-500/10 rounded-2xl mb-4 text-blue-500 border border-blue-500/20">
              <Shield size={40} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">ShadowTrace</h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">Node Access Authorization</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Operator ID</label>
              <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="email@shadowtrace.io" className="w-full bg-black/40 border border-[#27272a] p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1 font-mono text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Security Cipher</label>
              <div className="relative">
                <input type="password" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter Password" className="w-full bg-black/40 border border-[#27272a] p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1 font-mono text-sm" />
                <Key className="absolute right-4 top-5 text-gray-600" size={16} />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95 mt-4">
              Authorize Session
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-blue-500/30">
      
      <aside className="w-72 border-r border-[#27272a] bg-[#161618] p-8 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 text-blue-500">
          <Shield size={36} strokeWidth={2.5} />
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">ShadowTrace</h1>
        </div>
        
        <nav className="space-y-3 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <NavItem icon={<History size={20}/>} label="Search History" active={activeTab === 'Search History'} onClick={() => setActiveTab('Search History')} />
          <NavItem icon={<Fingerprint size={20}/>} label="Identity Graph" active={activeTab === 'Identity Graph'} onClick={() => setActiveTab('Identity Graph')} />
          <NavItem icon={<FileText size={20}/>} label="DPDP Compliance" active={activeTab === 'DPDP Compliance'} onClick={() => setActiveTab('DPDP Compliance')} />
          <NavItem icon={<User size={20}/>} label="User Profile" active={activeTab === 'User Profile'} onClick={() => setActiveTab('User Profile')} />
        </nav>

        <div className="pt-8 border-t border-[#27272a]">
          <NavItem icon={<Settings size={20}/>} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all mt-2">
            <LogOut size={20}/> <span className="font-bold text-sm uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_top_right,_#1e1b4b,_transparent_40%)]">
        
        <header className="h-20 border-b border-[#27272a] flex items-center justify-between px-10 bg-[#161618]/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            <Globe size={16} className={isScanning ? "animate-spin text-blue-500" : "text-blue-500/50"} />
            <span>Network Status: <span className="text-white">{isScanning ? 'Synchronizing Nodes...' : 'Encrypted & Online'}</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 text-blue-500">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase">Session Secure</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 border border-white/10 flex items-center justify-center text-xs font-black uppercase">
              {loginEmail.substring(0, 2)}
            </div>
          </div>
        </header>

        <div className="p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'Dashboard' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Footprint Intelligence</h2>
                    <p className="text-gray-400 text-sm italic">Aggregate & Correlate Identifiers — Problem Statement #64</p>
                  </div>
                  <div className="relative group w-full xl:w-[500px]">
                    <input type="text" value={targetInput} onChange={(e) => setTargetInput(e.target.value)}
                      placeholder="Target Email or Username..." className="w-full bg-[#161618] border border-[#27272a] p-5 pl-14 rounded-2xl focus:ring-2 focus:ring-blue-500/40 outline-none transition-all text-sm" />
                    <Search className="absolute left-4 top-5 text-gray-500" size={22} />
                    <button onClick={handleScan} disabled={isScanning} className="absolute right-3 top-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black py-3 px-6 rounded-xl transition-all disabled:bg-gray-800">
                      {isScanning ? 'ANALYZING...' : 'RUN ANALYSIS'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <StatCard label="Discovered Points" value={scanComplete ? (scanResults.exposures.length * 12).toString() : "0"} icon={<Database size={24}/>} />
                  <StatCard label="Privacy Risk" value={scanComplete ? `High (${scanResults.risk_score}%)` : "Ready"} progress={scanComplete ? scanResults.risk_score : 0} color="text-blue-500" icon={<Shield size={24}/>} />
                  <StatCard label="Critical Leaks" value={scanComplete ? `${scanResults.total_leaks} Findings` : "0"} color="text-red-500" icon={<AlertTriangle size={24}/>} />
                </div>

                <div className="bg-[#161618] border border-[#27272a] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-[#27272a] bg-white/[0.02] flex justify-between items-center">
                    <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-3"><Lock size={18} className="text-blue-500" /> Sensitive Discovery Report</h3>
                  </div>
                  <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 bg-white/[0.01]">
                        <tr>
                          <th className="px-8 py-6">Source Node</th>
                          <th className="px-8 py-6">Match</th>
                          <th className="px-8 py-6">Data Category</th>
                          <th className="px-8 py-6">Risk</th>
                          <th className="px-8 py-6 text-right">Trace</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-[#27272a]">
                        {scanComplete ? (
                          scanResults.exposures.map((exp, idx) => (
                            <TableRow key={idx} platform={exp.platform} match={exp.match} pii={exp.pii_found?.join(', ') || 'N/A'} risk={exp.risk_level} />
                          ))
                        ) : (
                          <tr><td colSpan="5" className="py-32 text-center text-gray-700 font-mono text-xs tracking-widest uppercase animate-pulse">{isScanning ? '>> BUFFERING OSINT STREAMS...' : '>> AWAITING TARGET INPUT'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Search History' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-10 text-left">
                  <h2 className="text-4xl font-black mb-2">Search Logs</h2>
                  <p className="text-gray-400 text-sm italic">Historical OSINT trace activity</p>
                </div>
                <div className="space-y-4">
                  {searchHistory.length > 0 ? searchHistory.map((item) => (
                    <div key={item.id} className="bg-[#161618] border border-[#27272a] p-6 rounded-2xl flex items-center justify-between hover:border-blue-500/40 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><History size={20}/></div>
                        <div className="text-left">
                          <p className="font-mono text-sm">{item.query}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{item.timestamp} • {item.findings} LEAKS FOUND</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-black uppercase ${item.score > 50 ? 'text-red-500' : 'text-blue-500'}`}>RISK: {item.score}%</p>
                        <button onClick={() => {setTargetInput(item.query); setActiveTab('Dashboard');}} className="text-[10px] font-black text-gray-500 hover:text-white mt-2">RE-RUN TRACE</button>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center border-2 border-dashed border-[#27272a] rounded-3xl">
                      <p className="text-gray-600 uppercase font-black tracking-widest text-xs">No historical trace data available</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'Identity Graph' && (
              <motion.div key="graph" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="mb-10 text-left">
                  <h2 className="text-4xl font-black mb-2 tracking-tight">Correlation Engine</h2>
                  <p className="text-gray-400 text-sm italic">Visualizing unified identifier clustering</p>
                </div>
                <IdentityGraph results={scanResults} userEmail={loginEmail} />
              </motion.div>
            )}

            {activeTab === 'User Profile' && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-10 text-left">
                  <h2 className="text-4xl font-black mb-2">Operator Profile</h2>
                  <p className="text-gray-400 text-sm italic">System access metadata</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 bg-[#161618] border border-[#27272a] p-10 rounded-[2.5rem] flex flex-col items-center">
                    <div className="h-32 w-32 rounded-3xl bg-blue-600 flex items-center justify-center text-4xl font-black shadow-2xl shadow-blue-500/20 mb-6 uppercase italic">
                      {loginEmail.substring(0, 2)}
                    </div>
                    <h3 className="text-xl font-black">{loginEmail.split('@')[0]}</h3>
                    <p className="text-gray-500 text-xs mt-2">{loginEmail}</p>
                    <div className="mt-8 space-y-2 w-full">
                      <ProfileStat label="Authorization Level" value="Level 4 (Elite)" />
                      <ProfileStat label="Active Scrapers" value="5 (Active)" />
                      <ProfileStat label="Past Findings" value={searchHistory.length} />
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#161618] border border-[#27272a] p-10 rounded-[2.5rem]">
                      <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-6 text-left">Security Settings</h4>
                      <div className="space-y-6">
                        <SettingsInput label="Authorized Email" placeholder={loginEmail} />
                        <div className="pt-6 border-t border-[#27272a] text-left">
                          <p className="text-xs text-gray-500 font-bold uppercase mb-4 tracking-widest">Multi-Factor Status</p>
                          <div className="flex items-center gap-4 p-4 bg-green-500/5 border border-green-500/20 rounded-2xl text-green-500 w-fit">
                            <ShieldCheck size={20} />
                            <span className="text-[10px] font-black uppercase">AES-256 Tunnel Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'DPDP Compliance' && (
              <motion.div key="comp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-10 text-left">
                  <h2 className="text-4xl font-black mb-2 italic tracking-tight uppercase">Audit Framework</h2>
                  <p className="text-gray-400 text-sm italic">DPDP Act (2023) Legal Mapping</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ComplianceCard section="Section 8(5)" rule="Security Safeguards" status={scanComplete && scanResults.total_leaks > 0 ? "Failing" : "Verified"} desc="Unauthorized exposure of PII on 3rd party forums." />
                  <ComplianceCard section="Section 6" rule="Consent Notice" status={scanComplete && scanResults.total_leaks > 2 ? "Violation" : "Verified"} desc="Data processing without explicit purpose limitation." />
                  <ComplianceCard section="Section 12" rule="Right to Erasure" status="Ready" desc="Automated removal request templates available." />
                  <ComplianceCard section="Section 13" rule="Grievance Redressal" status="Verified" desc="Data Principal communication channel established." />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- UI COMPONENTS ---
function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
      <span className={active ? "text-white" : "text-gray-500"}>{icon}</span>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </button>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-[#27272a] last:border-0">
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="text-xs font-bold text-blue-500">{value}</span>
    </div>
  );
}

function StatCard({ label, value, icon, progress, color = "text-white" }) {
  return (
    <div className="bg-[#161618] border border-[#27272a] p-8 rounded-[2rem] shadow-xl hover:border-blue-500/40 transition-all">
      <div className="flex justify-between items-start mb-6 text-gray-500">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
        <div className="text-blue-500 bg-blue-500/10 p-3 rounded-xl">{icon}</div>
      </div>
      <div className={`text-4xl font-black mb-4 ${color} text-left`}>{value}</div>
      {progress !== undefined && (
        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="bg-blue-500 h-full" />
        </div>
      )}
    </div>
  );
}

function TableRow({ platform, match, pii, risk }) {
  const riskColor = risk === 'Critical' || risk === 'CRITICAL' ? 'bg-red-500' : risk === 'High' || risk === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500';
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="px-8 py-6 font-black text-blue-500 text-xs uppercase italic">{platform}</td>
      <td className="px-8 py-6 font-mono text-[10px] text-gray-400 truncate max-w-[200px]">{match}</td>
      <td className="px-8 py-6"><span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-[9px] font-black text-gray-300 uppercase">{pii}</span></td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${riskColor}`}></div>
          <span className="text-[10px] font-black uppercase text-gray-400">{risk}</span>
        </div>
      </td>
      <td className="px-8 py-6 text-right"><button className="text-[10px] font-black border border-[#27272a] px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all">TRACE</button></td>
    </tr>
  );
}

function ComplianceCard({ section, rule, status, desc }) {
  const color = status === 'Failing' || status === 'Violation' ? 'text-red-500' : 'text-green-500';
  return (
    <div className="bg-[#161618] border border-[#27272a] p-8 rounded-[2rem] flex flex-col justify-between group hover:border-blue-500/20 transition-all">
      <div className="mb-6 text-left">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{section}</span>
          <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] ${color}`}>{status}</span>
        </div>
        <h4 className="text-xl font-black mb-2 tracking-tight">{rule}</h4>
        <p className="text-gray-500 text-[11px] font-medium leading-relaxed">{desc}</p>
      </div>
      <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 group-hover:text-blue-500 transition-colors uppercase tracking-widest">
        Remediation Plan <ExternalLink size={12} />
      </button>
    </div>
  );
}

function SettingsInput({ label, placeholder }) {
  return (
    <div className="bg-black/20 border border-[#27272a] p-4 rounded-xl text-left">
      <p className="text-[9px] font-black text-gray-500 uppercase mb-2 tracking-widest">{label}</p>
      <input type="text" placeholder={placeholder} className="w-full bg-transparent p-0 text-sm font-mono text-blue-400 outline-none placeholder:text-gray-700" />
    </div>
  );
}