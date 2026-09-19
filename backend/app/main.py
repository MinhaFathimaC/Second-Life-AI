"""
SecondLife AI - FastAPI Application Main Entrypoint
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import init_db
from app.services.seed_service import seed_sample_data_if_empty
from app.services.ngo_service import get_ngo_partners

from app.routes.analyze import router as analyze_router
from app.routes.history import router as history_router
from app.routes.dashboard import router as dashboard_router
from app.routes.feedback import router as feedback_router
from app.routes.health import router as health_router
from app.routes.community import router as community_router
from app.routes.community_board import router as community_board_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_sample_data_if_empty()
    yield

app = FastAPI(
    title="SecondLife AI API",
    description="AI-Based Second-Life Recommendation System for Sustainable Consumption (SDG 12)",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(analyze_router)
app.include_router(history_router)
app.include_router(dashboard_router)
app.include_router(feedback_router)
app.include_router(community_router)
app.include_router(community_board_router)

@app.get("/api/ngos")
def list_ngos(category: str = None, search: str = None):
    return {"success": True, "ngos": get_ngo_partners(category, search)}

@app.get("/")
def root():
    return {
        "app": "SecondLife AI API",
        "description": "AI-Based Second-Life Recommendation System for Sustainable Consumption",
        "docs_url": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
