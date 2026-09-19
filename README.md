# SecondLife AI – AI-Based Second-Life Recommendation System for Sustainable Consumption

A full-stack artificial intelligence application developed for the **AI for Sustainability** initiative, promoting United Nations Sustainable Development Goal 12 (**SDG 12: Responsible Consumption and Production**) alongside **SDG 11** (Sustainable Cities and Communities) and **SDG 13** (Climate Action).

---

## 📌 Problem Statement

Every day millions of usable items—clothing, furniture, glass containers, electronics, plasticware, and metal objects—are thrown directly into municipal solid waste streams instead of being reused, repaired, donated, upcycled, or recycled. Consumers often lack immediate clarity on:
1. What material or category an item belongs to.
2. What practical circular option (Reuse, Repair, Donate, Upcycle, Recycle) is optimal for the item's condition.
3. How much environmental waste or raw resources their choice helps conserve.

---

## 🎯 Project Objectives

- **Automated AI Recognition**: Use computer vision (MobileNetV2 transfer learning architecture) to classify uploaded photos of everyday waste objects into core material categories.
- **Rule-Based Circular Recommendation Engine**: Combine detected item categories with user-selected item condition (Excellent, Good, Fair, Damaged, Not usable) to generate tailored primary recommendations, alternative options, and 3–5 practical second-life ideas.
- **Sustainability Impact Analytics**: Provide app-generated sustainability scores (0–100) and qualitative impact indicators (Waste Avoided, Resource Saving, Environmental Benefit) without exaggerating empirical carbon metrics.
- **NGO & Charity Extension**: Seamlessly connect donation recommendations with verified NGO partner directories.
- **Telemetry for Continuous Learning**: Capture manual category overrides to store feedback for future model retraining.

---

## 🏗️ Architecture & Workflow

```
[ User Image Upload ] 
       │
       ▼
[ Preprocessing (224x224 RGB) ]
       │
       ▼
[ MobileNetV2 AI Model / Fallback Classifier ] ──► [ Confidence Score & Category ]
       │
       ▼
[ User Condition Selection ] (Excellent / Good / Fair / Damaged / Not usable)
       │
       ▼
[ Rule-Based Recommendation Engine ]
       │
       ├─► Primary Action (Donate, Reuse, Repair, Upcycle, Recycle)
       ├─► 3–5 Practical Second-Life Ideas
       ├─► Sustainability Score (0–100) & Impact Levels
       └─► Connect & Donate NGO Directory (If Donate)
       │
       ▼
[ SQLite Database & Dashboard Analytics (Recharts) ]
```

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v3 & PostCSS
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Data Visualization**: Recharts

### Backend
- **Framework**: Python 3.14 + FastAPI + Uvicorn
- **AI & Computer Vision**: TensorFlow / Keras MobileNetV2 (ImageNet weights) & PIL / NumPy feature extractor
- **Database**: SQLite 3 (SQLAlchemy / Python sqlite3 engine)
- **Data Pre-seeding**: Auto-populates 7 realistic demo items on initial startup for instant dashboard demonstration.

---

## 📊 Core Categories & Condition Factors

### Item Categories
1. **Clothing** (Textiles, shirts, jackets, denim, footwear)
2. **Plastic** (Bottles, storage containers, tubs, packaging)
3. **Paper** (Cartons, shipping cardboard, books, newspapers)
4. **Glass** (Mason jars, bottles, glassware, vases)
5. **Metal** (Aluminum cans, tins, cookware, hardware scrap)
6. **Furniture** (Chairs, tables, desks, cabinets)
7. **Electronics** (Smartphones, laptops, cables, peripherals)
8. **Other** (Miscellaneous household products)

### Item Conditions & Action Matrix
- **Excellent**: Recommend **DONATE** or **REUSE** (Highest community impact & score: 88–94)
- **Good**: Recommend **DONATE** or **REUSE** (High circularity score: 84 font-semibold)
- **Fair**: Recommend **REPAIR** or **REUSE** (Encourages minor restoration: 83–87)
- **Damaged**: Recommend **UPCYCLE** or **REPAIR** (Transformative repurposing: 70–78)
- **Not usable**: Recommend **RECYCLE** (Channel into proper industrial recycling stream: 65–79)

---

## 🛠️ Installation & Setup Instructions

### Prerequisites
- **Python**: 3.9+ or 3.14
- **Node.js**: v18+ and `npm`

---

### Step 1: Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Start FastAPI server with live reload
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Backend server will start at: `http://127.0.0.1:8000` (API Interactive Docs at `http://127.0.0.1:8000/docs`).

---

### Step 2: Start the Frontend React App

In a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install node dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend web application will run at: `http://localhost:5173`.

---

## 📡 Backend REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health check (Database connectivity & AI readiness) |
| `POST` | `/api/analyze` | Accepts image upload, executes MobileNetV2 AI model, outputs category, confidence, and recommendation |
| `POST` | `/api/recommend` | Recalculates recommendation when user changes condition or category |
| `GET` | `/api/history` | Fetches historical analysis logs with optional category/action filters |
| `GET` | `/api/history/{id}` | Fetches detailed record for a single item by ID |
| `POST` | `/api/history` | Saves analysis result to SQLite database |
| `DELETE` | `/api/history/{id}`| Removes record from database history |
| `GET` | `/api/dashboard` | Returns aggregated metrics, Recharts datasets, and recent activity logs |
| `POST` | `/api/feedback` | Logs user manual category corrections for future model fine-tuning telemetry |
| `GET` | `/api/ngos` | Directory of verified partner NGOs by item category focus |

---

## 🌍 UN Sustainable Development Goal (SDG) Mapping

### Primary Alignment: SDG 12 – Responsible Consumption & Production
- **Target 12.5**: By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse.
- **SecondLife AI Role**: Guides consumers at the point of waste decision-making to prioritize reuse, repair, and donation over landfill disposal.

### Supporting Alignment: SDG 11 – Sustainable Cities & Communities
- Reduces municipal solid waste burden and promotes neighborhood charity sharing networks.

### Supporting Alignment: SDG 13 – Climate Action
- Prevents upstream manufacturing emissions by extending product life cycles and recovering scrap materials.

---

## 🔮 Future Enhancements & Roadmap

- **Expanded Fine-Tuned Model**: Fine-tune MobileNetV2 on custom Kaggle waste datasets (Garbage Classification dataset with 12+ categories).
- **Geolocation NGO Locator**: Integrate interactive map APIs (OpenStreetMap / Leaflet) to locate nearest local recycling centers and charity drop-boxes.
- **Community Impact Leaderboard**: Add user profiles and social sharing for community waste reduction milestones.
- **Multilingual UI**: Support multiple languages (Spanish, French, Hindi) for broader accessibility.
