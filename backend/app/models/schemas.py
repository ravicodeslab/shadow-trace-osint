from pydantic import BaseModel, Field
from typing import List, Optional

# ==========================================
# 1. THE REQUEST MODEL (Flexible Input)
# ==========================================
class ScanRequest(BaseModel):
    # Changed from EmailStr to str to allow Usernames, UIDs, and Emails
    target_email: str = Field(..., description="The primary identifier (Email, Username, or UID) to investigate.")
    
    # Optional field remains for cases where both are known
    target_username: Optional[str] = Field(None, description="Optional: Known username used by the target.")

    class Config:
        json_schema_extra = {
            "example": {
                "target_email": "user123",
                "target_username": "demo_user"
            }
        }

# ==========================================
# 2. THE EXPOSURE MODEL
# ==========================================
class ExposedData(BaseModel):
    platform: str = Field(..., description="The source of the leak (e.g., GitHub, Pastebin)")
    risk_level: str = Field(..., description="Risk severity: LOW, MEDIUM, HIGH, or CRITICAL")
    description: str = Field(..., description="Details about what was found.")
    pii_found: List[str] = Field(default_factory=list, description="Array of sensitive data types found.")
    url: Optional[str] = Field(None, description="Direct link to the exposed data.")

# ==========================================
# 3. THE FINAL RESPONSE MODEL
# ==========================================
class ScanResponse(BaseModel):
    target: str = Field(..., description="The original identifier that was scanned.")
    total_leaks: int = Field(..., description="Total number of platforms where data was found.")
    risk_score: int = Field(..., description="Calculated risk score from 0 to 100.")
    exposures: List[ExposedData] = Field(..., description="Detailed list of all findings.")