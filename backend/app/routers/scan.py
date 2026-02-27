import sys
import os
from fastapi import APIRouter, HTTPException
import asyncio
import logging

# --- DYNAMIC PATH INJECTION ---
current_file_path = os.path.abspath(__file__) 
root_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(current_file_path))))

if root_path not in sys.path:
    sys.path.insert(0, root_path)

# --- SAFE IMPORTS ---
try:
    from Demo.seed_demo import seeder 
    from ai.pii_detector import detector
    from ai.risk_scorer import scorer
    from compliance.dpdp_checker import checker
except ImportError as e:
    print(f"CRITICAL IMPORT ERROR: {e}")
    seeder = None 

from backend.app.scrapers.github_scraper import scan_github
from backend.app.scrapers.hibp import scan_hibp
from backend.app.scrapers.reddit_scraper import scan_reddit
from backend.app.scrapers.pastebin_scraper import scan_pastebin
from backend.app.models.schemas import ScanRequest, ScanResponse

router = APIRouter(prefix="/scan", tags=["Scanning Engine"])
logger = logging.getLogger(__name__)

@router.post("/", response_model=ScanResponse)
async def start_new_scan(request: ScanRequest):
    # The input is now flexible (Email, Username, or UID)
    identifier = request.target_email.lower()
    
    # 1. DEMO TRIGGER
    if identifier == "demo@tracepoint.com" or identifier == "demo_user":
        if seeder:
            return seeder.load_demo_data()
        raise HTTPException(status_code=500, detail="Demo module not loaded")

    # 2. INTELLIGENT ROUTING
    is_email = "@" in identifier
    username_part = identifier.split('@')[0] if is_email else identifier

    tasks = []
    
    # Always scan GitHub and Pastebin (they support both)
    tasks.append(scan_github(identifier))
    tasks.append(scan_pastebin(identifier))
    
    # Only scan Reddit for usernames
    tasks.append(scan_reddit(username_part))

    # Only scan HIBP if it's a valid email format
    if is_email:
        tasks.append(scan_hibp(identifier))
    else:
        # If not an email, we just add a placeholder task
        tasks.append(asyncio.sleep(0))

    # 3. GATHER RESULTS
    raw_results = await asyncio.gather(*tasks)
    # Filter out None results or the sleep placeholder
    exposures = [res for res in raw_results if res is not None and isinstance(res, dict)]

    # 4. AI & COMPLIANCE ENRICHMENT
    all_findings = []
    for exp in exposures:
        # Initialize pii_found if missing
        if "pii_found" not in exp:
            exp["pii_found"] = []

        description = exp.get("description", "")
        ai_findings = detector.scan_text(description)
        
        # EVERY exposure counts as at least a basic finding for the risk scorer
        if not ai_findings:
            # Create a generic finding so the risk scorer can count the exposure quantity
            all_findings.append({"data_category": "GENERAL_EXPOSURE", "confidence": "LOW"})
            if "compliance_notes" not in exp:
                exp["compliance_notes"] = ["DPDP Audit: Potential Exposure"]
        else:
            exp["risk_level"] = "CRITICAL"
            for finding in ai_findings:
                # Format: "Category: Match"
                label = f"{finding['data_category']}: {finding['match']}"
                if label not in exp["pii_found"]:
                    exp["pii_found"].append(label)
                all_findings.append(finding)
            
            # Map findings to DPDP violations
            violations = checker.analyze_findings(ai_findings)
            exp["compliance_notes"] = [v["section"] for v in violations]

    # 5. FINAL CALCULATION
    # This now receives a list containing an item for every single exposure found
    final_score = scorer.calculate(all_findings) if all_findings else 0

    return {
        "target": identifier,
        "total_leaks": len(exposures),
        "risk_score": final_score,
        "exposures": exposures
    }