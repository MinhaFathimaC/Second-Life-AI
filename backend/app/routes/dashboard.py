"""
SecondLife AI - Dashboard Route
Computes aggregate sustainability metrics & statistics for analytics charts.
"""

from fastapi import APIRouter
from app.database import get_db

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard_stats():
    """Computes summary metrics & breakdowns for user dashboard."""
    conn = get_db()
    cursor = conn.cursor()

    # Total items count
    cursor.execute("SELECT COUNT(*) FROM items")
    total_analyzed = cursor.fetchone()[0]

    # Action counts
    actions_query = """
    SELECT primary_action, COUNT(*) as cnt 
    FROM items 
    GROUP BY primary_action
    """
    cursor.execute(actions_query)
    action_rows = cursor.fetchall()
    
    action_counts = {
        "REUSE": 0,
        "DONATE": 0,
        "RECYCLE": 0,
        "UPCYCLE": 0,
        "REPAIR": 0
    }
    for row in action_rows:
        act = row["primary_action"].upper()
        if act in action_counts:
            action_counts[act] = row["cnt"]

    # Category counts
    category_query = """
    SELECT category, COUNT(*) as cnt 
    FROM items 
    GROUP BY category
    """
    cursor.execute(category_query)
    category_rows = cursor.fetchall()
    category_counts = {row["category"]: row["cnt"] for row in category_rows}

    # Average sustainability score
    cursor.execute("SELECT AVG(sustainability_score) FROM items")
    avg_score_res = cursor.fetchone()[0]
    avg_score = round(avg_score_res, 1) if avg_score_res else 85.0

    # Recent items stream
    cursor.execute("""
    SELECT id, item_name, category, primary_action, sustainability_score, created_at, is_sample
    FROM items ORDER BY id DESC LIMIT 5
    """)
    recent_rows = cursor.fetchall()
    recent_items = [
        {
            "id": r["id"],
            "item_name": r["item_name"],
            "category": r["category"],
            "primary_action": r["primary_action"],
            "sustainability_score": r["sustainability_score"],
            "created_at": r["created_at"],
            "is_sample": bool(r["is_sample"])
        }
        for r in recent_rows
    ]

    conn.close()

    # Prepare datasets formatted for Recharts
    action_chart_data = [
        {"name": "Reuse", "value": action_counts["REUSE"], "color": "#0d9488"},     # Teal
        {"name": "Donate", "value": action_counts["DONATE"], "color": "#16a34a"},    # Green
        {"name": "Recycle", "value": action_counts["RECYCLE"], "color": "#0284c7"},   # Sky Blue
        {"name": "Upcycle", "value": action_counts["UPCYCLE"], "color": "#8b5cf6"},   # Purple
        {"name": "Repair", "value": action_counts["REPAIR"], "color": "#eab308"}     # Amber
    ]

    category_chart_data = [
        {"category": cat, "count": category_counts.get(cat, 0)}
        for cat in ["Clothing", "Plastic", "Paper", "Glass", "Metal", "Furniture", "Electronics", "Other"]
    ]

    return {
        "success": True,
        "metrics": {
            "total_analyzed": total_analyzed,
            "items_reused": action_counts["REUSE"],
            "items_donated": action_counts["DONATE"],
            "items_recycled": action_counts["RECYCLE"],
            "items_upcycled": action_counts["UPCYCLE"],
            "items_repaired": action_counts["REPAIR"],
            "average_sustainability_score": avg_score
        },
        "charts": {
            "action_breakdown": action_chart_data,
            "category_distribution": category_chart_data
        },
        "recent_activity": recent_items
    }
