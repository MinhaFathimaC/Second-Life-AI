"""
SecondLife AI - Database Seeding Service
Pre-populates sample items into SQLite database on startup so the Dashboard
and History pages have rich initial demonstration data.
"""

import json
from datetime import datetime, timedelta
from app.database import get_db

SAMPLE_ITEMS = [
    {
        "item_name": "Vintage Denim Jacket",
        "category": "Clothing",
        "condition": "Good",
        "confidence": 0.94,
        "primary_action": "DONATE",
        "alternative_action": "REUSE",
        "second_life_ideas": json.dumps([
            "Donate to local verified clothing drive for youth.",
            "Organize a community jacket swap.",
            "Customize with embroidered patches or textile paint.",
            "Pass along to a friend or family member."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 88,
        "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80",
        "days_ago": 1
    },
    {
        "item_name": "Polypropylene Storage Container",
        "category": "Plastic",
        "condition": "Excellent",
        "confidence": 0.91,
        "primary_action": "REUSE",
        "alternative_action": "UPCYCLE",
        "second_life_ideas": json.dumps([
            "Use for dry pantry food storage.",
            "Convert into a self-watering indoor plant pot.",
            "Organize desk drawers and art supplies.",
            "Rinse and use as hardware screw organizer."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 84,
        "image_url": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80",
        "days_ago": 2
    },
    {
        "item_name": "Wooden Dining Chair",
        "category": "Furniture",
        "condition": "Fair",
        "confidence": 0.96,
        "primary_action": "REPAIR",
        "alternative_action": "UPCYCLE",
        "second_life_ideas": json.dumps([
            "Sand down surface scratches and re-varnish.",
            "Tighten wobbly leg screws with wood glue.",
            "Re-upholster seat cushion with fresh fabric.",
            "Paint accent color for a bohemian patio seat."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 87,
        "image_url": "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80",
        "days_ago": 3
    },
    {
        "item_name": "Disused Smartphone (2018)",
        "category": "Electronics",
        "condition": "Damaged",
        "confidence": 0.95,
        "primary_action": "RECYCLE",
        "alternative_action": "REPAIR",
        "second_life_ideas": json.dumps([
            "Drop off at certified E-Waste collection facility.",
            "Check manufacturer trade-in value.",
            "Extract working SIM tray and cable accessories.",
            "Safely recycle lithium battery."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 78,
        "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
        "days_ago": 4
    },
    {
        "item_name": "Corrugated Shipping Boxes",
        "category": "Paper",
        "condition": "Good",
        "confidence": 0.89,
        "primary_action": "REUSE",
        "alternative_action": "RECYCLE",
        "second_life_ideas": json.dumps([
            "Reuse for upcoming house move or package shipping.",
            "Flatten and use as floor protection during painting.",
            "Shred for eco-friendly garden mulch.",
            "Craft cardboard playhouses or cat scratch pads."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 88,
        "image_url": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&q=80",
        "days_ago": 5
    },
    {
        "item_name": "Glass Mason Jar Set",
        "category": "Glass",
        "condition": "Excellent",
        "confidence": 0.93,
        "primary_action": "REUSE",
        "alternative_action": "UPCYCLE",
        "second_life_ideas": json.dumps([
            "Sanitize and use for meal prep or smoothie storage.",
            "Convert into rustic candle holders.",
            "Create indoor plant propagation station.",
            "Use as desktop pen organizer."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 90,
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
        "days_ago": 6
    },
    {
        "item_name": "Aluminum Beverage Cans",
        "category": "Metal",
        "condition": "Damaged",
        "confidence": 0.92,
        "primary_action": "RECYCLE",
        "alternative_action": "UPCYCLE",
        "second_life_ideas": json.dumps([
            "Rinse and place in metal recycling bin.",
            "Take to local scrap metal buy-back center.",
            "Cut into metal plant identification tags.",
            "Recycle to save 95% energy compared to raw aluminum."
        ]),
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": 79,
        "image_url": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
        "days_ago": 7
    }
]

SAMPLE_COMMUNITY_LISTINGS = [
    {
        "item_name": "Vintage Denim Jacket",
        "category": "Clothing",
        "condition": "Good",
        "primary_action": "DONATE",
        "description": "Gently worn denim jacket size M. Free to anyone who can pick up near Downtown Eco Hub!",
        "location": "Downtown Eco Hub",
        "contact_info": "sarah.m@secondlife.org",
        "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80"
    },
    {
        "item_name": "Wooden Dining Chair",
        "category": "Furniture",
        "condition": "Fair",
        "primary_action": "REPAIR",
        "description": "Solid oak dining chair, sturdy frame with minor wood scuffs. Great DIY restoration project.",
        "location": "Warehouse District Hub",
        "contact_info": "alex.k@secondlife.org",
        "image_url": "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80"
    },
    {
        "item_name": "Glass Mason Jar Set (6 Jars)",
        "category": "Glass",
        "condition": "Excellent",
        "primary_action": "REUSE",
        "description": "6 clean, sanitized 16oz glass mason jars with airtight lids. Perfect for pantry storage.",
        "location": "Arts District Community Center",
        "contact_info": "elena.r@secondlife.org",
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80"
    }
]

def seed_sample_data_if_empty():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM items")
    count = cursor.fetchone()[0]
    
    if count < 100:
        from app.services.seed_100_items import seed_100_items
        seed_100_items()

    cursor.execute("SELECT COUNT(*) FROM community_listings")
    comm_count = cursor.fetchone()[0]
    if comm_count == 0:
        for listing in SAMPLE_COMMUNITY_LISTINGS:
            cursor.execute("""
            INSERT INTO community_listings (
                item_name, category, condition, primary_action, description, location, contact_info, image_url, status, claims_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available', 0)
            """, (
                listing["item_name"], listing["category"], listing["condition"], listing["primary_action"],
                listing["description"], listing["location"], listing["contact_info"], listing["image_url"]
            ))
        conn.commit()
        print(f"Seeded {len(SAMPLE_COMMUNITY_LISTINGS)} community board listings.")

    conn.close()
