"""
SecondLife AI - Health Route
Returns system operational status, database connectivity, and AI readiness.
"""

from fastapi import APIRouter
from app.database import get_db
from app.ai.classifier import HAS_TF

router = APIRouter(prefix="/api/health", tags=["Health"])

@router.get("")
def health_check():
    """Checks backend, SQLite DB connection, and AI engine status."""
    db_status = "operational"
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        conn.close()
    except Exception as e:
        db_status = f"error: {str(e)}"

    return {
        "status": "healthy",
        "service": "SecondLife AI Backend API",
        "version": "1.0.0",
        "database": db_status,
        "ai_engine": "MobileNetV2 (Active)" if HAS_TF else "Vision Classifier Fallback (Active)"
    }
