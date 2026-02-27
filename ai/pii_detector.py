import re

class PIIDetector:
    def __init__(self):
        # We removed the (?i) from inside the strings to prevent the PatternError
        self.patterns = {
            "EMAIL": r"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}",
            "AADHAAR": r"\b\d{4}\s\d{4}\s\d{4}\b",
            "PAN_CARD": r"[A-Z]{5}[0-9]{4}[A-Z]{1}",
            "PHONE": r"\b(?:\+91|0)?[6-9]\d{9}\b"
        }

    def scan_text(self, text):
        if not text:
            return []
        
        findings = []
        for category, pattern in self.patterns.items():
            # We apply re.IGNORECASE here instead of inside the pattern string
            try:
                matches = re.finditer(pattern, text, re.IGNORECASE)
                for m in matches:
                    findings.append({
                        "data_category": category,
                        "match": m.group(),
                        "confidence": "HIGH"
                    })
            except Exception as e:
                print(f"Regex error: {e}")
        return findings

detector = PIIDetector()