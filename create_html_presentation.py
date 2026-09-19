import os
import base64

# Base Artifact Directory
ARTIFACT_DIR = r"C:\Users\MINHA FATHIMA C\.gemini\antigravity-ide\brain\9df0dcab-291d-4dfd-b2d9-9a19395e2bab"

HOME_IMG = os.path.join(ARTIFACT_DIR, "home_page_1789806908893.png")
SDG_IMG = os.path.join(ARTIFACT_DIR, "sdg_impact_page_1789806964309.png")
ANALYZE_IMG = os.path.join(ARTIFACT_DIR, "analyze_page_1789806987399.png")
HISTORY_IMG = os.path.join(ARTIFACT_DIR, "history_page_1789807011469.png")
DASHBOARD_IMG = os.path.join(ARTIFACT_DIR, "dashboard_page_1789807034513.png")

def get_base64_img(img_path):
    if os.path.exists(img_path):
        with open(img_path, "rb") as f:
            data = f.read()
            return f"data:image/png;base64,{base64.b64encode(data).decode('utf-8')}"
    return ""

b64_home = get_base64_img(HOME_IMG)
b64_sdg = get_base64_img(SDG_IMG)
b64_analyze = get_base64_img(ANALYZE_IMG)
b64_history = get_base64_img(HISTORY_IMG)
b64_dashboard = get_base64_img(DASHBOARD_IMG)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecondLife AI - PowerPoint Presentation</title>
    <style>
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }}
        body {{
            background-color: #0f172a;
            color: #f8fafc;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }}
        .controls {{
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
            background: rgba(30, 41, 59, 0.8);
            padding: 12px 24px;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            z-index: 100;
            position: sticky;
            top: 10px;
        }}
        .btn {{
            background: #059669;
            color: white;
            border: none;
            padding: 8px 18px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .btn:hover {{
            background: #047857;
            transform: translateY(-1px);
        }}
        .btn-secondary {{
            background: #334155;
        }}
        .btn-secondary:hover {{
            background: #475569;
        }}
        .slide-counter {{
            font-weight: 700;
            color: #34d399;
            min-width: 90px;
            text-align: center;
            font-size: 14px;
        }}
        .slide-deck {{
            width: 100%;
            max-width: 1200px;
            aspect-ratio: 16 / 9;
            position: relative;
            background: #f8fafc;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            color: #0f172a;
        }}
        .slide {{
            display: none;
            width: 100%;
            height: 100%;
            padding: 40px 50px;
            position: absolute;
            top: 0;
            left: 0;
            flex-direction: column;
            justify-content: space-between;
            background: #f8fafc;
        }}
        .slide.active {{
            display: flex;
        }}
        .slide.dark-theme {{
            background: #0f172a;
            color: #f8fafc;
        }}
        .header-tag {{
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #059669;
            margin-bottom: 4px;
        }}
        .slide-title {{
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 20px;
        }}
        .dark-theme .slide-title {{
            color: #ffffff;
        }}
        .grid-2 {{
            display: grid;
            grid-template-columns: 1fr 1.3fr;
            gap: 24px;
            height: calc(100% - 70px);
        }}
        .grid-equal {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            height: calc(100% - 70px);
        }}
        .grid-3 {{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            height: calc(100% - 70px);
        }}
        .card {{
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }}
        .dark-theme .card {{
            background: #1e293b;
            border-color: #334155;
            color: #f8fafc;
        }}
        .card-amber {{
            background: #fffbeb;
            border: 1px solid #f59e0b;
        }}
        .card-emerald {{
            background: #ecfdf5;
            border: 1px solid #059669;
        }}
        .img-container {{
            width: 100%;
            height: 100%;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #cbd5e1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            background: #fff;
        }}
        .img-container img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }}
        .bullet-list {{
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 10px;
        }}
        .bullet-list li {{
            font-size: 14px;
            line-height: 1.5;
            color: #334155;
        }}
        .dark-theme .bullet-list li {{
            color: #cbd5e1;
        }}
        .bullet-list strong {{
            color: #0f172a;
        }}
        .dark-theme .bullet-list strong {{
            color: #ffffff;
        }}
        /* Slide 1 Special */
        .title-hero {{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            border-radius: 16px;
            padding: 40px;
            border: 1px solid rgba(5, 150, 105, 0.4);
        }}
        .title-hero h1 {{
            font-size: 54px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.02em;
        }}
        .title-hero h2 {{
            font-size: 22px;
            color: #34d399;
            margin-top: 10px;
            font-weight: 600;
        }}
        .title-hero p {{
            font-size: 15px;
            color: #94a3b8;
            max-width: 700px;
            margin-top: 20px;
            line-height: 1.6;
        }}
        .footer-note {{
            font-size: 12px;
            color: #64748b;
            margin-top: 30px;
        }}
    </style>
</head>
<body>

    <div class="controls">
        <button class="btn btn-secondary" onclick="prevSlide()">◀ Previous</button>
        <span class="slide-counter" id="slideCounter">Slide 1 of 10</span>
        <button class="btn" onclick="nextSlide()">Next ▶</button>
        <button class="btn btn-secondary" onclick="toggleFullscreen()"> Fullscreen</button>
    </div>

    <div class="slide-deck" id="slideDeck">

        <!-- SLIDE 1: Title -->
        <div class="slide dark-theme active">
            <div class="title-hero">
                <div class="header-tag">UN Sustainable Development Goals Project</div>
                <h1>SecondLife AI</h1>
                <h2>AI-Powered Sustainable Asset Recycling & Waste Reduction Platform</h2>
                <p>Automated item classification, material circularity scoring, condition assessment, and community sharing to support global UN Sustainable Development Goals.</p>
                <div class="footer-note">Presented by SecondLife AI Project Team • React, FastAPI & PyTorch Vision</div>
            </div>
        </div>

        <!-- SLIDE 2: Project Name & Aligned SDGs -->
        <div class="slide">
            <div>
                <div class="header-tag">Core Purpose & Global Framework</div>
                <div class="slide-title">Project Name & Aligned UN Sustainable Development Goals (SDGs)</div>
            </div>
            <div class="grid-2">
                <div class="card card-emerald">
                    <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase;">PROJECT NAME</div>
                    <div style="font-size: 32px; font-weight: 900; color: #0f172a; margin: 4px 0 16px 0;">SecondLife AI</div>
                    
                    <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Vision Statement</div>
                    <p style="font-size: 12px; color: #475569; margin-top: 4px; line-height: 1.5;">To eliminate unnecessary landfill disposal by equipping individuals with instant AI tools to classify, repair, reuse, or recycle household items.</p>
                    
                    <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 16px;">Target Impact</div>
                    <ul class="bullet-list" style="margin-top: 4px;">
                        <li><strong>Waste Diversion:</strong> Preventable scrap saved at source.</li>
                        <li><strong>Life Extension:</strong> Extended product lifetime via repair.</li>
                        <li><strong>Community Hub:</strong> Local charity sharing.</li>
                    </ul>
                </div>

                <div style="display: flex; flex-direction: column; gap: 14px;">
                    <div class="card card-amber" style="padding: 16px;">
                        <div style="font-size: 10px; font-weight: 800; color: #b45309; text-transform: uppercase;">PRIMARY FOCUS • UN SDG 12</div>
                        <div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px;">SDG 12: Responsible Consumption & Production</div>
                        <p style="font-size: 11px; color: #334155; margin-top: 4px;"><strong>Target 12.5:</strong> Substantially reduce waste generation through prevention, reduction, recycling, and reuse. SecondLife AI provides actionable item guidance before items reach landfills.</p>
                    </div>

                    <div class="card" style="padding: 16px;">
                        <div style="font-size: 10px; font-weight: 800; color: #059669; text-transform: uppercase;">SUPPORTING GOAL • UN SDG 11</div>
                        <div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px;">SDG 11: Sustainable Cities & Communities</div>
                        <p style="font-size: 11px; color: #475569; margin-top: 4px;"><strong>Target 11.6:</strong> Reduces municipal solid waste management burdens by fostering household item segregation and community reuse hubs.</p>
                    </div>

                    <div class="card" style="padding: 16px;">
                        <div style="font-size: 10px; font-weight: 800; color: #059669; text-transform: uppercase;">SUPPORTING GOAL • UN SDG 13</div>
                        <div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px;">SDG 13: Climate Action</div>
                        <p style="font-size: 11px; color: #475569; margin-top: 4px;"><strong>Target 13.3:</strong> Mitigates upstream manufacturing industrial carbon emissions and avoids organic paper/cardboard landfill methane generation.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 3: Problem & Solution -->
        <div class="slide">
            <div>
                <div class="header-tag">Challenges & Innovative Solution</div>
                <div class="slide-title">Problem Statement & SecondLife AI Approach</div>
            </div>
            <div class="grid-equal">
                <div class="card" style="border-left: 4px solid #e11d48;">
                    <div style="font-size: 12px; font-weight: 800; color: #e11d48; text-transform: uppercase;">THE PROBLEM</div>
                    <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 4px 0 12px 0;">Linear 'Take-Make-Dispose' Economy</div>
                    <ul class="bullet-list">
                        <li><strong>Global Waste Accumulation:</strong> Millions of usable items are thrown directly into landfills due to lack of immediate disposal options.</li>
                        <li><strong>Consumer Uncertainty:</strong> Users lack actionable guidance on whether an item can be repaired, donated, upcycled, or recycled.</li>
                        <li><strong>Improper Segregation:</strong> Incorrect classification leads to contaminated recycling streams and lost circular value.</li>
                    </ul>
                </div>

                <div class="card card-emerald" style="border-left: 4px solid #059669;">
                    <div style="font-size: 12px; font-weight: 800; color: #047857; text-transform: uppercase;">OUR SOLUTION</div>
                    <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 4px 0 12px 0;">SecondLife AI Circular Platform</div>
                    <ul class="bullet-list">
                        <li><strong>Instant AI Image & Text Classifier:</strong> Classifies items across 8 core target categories (Electronics, Clothing, Paper, Plastic, Glass, Metal, Furniture, Other).</li>
                        <li><strong>Condition-Aware Recommendation Engine:</strong> Evaluates item condition (Good, Fair, Damaged, Not usable) for tailored action paths.</li>
                        <li><strong>QR Tagging & Provenance:</strong> Generates scannable QR tags and provenance certificates for community sharing.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- SLIDE 4: Home Screenshot -->
        <div class="slide">
            <div>
                <div class="header-tag">User Interface & Experience</div>
                <div class="slide-title">Platform Landing Page & Navigation Overview</div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">KEY INTERFACE FEATURES</div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">Modern & Accessible UI</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>Hero Call-to-Action:</strong> Quick access to upload items or view SDG impact metrics.</li>
                        <li><strong>Seamless Navigation:</strong> Direct routing to AI Analyzer, 100-Item History Table, Dashboard, and Learn & Act pages.</li>
                        <li><strong>Responsive Design:</strong> Styled with Tailwind CSS for optimal viewing across mobile, tablet, and desktop screens.</li>
                    </ul>
                </div>
                <div class="img-container">
                    <img src="{b64_home}" alt="Home Page Screenshot">
                </div>
            </div>
        </div>

        <!-- SLIDE 5: Analyze Screenshot -->
        <div class="slide">
            <div>
                <div class="header-tag">Artificial Intelligence Core</div>
                <div class="slide-title">AI Item Analyzer & Category Correction Engine</div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">AI CLASSIFICATION PIPELINE</div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">Vision & Heuristic Model</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>MobileNetV2 Vision Model:</strong> Analyzes uploaded image features with PyTorch inference fallback.</li>
                        <li><strong>Category Normalization:</strong> Maps inputs cleanly into 8 standard target categories.</li>
                        <li><strong>Category Correction Modal:</strong> Allows user to easily correct AI classification with instant state sync.</li>
                    </ul>
                </div>
                <div class="img-container">
                    <img src="{b64_analyze}" alt="AI Analyzer Screenshot">
                </div>
            </div>
        </div>

        <!-- SLIDE 6: QR Tag Feature -->
        <div class="slide">
            <div>
                <div class="header-tag">Asset Tracking & Circular Trust</div>
                <div class="slide-title">Printable QR Tag & Provenance Certificate</div>
            </div>
            <div class="grid-3">
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">01. QR TAG GENERATION</div>
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 4px;">High-Res QR API</div>
                    <p style="font-size: 12px; color: #475569; margin-top: 10px; line-height: 1.5;">Generates scannable QR tags encoding item ID, title, and provenance link. Designed for standard label printers to stick onto items.</p>
                </div>
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">02. DIGITAL PROVENANCE</div>
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 4px;">Item Passport</div>
                    <p style="font-size: 12px; color: #475569; margin-top: 10px; line-height: 1.5;">Verifies item authenticity, material category, and circularity score to build trust between donors, charities, and second-hand buyers.</p>
                </div>
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">03. CIRCULAR HANDOFF</div>
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 4px;">Print Modal Utility</div>
                    <p style="font-size: 12px; color: #475569; margin-top: 10px; line-height: 1.5;">Integrated print dialog window accessible across Analyze, History, and Item Detail pages for instant label printing.</p>
                </div>
            </div>
        </div>

        <!-- SLIDE 7: History Screenshot -->
        <div class="slide">
            <div>
                <div class="header-tag">Data Architecture & Storage</div>
                <div class="slide-title">100-Item Analyzed History & SQLite Backend</div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">DATABASE ARCHITECTURE</div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">SQLite 3 Database</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>Persistent Storage:</strong> SQLite database file located at <code>backend/secondlife.db</code>.</li>
                        <li><strong>100 Seeded Item Records:</strong> Realistic condition balance (Damaged: 28, Fair: 28, Good: 29, Not usable: 11, Excellent: 4).</li>
                        <li><strong>Interactive Table:</strong> Instant searching, filtering, and detail modal viewing.</li>
                    </ul>
                </div>
                <div class="img-container">
                    <img src="{b64_history}" alt="History Page Screenshot">
                </div>
            </div>
        </div>

        <!-- SLIDE 8: Dashboard Screenshot -->
        <div class="slide">
            <div>
                <div class="header-tag">Analytics & Metrics</div>
                <div class="slide-title">Sustainability Dashboard & Circularity Scoring</div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">ANALYTICS & METRICS</div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">Circularity Score (0-100)</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>Circularity Index:</strong> Evaluates reusability, recyclability, and repair potential.</li>
                        <li><strong>Live KPI Counters:</strong> Tracks total items analyzed, waste diverted, and community donations.</li>
                        <li><strong>Category Distribution:</strong> Visual breakdown across all 8 target categories.</li>
                    </ul>
                </div>
                <div class="img-container">
                    <img src="{b64_dashboard}" alt="Dashboard Page Screenshot">
                </div>
            </div>
        </div>

        <!-- SLIDE 9: SDG Impact Page Screenshot -->
        <div class="slide">
            <div>
                <div class="header-tag">Academic Integrity & Framework</div>
                <div class="slide-title">UN Sustainable Development Goals Mapping Page</div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase;">SDG IMPACT PAGE</div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">Transparent Framework</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>Dedicated SDG Page:</strong> In-depth mapping for SDG 12, SDG 11, and SDG 13.</li>
                        <li><strong>Energy Savings Facts:</strong> Highlights facts like 95% energy saved recycling aluminum.</li>
                        <li><strong>Academic Integrity:</strong> Explains qualitative scoring without unverified carbon metrics.</li>
                    </ul>
                </div>
                <div class="img-container">
                    <img src="{b64_sdg}" alt="SDG Page Screenshot">
                </div>
            </div>
        </div>

        <!-- SLIDE 10: Tech Stack & Roadmap (Dark Theme) -->
        <div class="slide dark-theme">
            <div>
                <div class="header-tag">Technology & Horizon</div>
                <div class="slide-title">Technical Architecture & Future Roadmap</div>
            </div>
            <div class="grid-equal">
                <div class="card">
                    <div style="font-size: 12px; font-weight: 800; color: #34d399; text-transform: uppercase;">TECHNOLOGY STACK</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>Frontend:</strong> React 18, Vite, Tailwind CSS, Lucide Icons, React Router.</li>
                        <li><strong>Backend API:</strong> FastAPI (Python 3), Uvicorn ASGI Server.</li>
                        <li><strong>AI Model:</strong> PyTorch MobileNetV2 + Word Boundary Regex Heuristics.</li>
                        <li><strong>Database:</strong> SQLite 3 Engine (<code>secondlife.db</code>).</li>
                    </ul>
                </div>

                <div class="card" style="border-color: #f59e0b;">
                    <div style="font-size: 12px; font-weight: 800; color: #fbbf24; text-transform: uppercase;">FUTURE ROADMAP</div>
                    <ul class="bullet-list" style="margin-top: 14px;">
                        <li><strong>Geolocation Recycling Map:</strong> Integration with Leaflet/OpenStreetMap to find nearby drop-off centers.</li>
                        <li><strong>P2P Marketplace API:</strong> Direct item donation and second-hand exchange listing.</li>
                        <li><strong>IoT Smart Sorting Bins:</strong> Physical waste sorting bins with automatic camera classification.</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

    <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const counter = document.getElementById('slideCounter');

        function updateSlide() {{
            slides.forEach((s, idx) => {{
                if (idx === currentSlide) {{
                    s.classList.add('active');
                }} else {{
                    s.classList.remove('active');
                }}
            }});
            counter.innerText = `Slide ${{currentSlide + 1}} of ${{slides.length}}`;
        }}

        function nextSlide() {{
            if (currentSlide < slides.length - 1) {{
                currentSlide++;
                updateSlide();
            }}
        }}

        function prevSlide() {{
            if (currentSlide > 0) {{
                currentSlide--;
                updateSlide();
            }}
        }}

        function toggleFullscreen() {{
            const elem = document.getElementById('slideDeck');
            if (!document.fullscreenElement) {{
                elem.requestFullscreen().catch(err => alert(err.message));
            }} else {{
                document.exitFullscreen();
            }}
        }}

        document.addEventListener('keydown', (e) => {{
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }});
    </script>
</body>
</html>
"""

output_path = r"c:\Users\MINHA FATHIMA C\OneDrive\Desktop\ai\SecondLife_AI_Presentation.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"HTML presentation successfully generated at: {output_path}")
