"""
SecondLife AI - Analysis Route
Handles image upload -> AI classification -> Recommendation Generation.
Supports material extraction and personalized user preferences.
"""

from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pydantic import BaseModel
from typing import Optional
import json
import base64

from app.ai.classifier import classify_image, CATEGORIES
from app.recommendation.engine import generate_recommendation, CONDITIONS, USER_GOALS

router = APIRouter(prefix="/api", tags=["Analyze"])

class ReevaluateRequest(BaseModel):
    category: str
    condition: str
    user_preference: Optional[str] = "reduce_waste"

@router.post("/analyze")
async def analyze_item(
    file: UploadFile = File(...),
    manual_category: Optional[str] = Form(None),
    condition: Optional[str] = Form("Good"),
    user_preference: Optional[str] = Form("reduce_waste")
):
    """
    Main image upload & AI classification flow:
    1. Reads uploaded image file bytes
    2. MobileNetV2 classification (extracts category & material)
    3. Multi-action suitability recommendation engine
    """
    content_type = file.content_type or "image/jpeg"
    if content_type != "application/octet-stream" and not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image (JPEG, PNG, WEBP).")

    try:
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image size exceeds maximum limit of 10MB.")

        # AI Classification
        ai_result = classify_image(contents, filename=file.filename or "")

        final_category = manual_category if (manual_category and manual_category in CATEGORIES) else ai_result["category"]

        # Circularity Recommendation Engine
        rec_result = generate_recommendation(final_category, condition, user_preference or "reduce_waste")

        encoded_img = f"data:{content_type};base64,{base64.b64encode(contents).decode('utf-8')}"

        return {
            "success": True,
            "filename": file.filename,
            "ai_analysis": {
                "detected_category": ai_result["category"],
                "final_category": final_category,
                "material": ai_result["material"],
                "confidence": ai_result["confidence"],
                "confidence_percentage": ai_result["confidence_percentage"],
                "is_low_confidence": ai_result["is_low_confidence"],
                "ai_estimated_condition": ai_result["ai_estimated_condition"],
                "model_name": ai_result["model_name"],
                "raw_prediction": ai_result["raw_prediction"],
                "suitability": ai_result["suitability"],
                "warning_message": ai_result["warning_message"]
            },
            "selected_condition": condition,
            "user_preference": user_preference,
            "recommendation": rec_result,
            "preview_image": encoded_img
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze item image: {str(e)}")


@router.post("/recommend")
async def reevaluate_recommendation(data: ReevaluateRequest):
    """Recalculates multi-option recommendation when user changes condition or goal preference."""
    if data.category not in CATEGORIES:
        raise HTTPException(status_code=400, detail=f"Invalid category. Must be one of {CATEGORIES}")
    if data.condition not in CONDITIONS:
        raise HTTPException(status_code=400, detail=f"Invalid condition. Must be one of {CONDITIONS}")

    rec_result = generate_recommendation(data.category, data.condition, data.user_preference or "reduce_waste")
    return {
        "success": True,
        "category": data.category,
        "condition": data.condition,
        "user_preference": data.user_preference,
        "recommendation": rec_result
    }
