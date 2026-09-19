import sys
import os
import json

backend_dir = r"c:\Users\MINHA FATHIMA C\OneDrive\Desktop\ai\backend"
sys.path.insert(0, backend_dir)

from app.services.seed_100_items import ITEMS_100

js_items = []
for i, item in enumerate(ITEMS_100):
    name, category, condition, confidence, p_action, a_action, ideas, score, img_url = item
    js_items.append({
        "id": i + 1,
        "item_name": name,
        "category": category,
        "condition": condition,
        "confidence": confidence,
        "primary_action": p_action,
        "alternative_action": a_action,
        "second_life_ideas": ideas,
        "waste_avoided": "High",
        "resource_saving": "High",
        "environmental_benefit": "High",
        "sustainability_score": score,
        "image_url": img_url,
        "created_at": f"2026-09-19 12:{i%60:02d}:00"
    })

js_content = f"""/**
 * SecondLife AI - 100 Seeded Historical Items Dataset
 * Fallback data provider for static GitHub Pages deployment & offline testing
 */

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80';

export const SEEDED_100_ITEMS = {json.dumps(js_items, indent=2)};

export const SAMPLE_TEST_ITEMS = [
  {{
    id: 'scenario-tshirt',
    name: 'Old Cotton T-Shirt',
    category: 'Clothing',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80',
    description: '100% cotton shirt in good condition (Scenario 1: Donate)'
  }},
  {{
    id: 'scenario-jeans',
    name: 'Old Denim Jeans',
    category: 'Clothing',
    condition: 'Fair',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c36856d67?w=400&q=80',
    description: 'Worn denim jeans with knee wear (Scenario 2: Upcycle into tote bag)'
  }},
  {{
    id: 'scenario-plastic',
    name: 'Plastic Storage Container',
    category: 'Plastic',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80',
    description: 'Clean clear plastic food tub (Scenario 3: Reuse for storage)'
  }},
  {{
    id: 'scenario-cardboard',
    name: 'Corrugated Cardboard Box',
    category: 'Paper',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&q=80',
    description: 'Heavy duty shipping carton (Scenario 4: Reuse for packaging)'
  }},
  {{
    id: 'scenario-ewaste',
    name: 'Unusable Smartphone',
    category: 'Electronics',
    condition: 'Damaged',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    description: 'Outdated cracked electronic device (Scenario 5: E-waste recycling)'
  }}
];
"""

with open(r"c:\Users\MINHA FATHIMA C\OneDrive\Desktop\ai\frontend\src\data\sampleItems.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {len(js_items)} seeded items in frontend/src/data/sampleItems.js")
