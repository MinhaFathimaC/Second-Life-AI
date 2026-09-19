"""
SecondLife AI - Community Item Swap & Sharing Marketplace Router
Enables users to publish, view, and claim reusable/donatable items within their local community.
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List
import sqlite3
from app.database import get_db

router = APIRouter(prefix="/api/community/board", tags=["Community Marketplace"])

class CreateListingRequest(BaseModel):
    item_name: str
    category: str
    condition: str
    primary_action: str
    description: Optional[str] = "Available for free community reuse or donation pick-up."
    location: Optional[str] = "Metro Community Eco Hub"
    contact_info: Optional[str] = "community.member@secondlife.org"
    image_url: Optional[str] = None

@router.get("")
def get_community_listings(
    category: Optional[str] = Query(None),
    status: Optional[str] = Query("available"),
    search: Optional[str] = Query(None)
):
    """Fetches list of community items available for swap or donation pickup."""
    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT * FROM community_listings WHERE 1=1"
    params = []

    if status and status != "All":
        query += " AND status = ?"
        params.append(status)

    if category and category != "All":
        query += " AND category = ?"
        params.append(category)

    if search:
        query += " AND (item_name LIKE ? OR category LIKE ? OR description LIKE ?)"
        w = f"%{search}%"
        params.extend([w, w, w])

    query += " ORDER BY id DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    listings = [
        {
            "id": row["id"],
            "item_name": row["item_name"],
            "category": row["category"],
            "condition": row["condition"],
            "primary_action": row["primary_action"],
            "description": row["description"],
            "location": row["location"],
            "contact_info": row["contact_info"],
            "image_url": row["image_url"],
            "status": row["status"],
            "claims_count": row["claims_count"],
            "created_at": row["created_at"]
        }
        for row in rows
    ]

    return {"success": True, "count": len(listings), "listings": listings}


@router.post("")
def create_community_listing(payload: CreateListingRequest):
    """Publishes an item to the community swap board."""
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO community_listings (
        item_name, category, condition, primary_action, description, location, contact_info, image_url, status, claims_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available', 0)
    """, (
        payload.item_name, payload.category, payload.condition, payload.primary_action,
        payload.description, payload.location, payload.contact_info, payload.image_url
    ))

    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return {
        "success": True,
        "message": f"Item '{payload.item_name}' published to the Community Swap Board!",
        "listing_id": new_id
    }


@router.post("/{listing_id}/claim")
def claim_community_item(listing_id: int):
    """Requests or claims an item on the community board."""
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM community_listings WHERE id = ?", (listing_id,))
    row = cursor.fetchone()

    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Listing not found.")

    new_claims = row["claims_count"] + 1
    new_status = "claimed" if new_claims >= 2 else "available"

    cursor.execute("""
    UPDATE community_listings 
    SET claims_count = ?, status = ?
    WHERE id = ?
    """, (new_claims, new_status, listing_id))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": f"Interest logged for '{row['item_name']}'. Owner notified!",
        "status": new_status,
        "claims_count": new_claims
    }
