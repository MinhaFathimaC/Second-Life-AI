"""
SecondLife AI - Community Impact & Foundation Route
Provides aggregated circular resource insights for foundations, schools, and community NGOs.
"""

from fastapi import APIRouter
from app.database import get_db

router = APIRouter(prefix="/api/community", tags=["Community"])

@router.get("")
def get_community_impact_data():
    """Computes community-wide resource analytics for foundations & NGOs."""
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM items")
    total = cursor.fetchone()[0]

    # Category Breakdown
    cursor.execute("SELECT category, COUNT(*) as cnt FROM items GROUP BY category")
    cat_rows = cursor.fetchall()
    cat_counts = {r["category"]: r["cnt"] for r in cat_rows}

    # Action Breakdown
    cursor.execute("SELECT primary_action, COUNT(*) as cnt FROM items GROUP BY primary_action")
    act_rows = cursor.fetchall()
    act_counts = {r["primary_action"].upper(): r["cnt"] for r in act_rows}

    conn.close()

    total_cnt = max(1, total)

    # Percentage breakdown
    cat_percentages = [
        {"category": "Clothing", "percentage": round((cat_counts.get("Clothing", 3) / total_cnt) * 100, 1)},
        {"category": "Plastic", "percentage": round((cat_counts.get("Plastic", 2) / total_cnt) * 100, 1)},
        {"category": "Paper", "percentage": round((cat_counts.get("Paper", 1) / total_cnt) * 100, 1)},
        {"category": "Electronics", "percentage": round((cat_counts.get("Electronics", 1) / total_cnt) * 100, 1)},
        {"category": "Glass", "percentage": round((cat_counts.get("Glass", 1) / total_cnt) * 100, 1)},
        {"category": "Furniture", "percentage": round((cat_counts.get("Furniture", 1) / total_cnt) * 100, 1)},
        {"category": "Metal", "percentage": round((cat_counts.get("Metal", 1) / total_cnt) * 100, 1)}
    ]

    action_percentages = [
        {"action": "Reuse", "percentage": round((act_counts.get("REUSE", 3) / total_cnt) * 100, 1)},
        {"action": "Donate", "percentage": round((act_counts.get("DONATE", 2) / total_cnt) * 100, 1)},
        {"action": "Recycle", "percentage": round((act_counts.get("RECYCLE", 2) / total_cnt) * 100, 1)},
        {"action": "Upcycle", "percentage": round((act_counts.get("UPCYCLE", 1) / total_cnt) * 100, 1)},
        {"action": "Repair", "percentage": round((act_counts.get("REPAIR", 1) / total_cnt) * 100, 1)}
    ]

    # Simulated NGO Resource Match Forecast
    ngo_matches = [
        {
            "id": 1,
            "organization": "ThreadForward Foundation",
            "needed_category": "Clothing",
            "available_donatable_items": cat_counts.get("Clothing", 4),
            "match_priority": "High",
            "impact_area": "Community Apparel Drives"
        },
        {
            "id": 2,
            "organization": "Digital Bridge Initiative",
            "needed_category": "Electronics",
            "available_donatable_items": cat_counts.get("Electronics", 2),
            "match_priority": "High",
            "impact_area": "Student E-Learning Hardware"
        },
        {
            "id": 3,
            "organization": "Furnish-A-Home Alliance",
            "needed_category": "Furniture",
            "available_donatable_items": cat_counts.get("Furniture", 2),
            "match_priority": "Medium",
            "impact_area": "Shelter Housing Furniture"
        }
    ]

    return {
        "success": True,
        "is_simulated_demo": True,
        "community_metrics": {
            "total_items_analyzed": total,
            "potentially_reusable": act_counts.get("REUSE", 0) + act_counts.get("REPAIR", 0),
            "potentially_donatable": act_counts.get("DONATE", 0),
            "potentially_recyclable": act_counts.get("RECYCLE", 0),
            "potentially_upcyclable": act_counts.get("UPCYCLE", 0)
        },
        "community_insights": {
            "category_percentages": cat_percentages,
            "action_percentages": action_percentages
        },
        "ngo_matches": ngo_matches,
        "foundation_guidance": "Organizations can use aggregated item insights to understand what types of reusable resources are available in their community."
    }
