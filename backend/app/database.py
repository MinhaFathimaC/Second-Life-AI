import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "secondlife.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Items analysis table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        category TEXT NOT NULL,
        condition TEXT NOT NULL,
        confidence REAL NOT NULL,
        primary_action TEXT NOT NULL,
        alternative_action TEXT NOT NULL,
        second_life_ideas TEXT NOT NULL,
        waste_avoided TEXT NOT NULL,
        resource_saving TEXT NOT NULL,
        environmental_benefit TEXT NOT NULL,
        sustainability_score INTEGER NOT NULL,
        image_url TEXT,
        is_sample INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Telemetry for AI corrections
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS telemetry_corrections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_category TEXT NOT NULL,
        corrected_category TEXT NOT NULL,
        confidence REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # NGO Partners directory
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ngo_partners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_focus TEXT NOT NULL,
        location TEXT NOT NULL,
        contact_email TEXT NOT NULL,
        website TEXT NOT NULL,
        description TEXT NOT NULL
    );
    """)

    # Community item swap & donation board
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS community_listings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        category TEXT NOT NULL,
        condition TEXT NOT NULL,
        primary_action TEXT NOT NULL,
        description TEXT,
        location TEXT DEFAULT 'Local Community Hub',
        contact_info TEXT,
        image_url TEXT,
        status TEXT DEFAULT 'available',
        claims_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()
    print("Database initialized at", DB_PATH)
