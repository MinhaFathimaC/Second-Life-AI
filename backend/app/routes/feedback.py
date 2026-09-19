"""
SecondLife AI - Telemetry & Feedback Route
Stores manual category corrections for AI model retraining telemetry.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from app.database import get_db

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])

class FeedbackRequest(BaseModel):
    original_category: str
    corrected_category: str
    confidence: float

@router.post("")
def record_category_correction(data: FeedbackRequest):
    """Stores manual user correction for future AI model fine-tuning."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO telemetry_corrections (original_category, corrected_category, confidence)
    VALUES (?, ?, ?)
    """, (data.original_category, data.corrected_category, data.confidence))
    conn.commit()
    conn.close()
    return {
        "success": True,
        "message": "Manual category correction saved. Thank you for helping train SecondLife AI!"
    }
