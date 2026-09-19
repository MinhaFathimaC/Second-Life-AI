"""
SecondLife AI - Upgrade Recommendation Engine
Computes multi-action suitability scores (0-100) for all 5 actions (DONATE, REUSE, REPAIR, UPCYCLE, RECYCLE),
supports goal personalization, score factor breakdowns, "What if I throw it away?" warning, and step-by-step Action Plan.
"""

CATEGORIES = [
    "Clothing", "Plastic", "Paper", "Glass", "Metal", "Furniture", "Electronics", "Other"
]

CONDITIONS = [
    "Excellent", "Good", "Fair", "Damaged", "Not usable"
]

USER_GOALS = [
    "save_money", "help_someone", "reduce_waste", "get_creative", "recycle_responsibly"
]

MATERIAL_LOOKUP = {
    "Clothing": "Cotton & Blended Textiles",
    "Plastic": "Polypropylene (PP) / PET Plastic",
    "Paper": "Corrugated Cardboard & Paperboard",
    "Glass": "Silica / Container Glass",
    "Metal": "Scrap Aluminum & Ferrous Alloy",
    "Furniture": "Solid Wood & Fabric Upholstery",
    "Electronics": "Silicon Circuits & Composite Plastics",
    "Other": "Mixed Household Materials"
}

def generate_recommendation(category: str, condition: str, user_preference: str = "reduce_waste"):
    """
    Computes complete circularity analysis with multi-action suitability scores,
    personalized goal weighting, factor breakdowns, disposal warnings, and step-by-step action plan.
    """
    category = category.capitalize() if category.capitalize() in CATEGORIES else category
    if category not in CATEGORIES:
        category = "Other"

    cond_norm = condition.lower()
    material = MATERIAL_LOOKUP.get(category, "Mixed Materials")

    # Base Scores Matrix for ALL 5 actions (Donate, Reuse, Repair, Upcycle, Recycle)
    scores = {
        "DONATE": 50,
        "REUSE": 50,
        "REPAIR": 40,
        "UPCYCLE": 45,
        "RECYCLE": 40
    }

    # Condition & Category Rules
    if category == "Clothing":
        if cond_norm == "excellent":
            scores = {"DONATE": 94, "REUSE": 88, "UPCYCLE": 70, "REPAIR": 50, "RECYCLE": 40}
            reason = "The clothing item is in pristine condition. Donating extends its lifespan and supports community welfare."
            ideas = [
                "Donate to local verified charities or community clothing drives.",
                "Organize a community clothing swap event.",
                "Pass down to friends or family members.",
                "Sell on pre-loved fashion marketplaces."
            ]
        elif cond_norm == "good":
            scores = {"DONATE": 92, "REUSE": 85, "UPCYCLE": 76, "REPAIR": 60, "RECYCLE": 48}
            reason = "The garment appears reusable and is in good condition, suitable for donation or continued personal wear."
            ideas = [
                "Donate to someone who needs it or a local charity.",
                "Wear casually for home, gardening, or lounging.",
                "Convert into a stylish reusable cotton tote bag.",
                "Repurpose stylish accents into patchwork fashion."
            ]
        elif cond_norm == "fair":
            scores = {"REUSE": 85, "UPCYCLE": 82, "REPAIR": 75, "DONATE": 65, "RECYCLE": 55}
            reason = "The garment shows mild wear. Repurposing or upcycling fabric saves virgin textiles."
            ideas = [
                "Cut and hem into summer shorts or a cropped top.",
                "Transform fabric into reusable cotton shopping bags.",
                "Craft custom throw pillow covers or quilt patches.",
                "Use as casual home loungewear."
            ]
        else: # Damaged / Not usable
            scores = {"UPCYCLE": 86, "RECYCLE": 80, "REPAIR": 45, "REUSE": 40, "DONATE": 20}
            reason = "The fabric is damaged or worn out. Textile upcycling or fabric recycling prevents landfill dumping."
            ideas = [
                "Cut fabric into absorbent cleaning rags or shop wipes.",
                "Use as stuffing for cushions, pet beds, or craft toys.",
                "Braided rag rug or coasters DIY project.",
                "Drop off at a specialized textile recycling collection bin."
            ]

    elif category == "Plastic":
        if cond_norm in ["excellent", "good"]:
            scores = {"REUSE": 90, "UPCYCLE": 82, "RECYCLE": 70, "DONATE": 55, "REPAIR": 40}
            reason = "Reusing clean plastic containers avoids single-use plastic consumption and energy-intensive manufacturing."
            ideas = [
                "Use as durable storage for food, hardware, or craft supplies.",
                "Convert into a self-watering indoor plant pot.",
                "Organize desktop drawers and pencil holders.",
                "Rinse thoroughly and reuse for bulk food prep."
            ]
        elif cond_norm == "fair":
            scores = {"REUSE": 82, "UPCYCLE": 80, "RECYCLE": 75, "REPAIR": 50, "DONATE": 40}
            reason = "Plastic in fair condition can still serve functional storage or garden utility before recycling."
            ideas = [
                "Cut into garden seedling markers or plant labels.",
                "Use as workshop hardware screw container.",
                "Convert into a bird feeder or funnel.",
                "Recycle in curbside plastic collection when retired."
            ]
        else:
            scores = {"RECYCLE": 88, "UPCYCLE": 70, "REUSE": 35, "REPAIR": 20, "DONATE": 10}
            reason = "Damaged or brittle plastic should be recycled through local municipal collection bins."
            ideas = [
                "Check resin code (PET #1 / HDPE #2) and place in proper recycling bin.",
                "Ensure container is clean and dry before recycling.",
                "Drop off at specialized plastic collection points.",
                "Upcycle intact plastic pieces into garden tags."
            ]

    elif category == "Paper":
        if cond_norm in ["excellent", "good"]:
            scores = {"REUSE": 90, "RECYCLE": 85, "UPCYCLE": 78, "DONATE": 60, "REPAIR": 30}
            reason = "Paper and cardboard in good condition can serve multiple packaging or crafting purposes."
            ideas = [
                "Use cardboard boxes for storage or shipping parcels.",
                "Use reverse side for note-taking, sketching, or printing drafts.",
                "Shred for eco-friendly packaging filler.",
                "Craft origami, gift tags, or bookmark decorations."
            ]
        else:
            scores = {"RECYCLE": 92, "UPCYCLE": 75, "REUSE": 40, "REPAIR": 15, "DONATE": 10}
            reason = "Paper fibers can be recycled into new paper products up to 5 to 7 times."
            ideas = [
                "Flatten cardboard boxes and bundle for curb recycling.",
                "Shred non-glossy paper into backyard compost bin as brown material.",
                "Use shredded paper as garden mulch or weed barrier.",
                "Repurpose into handmade seed paper cards."
            ]

    elif category == "Glass":
        if cond_norm in ["excellent", "good", "fair"]:
            scores = {"REUSE": 92, "UPCYCLE": 84, "DONATE": 70, "RECYCLE": 68, "REPAIR": 30}
            reason = "Glass is 100% infinitely reusable and non-toxic for food and home storage."
            ideas = [
                "Sanitize jar and use for pantry food or spice storage.",
                "Convert glass bottles into aesthetic flower vases or candle holders.",
                "Create a mini terrarium or hydro propagation station.",
                "Use jar for liquid prep, smoothies, or overnight oats."
            ]
        else:
            scores = {"RECYCLE": 90, "UPCYCLE": 65, "REUSE": 25, "REPAIR": 15, "DONATE": 0}
            reason = "Damaged or chipped glass should be handled safely and recycled at glass bottle banks."
            ideas = [
                "Wrap broken glass safely and deposit in glass recycling center.",
                "Use smoothed glass pieces for mosaic art or garden stones.",
                "Crushed cullet glass can be recycled infinitely into new containers.",
                "Dispose of non-recyclable glass according to local rules."
            ]

    elif category == "Metal":
        if cond_norm in ["excellent", "good"]:
            scores = {"REUSE": 88, "DONATE": 85, "REPAIR": 80, "RECYCLE": 75, "UPCYCLE": 72}
            reason = "Durable metal items retain high structural integrity and high scrap value."
            ideas = [
                "Reuse metal containers or tins for organization.",
                "Donate metal cookware or tools in good condition to charities.",
                "Repurpose metal cans into stationery holders or lanterns.",
                "Clean and use metal trays as plant drip saucers."
            ]
        elif cond_norm == "fair":
            scores = {"REPAIR": 85, "REUSE": 82, "RECYCLE": 78, "UPCYCLE": 75, "DONATE": 60}
            reason = "Scratched or slightly rusted metal items can often be restored easily with basic cleaning."
            ideas = [
                "Remove surface rust with vinegar or baking soda and repaint.",
                "Tighten loose screws or joints to restore full functionality.",
                "Use metal tins as outdoor planter containers.",
                "Repurpose metal rods or wire as garden plant supports."
            ]
        else:
            scores = {"RECYCLE": 95, "UPCYCLE": 70, "REPAIR": 30, "REUSE": 25, "DONATE": 10}
            reason = "Metals (aluminum & steel) require 95% less energy to recycle than producing from raw ore."
            ideas = [
                "Take to a local scrap metal recycling dealer.",
                "Place clean aluminum cans in curbside recycling bins.",
                "Upcycle scrap metal parts into garden sculptures or wind chimes.",
                "Ensure tin cans are rinsed and flattened."
            ]

    elif category == "Furniture":
        if cond_norm in ["excellent", "good"]:
            scores = {"DONATE": 94, "REUSE": 88, "REPAIR": 75, "UPCYCLE": 70, "RECYCLE": 45}
            reason = "Sturdy furniture in good condition can provide comfort to families in need."
            ideas = [
                "Donate to community shelters, schools, or non-profit stores.",
                "Sell or gift on local community re-use networks.",
                "Rearrange in another room for a fresh interior look.",
                "Provide to college students moving into new apartments."
            ]
        elif cond_norm == "fair":
            scores = {"REPAIR": 88, "UPCYCLE": 82, "REUSE": 78, "DONATE": 70, "RECYCLE": 50}
            reason = "Minor aesthetic blemishes on furniture are easily fixable with basic sanding or paint."
            ideas = [
                "Sand down scratches and apply a fresh coat of wood stain or varnish.",
                "Re-upholster worn chair seats with new fabric.",
                "Replace old drawer handles or knobs for a modern accent.",
                "Fix wobbly legs using wood glue or metal brackets."
            ]
        else:
            scores = {"UPCYCLE": 80, "RECYCLE": 75, "REPAIR": 60, "REUSE": 40, "DONATE": 20}
            reason = "Dismantling damaged furniture yields reclaimed wood, metal, and hardware."
            ideas = [
                "Dismantle wood panels to build garden planters or wall shelves.",
                "Save hinges, screws, and metal brackets for future repair projects.",
                "Repurpose table tops into workbench surfaces.",
                "Drop off wood/metal components at municipal bulky waste recycling."
            ]

    elif category == "Electronics":
        if cond_norm in ["excellent", "good"]:
            scores = {"DONATE": 92, "REUSE": 88, "REPAIR": 75, "RECYCLE": 60, "UPCYCLE": 50}
            reason = "Functional electronics can bridge the digital divide for students or community members."
            ideas = [
                "Donate to educational initiatives or digital inclusion charities.",
                "Wipe personal data and sell or trade in for store credit.",
                "Use as a dedicated home server, media player, or smart clock.",
                "Keep as a reliable backup device."
            ]
        elif cond_norm == "fair":
            scores = {"REPAIR": 86, "REUSE": 80, "DONATE": 75, "RECYCLE": 70, "UPCYCLE": 40}
            reason = "Replacing a battery or updating software can restore electronics to peak performance."
            ideas = [
                "Replace worn battery or broken screen at an authorized repair shop.",
                "Install lightweight Linux OS to speed up older laptops.",
                "Repurpose old smartphone as a security camera or dashcam.",
                "Clean ports and vents to resolve overheating."
            ]
        else:
            scores = {"RECYCLE": 94, "REPAIR": 50, "REUSE": 30, "UPCYCLE": 25, "DONATE": 10}
            reason = "E-waste contains valuable rare metals and toxic materials that MUST NOT enter landfills."
            ideas = [
                "Drop off at certified E-Waste collection bins (e.g. store drop-offs).",
                "Contact local municipal hazardous waste recycling program.",
                "Extract working power adapters, cables, or RAM modules.",
                "Utilize manufacturer trade-in or e-waste recycling programs."
            ]

    else: # Other
        if cond_norm in ["excellent", "good"]:
            scores = {"DONATE": 85, "REUSE": 82, "UPCYCLE": 70, "RECYCLE": 60, "REPAIR": 50}
            reason = "Uncategorized items in good shape can still benefit community sharing systems."
            ideas = [
                "Offer free to neighbors on local gift economy platforms.",
                "Donate to community centers or charity shops.",
                "Re-evaluate functional uses around your home.",
                "Store neatly for future seasonal use."
            ]
        else:
            scores = {"RECYCLE": 78, "UPCYCLE": 72, "REUSE": 60, "REPAIR": 40, "DONATE": 20}
            reason = "Separate mixed components to channel recyclable materials into correct waste streams."
            ideas = [
                "Disassemble into metal, plastic, or paper components.",
                "Recycle compatible materials in designated local bins.",
                "Upcycle usable parts into DIY household items.",
                "Dispose responsibly following local waste guidance."
            ]

    # Apply User Preference Goal Weighting Adjustment
    if user_preference == "help_someone":
        scores["DONATE"] = min(99, scores["DONATE"] + 6)
    elif user_preference == "get_creative":
        scores["UPCYCLE"] = min(99, scores["UPCYCLE"] + 8)
    elif user_preference == "save_money":
        scores["REPAIR"] = min(99, scores["REPAIR"] + 6)
        scores["REUSE"] = min(99, scores["REUSE"] + 5)
    elif user_preference == "recycle_responsibly":
        scores["RECYCLE"] = min(99, scores["RECYCLE"] + 7)

    # Sort actions by score descending
    sorted_actions = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    best_action, best_score = sorted_actions[0]
    alt_action, alt_score = sorted_actions[1]

    # Calculate Circularity Score (0-100) & Factor Breakdown
    cond_factor = 20 if cond_norm == "excellent" else (18 if cond_norm == "good" else (15 if cond_norm == "fair" else 10))
    reuse_factor = min(20, int(scores["REUSE"] * 0.20))
    donate_factor = min(20, int(scores["DONATE"] * 0.20))
    upcycle_factor = min(20, int(scores["UPCYCLE"] * 0.20))
    recycle_factor = min(20, int(scores["RECYCLE"] * 0.20))

    total_circularity_score = cond_factor + reuse_factor + donate_factor + upcycle_factor + recycle_factor

    # Disposal Warning text
    if total_circularity_score >= 70:
        disposal_warning = f"This item has a high circularity potential ({total_circularity_score}/100). Reusing or donating it keeps valuable products in circulation and prevents premature landfill disposal."
    else:
        disposal_warning = f"Although this item has lower direct reuse potential, proper recycling prevents hazardous materials from contaminating soil and water systems."

    # Action Plan Next Steps
    if best_action == "DONATE":
        action_plan = [
            "1. Clean and sanitize the item.",
            "2. Confirm all components or zippers are intact.",
            "3. Select 'DONATE' as your primary circular choice.",
            "4. Connect with a verified charity or community donation drop-off."
        ]
    elif best_action == "REUSE":
        action_plan = [
            "1. Rinse or wipe down the item thoroughly.",
            "2. Select a practical home or storage application.",
            "3. Repurpose immediately without buying new products.",
            "4. Keep item in active circular use."
        ]
    elif best_action == "REPAIR":
        action_plan = [
            "1. Inspect the damaged area or missing joint.",
            "2. Gather basic repair tools (glue, needle/thread, screwdriver).",
            "3. Perform minor restoration to extend useful lifespan.",
            "4. Re-introduce repaired item back into daily use."
        ]
    elif best_action == "UPCYCLE":
        action_plan = [
            "1. Clean the raw material surface.",
            "2. Choose a creative DIY project (tote bag, planter, organizer).",
            "3. Cut or assemble parts into a useful new craft object.",
            "4. Enjoy your new upcycled item."
        ]
    else: # RECYCLE
        action_plan = [
            "1. Separate non-recyclable attachments or caps.",
            "2. Clean residue or dry the material.",
            "3. Check local municipal recycling resin/scrap codes.",
            "4. Deposit in designated recycling stream or e-waste drop-off."
        ]

    # All multi-action suitability list formatted for UI
    all_scores_list = [
        {"action": act, "score": scr} for act, scr in sorted_actions
    ]

    return {
        "category": category,
        "material": material,
        "condition": condition,
        "user_preference": user_preference,
        "primary_action": best_action,
        "primary_score": best_score,
        "alternative_action": alt_action,
        "alternative_score": alt_score,
        "recommendation_reason": reason,
        "all_suitability_scores": all_scores_list,
        "second_life_ideas": ideas,
        "disposal_warning": disposal_warning,
        "action_plan": action_plan,
        "impact": {
            "waste_avoided": "High" if total_circularity_score >= 75 else "Medium",
            "resource_saving": "High" if total_circularity_score >= 80 else "Medium",
            "environmental_benefit": "High" if total_circularity_score >= 70 else "Medium",
            "sustainability_score": total_circularity_score,
            "score_factors": {
                "condition_factor": f"{cond_factor}/20",
                "reuse_factor": f"{reuse_factor}/20",
                "donation_factor": f"{donate_factor}/20",
                "upcycling_factor": f"{upcycle_factor}/20",
                "recycling_factor": f"{recycle_factor}/20",
                "total": f"{total_circularity_score}/100"
            }
        },
        "disclaimer": "Impact values are application estimates for educational purposes and are not official environmental measurements."
    }
