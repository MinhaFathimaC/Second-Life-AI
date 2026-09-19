"""
SecondLife AI - NGO & Drop-Off Directory Service
Provides verified NGO partners, recycling collection points, and eco drop-off hubs.
"""

NGO_PARTNERS = [
    {
        "id": 1,
        "name": "ThreadForward Foundation",
        "category_focus": "Clothing",
        "type": "Apparel & Textiles Charity",
        "location": "Downtown Eco-Hub, 42 Green St",
        "city": "Metro Center",
        "phone": "+1 (555) 234-8901",
        "contact_email": "donate@threadforward.org",
        "website": "https://example.org/threadforward",
        "hours": "Mon-Sat: 9:00 AM - 6:00 PM",
        "verification": "Verified Non-Profit 501(c)(3)",
        "pickup_available": True,
        "description": "Collects gently used apparel and footwear for low-income families and job interview wardrobe programs."
    },
    {
        "id": 2,
        "name": "Digital Bridge Initiative",
        "category_focus": "Electronics",
        "type": "E-Waste & Refurbishing Center",
        "location": "Tech Park Building 4, 108 Innovation Way",
        "city": "Metro Center",
        "phone": "+1 (555) 876-5432",
        "contact_email": "contact@digitalbridge.org",
        "website": "https://example.org/digitalbridge",
        "hours": "Mon-Fri: 8:30 AM - 5:30 PM",
        "verification": "Certified E-Waste Recycler",
        "pickup_available": True,
        "description": "Refurbishes smartphones, laptops, and cables for underserved school districts and digital literacy."
    },
    {
        "id": 3,
        "name": "Furnish-A-Home Alliance",
        "category_focus": "Furniture",
        "type": "Community Housing Furniture Depot",
        "location": "Warehouse District, 750 Commerce Blvd",
        "city": "Metro Center",
        "phone": "+1 (555) 345-6789",
        "contact_email": "pickups@furnishhome.org",
        "website": "https://example.org/furnishhome",
        "hours": "Tue-Sun: 10:00 AM - 5:00 PM",
        "verification": "Verified Housing Non-Profit",
        "pickup_available": True,
        "description": "Accepts usable chairs, tables, desks, and storage cabinets for families transitioning out of shelters."
    },
    {
        "id": 4,
        "name": "EcoPlast Circular Recyclers",
        "category_focus": "Plastic",
        "type": "Polymer Recovery Drop-Off",
        "location": "Recycling Depot #12, 120 Industry Rd",
        "city": "East Metro",
        "phone": "+1 (555) 432-1098",
        "contact_email": "dropoff@ecoplast.org",
        "website": "https://example.org/ecoplast",
        "hours": "Mon-Sun: 7:00 AM - 7:00 PM",
        "verification": "Municipal Certified Facility",
        "pickup_available": False,
        "description": "Processes sorted PP, PET, and rigid household containers into recycled plastic pellet feedstocks."
    },
    {
        "id": 5,
        "name": "Metals & Glass Recovery Alliance",
        "category_focus": "Glass",
        "type": "Glass & Scrap Metal Drop-Off",
        "location": "Harbor Eco Yards, 300 Dockside Ave",
        "city": "South Port",
        "phone": "+1 (555) 654-9870",
        "contact_email": "recycle@metalsglass.org",
        "website": "https://example.org/metalsglass",
        "hours": "Mon-Sat: 8:00 AM - 5:00 PM",
        "verification": "Certified Industrial Recycler",
        "pickup_available": False,
        "description": "Infinite recycling center for clean glass jars, bottles, aluminum tins, and cookware."
    },
    {
        "id": 6,
        "name": "PaperCycle Community Depot",
        "category_focus": "Paper",
        "type": "Fiber & Cardboard Collection",
        "location": "Civic Center Loop, 15 Park Ave",
        "city": "Metro Center",
        "phone": "+1 (555) 987-1234",
        "contact_email": "info@papercycle.org",
        "website": "https://example.org/papercycle",
        "hours": "24/7 Outdoor Collection Bins",
        "verification": "Municipal Partner",
        "pickup_available": False,
        "description": "Accepts corrugated boxes, office paper, and newsprint for zero-waste paper pulp processing."
    },
    {
        "id": 7,
        "name": "GreenCircle Upcycling Collective",
        "category_focus": "Other",
        "type": "Maker Collective & Upcycle Lab",
        "location": "Arts District, 88 Creative Alley",
        "city": "Metro Center",
        "phone": "+1 (555) 111-2233",
        "contact_email": "hello@greencircle.org",
        "website": "https://example.org/greencircle",
        "hours": "Wed-Sun: 11:00 AM - 8:00 PM",
        "verification": "Community Eco-Hub Partner",
        "pickup_available": True,
        "description": "Connects donors with local artisans, woodworkers, and makers who repurpose miscellaneous items into art."
    }
]

def get_ngo_partners(category: str = None, search: str = None):
    """Returns NGO partners filtered by item category focus or location search term."""
    results = NGO_PARTNERS
    
    if category and category != "All":
        matched = [ngo for ngo in results if ngo["category_focus"].lower() == category.lower()]
        if matched:
            results = matched

    if search:
        s = search.lower()
        results = [
            ngo for ngo in results
            if s in ngo["name"].lower() or s in ngo["location"].lower() or s in ngo["category_focus"].lower() or s in ngo["description"].lower()
        ]

    return results
