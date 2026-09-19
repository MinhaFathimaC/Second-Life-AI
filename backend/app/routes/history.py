"""
SecondLife AI - History Route
Manages reading, saving, and deleting analysis records in SQLite database.
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List
import json
import sqlite3
from app.database import get_db

router = APIRouter(prefix="/api/history", tags=["History"])

class SaveHistoryRequest(BaseModel):
    item_name: str
    category: str
    condition: str
    confidence: float
    primary_action: str
    alternative_action: str
    second_life_ideas: List[str]
    waste_avoided: str
    resource_saving: str
    environmental_benefit: str
    sustainability_score: int
    image_url: Optional[str] = None

@router.get("")
def get_history(
    category: Optional[str] = Query(None),
    action: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """Fetches list of historical item analyses from database."""
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT * FROM items WHERE 1=1"
    params = []

    if category and category != "All":
        query += " AND category = ?"
        params.append(category)

    if action and action != "All":
        query += " AND primary_action = ?"
        params.append(action)

    if search:
        query += " AND (item_name LIKE ? OR category LIKE ? OR primary_action LIKE ?)"
        wildcard = f"%{search}%"
        params.extend([wildcard, wildcard, wildcard])

    query += " ORDER BY id DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    items = []
    for row in rows:
        try:
            ideas = json.loads(row["second_life_ideas"])
        except Exception:
            ideas = [row["second_life_ideas"]]

        items.append({
            "id": row["id"],
            "item_name": row["item_name"],
            "category": row["category"],
            "condition": row["condition"],
            "confidence": row["confidence"],
            "confidence_percentage": f"{int(row['confidence'] * 100)}%",
            "primary_action": row["primary_action"],
            "alternative_action": row["alternative_action"],
            "second_life_ideas": ideas,
            "waste_avoided": row["waste_avoided"],
            "resource_saving": row["resource_saving"],
            "environmental_benefit": row["environmental_benefit"],
            "sustainability_score": row["sustainability_score"],
            "image_url": row["image_url"],
            "is_sample": bool(row["is_sample"]),
            "created_at": row["created_at"]
        })

    return {"success": True, "count": len(items), "items": items}


@router.get("/{item_id}")
def get_history_detail(item_id: int):
    """Fetches details for a single item by ID."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Item record not found.")

    try:
        ideas = json.loads(row["second_life_ideas"])
    except Exception:
        ideas = [row["second_life_ideas"]]

    return {
        "success": True,
        "item": {
            "id": row["id"],
            "item_name": row["item_name"],
            "category": row["category"],
            "condition": row["condition"],
            "confidence": row["confidence"],
            "confidence_percentage": f"{int(row['confidence'] * 100)}%",
            "primary_action": row["primary_action"],
            "alternative_action": row["alternative_action"],
            "second_life_ideas": ideas,
            "waste_avoided": row["waste_avoided"],
            "resource_saving": row["resource_saving"],
            "environmental_benefit": row["environmental_benefit"],
            "sustainability_score": row["sustainability_score"],
            "image_url": row["image_url"],
            "is_sample": bool(row["is_sample"]),
            "created_at": row["created_at"]
        }
    }


@router.post("")
def save_history(payload: SaveHistoryRequest):
    """Saves a new item analysis to database."""
    conn = get_db()
    cursor = conn.cursor()

    ideas_json = json.dumps(payload.second_life_ideas)

    cursor.execute("""
    INSERT INTO items (
        item_name, category, condition, confidence, primary_action, alternative_action,
        second_life_ideas, waste_avoided, resource_saving, environmental_benefit,
        sustainability_score, image_url, is_sample
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    """, (
        payload.item_name, payload.category, payload.condition, payload.confidence,
        payload.primary_action, payload.alternative_action, ideas_json,
        payload.waste_avoided, payload.resource_saving, payload.environmental_benefit,
        payload.sustainability_score, payload.image_url
    ))
    
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return {"success": True, "message": "Item analysis saved to history.", "id": new_id}


@router.delete("/{item_id}")
def delete_history_item(item_id: int):
    """Deletes an item from history."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM items WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": f"Item {item_id} deleted."}
