import os
import json
import random
from datetime import datetime, timedelta
from app.database import get_db, init_db

# 100 items with balanced conditions (including "Damaged", "Not usable", "Fair", "Good", "Excellent")
ITEMS_100 = [
    # Electronics (20)
    ("Dell XPS 15 Laptop", "Electronics", "Damaged", 0.94, "REPAIR", "RECYCLE", ["Replace broken screen hinge and battery.", "Recycle copper heatsink and battery cell.", "Use motherboard for spare parts."], 72, "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80"),
    ("Apple MacBook Pro 13-inch", "Electronics", "Excellent", 0.98, "REUSE", "DONATE", ["Trade in on official refurb program.", "Donate to student non-profit organization.", "Use for digital graphic design."], 94, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80"),
    ("Lenovo ThinkPad X1", "Electronics", "Not usable", 0.91, "RECYCLE", "UPCYCLE", ["Drop off at certified e-waste recycling center.", "Extract lithium battery safely.", "Scrap aluminum body."], 65, "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80"),
    ("iPhone 12 Smartphone", "Electronics", "Damaged", 0.92, "REPAIR", "RECYCLE", ["Replace shattered front OLED screen.", "Recycle components at e-waste kiosk.", "Use as smart home dashboard."], 75, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"),
    ("Samsung Galaxy S21 5G", "Electronics", "Fair", 0.89, "REPAIR", "REUSE", ["Replace cracked back glass cover.", "Use as security camera monitor.", "Trade in for refurbished credits."], 82, "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80"),
    ("iPad Air 4th Gen", "Electronics", "Good", 0.95, "REUSE", "DONATE", ["Use as digital sketchbook.", "Donate to primary school digital library.", "Gift to student."], 90, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80"),
    ("Sony Wireless Headphones", "Electronics", "Damaged", 0.87, "REPAIR", "RECYCLE", ["Solder loose audio wire connection.", "Replace worn ear cushions.", "Recycle battery and drivers."], 70, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"),
    ("Logitech MX Master Mouse", "Electronics", "Fair", 0.90, "REPAIR", "REUSE", ["Clean optical sensor trackball.", "Replace click switches.", "Pass along to coworker."], 83, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80"),
    ("Mechanical RGB Keyboard", "Electronics", "Not usable", 0.88, "RECYCLE", "UPCYCLE", ["Desolder mechanical key switches for DIY macro pad.", "Recycle ABS plastic shell.", "Scrap USB cable."], 68, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"),
    ("LG 27-inch 4K Monitor", "Electronics", "Good", 0.96, "DONATE", "REUSE", ["Donate to community center workstation.", "Set up dual-monitor layout.", "Pass on to student."], 92, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80"),
    ("Canon DSLR Camera Body", "Electronics", "Fair", 0.91, "REPAIR", "REUSE", ["Clean camera sensor mirror.", "Use as stationary webcam.", "Donate to high school media club."], 84, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80"),
    ("Bluetooth Portable Speaker", "Electronics", "Damaged", 0.86, "RECYCLE", "REPAIR", ["Recycle battery and PCB board.", "Solder power port pin.", "Upcycle cone drivers."], 71, "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80"),
    ("Kindle Paperwhite E-Reader", "Electronics", "Excellent", 0.95, "DONATE", "REUSE", ["Donate to neighborhood library box.", "Load with open digital books.", "Gift to young reader."], 94, "https://images.unsplash.com/photo-1592496001020-d31bd816657f?w=400&q=80"),
    ("Wi-Fi 6 Router Unit", "Electronics", "Good", 0.90, "REUSE", "DONATE", ["Repurpose as range extender.", "Donate to community workspace.", "Use for guest Wi-Fi."], 86, "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80"),
    ("PlayStation 4 Console", "Electronics", "Damaged", 0.89, "REPAIR", "RECYCLE", ["Replace overheating cooling fan.", "Install new hard drive disk.", "Recycle power supply."], 74, "https://images.unsplash.com/photo-1507457379470-08b800bebc67?w=400&q=80"),
    ("Canon Laser Printer", "Electronics", "Not usable", 0.85, "RECYCLE", "REPAIR", ["Recycle plastic chassis and toner at e-waste facility.", "Scrap metal gears.", "Extract stepper motors."], 64, "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80"),
    ("Apple Watch Series 6", "Electronics", "Fair", 0.90, "REPAIR", "REUSE", ["Replace scratched screen lens.", "Use for fitness tracking.", "Pass to family member."], 81, "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80"),
    ("Anker 20000mAh Power Bank", "Electronics", "Good", 0.92, "REUSE", "DONATE", ["Keep in emergency outage kit.", "Donate to hiking group.", "Use on camping trips."], 89, "https://images.unsplash.com/photo-1609592424074-124e93d7c7bd?w=400&q=80"),
    ("USB-C Multiport Dock", "Electronics", "Damaged", 0.88, "REPAIR", "RECYCLE", ["Resolder loose HDMI port.", "Recycle aluminum casing.", "Use for spare USB ports."], 73, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"),
    ("Smart LED Desk Lamp", "Electronics", "Good", 0.90, "REUSE", "DONATE", ["Use for study desk lighting.", "Donate to student housing.", "Convert to ambient light."], 87, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80"),

    # Clothing (20)
    ("Vintage Denim Jacket", "Clothing", "Fair", 0.91, "UPCYCLE", "REPAIR", ["Patch elbow tears with patterned fabric.", "Hem into trendy sleeveless vest.", "Use fabric for DIY tote bag."], 81, "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80"),
    ("Cotton Graphic T-Shirt", "Clothing", "Damaged", 0.88, "UPCYCLE", "RECYCLE", ["Cut fabric into absorbent cleaning rags.", "Craft braided rag rug.", "Use as cushion stuffing."], 72, "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80"),
    ("Levi's 501 Slim Jeans", "Clothing", "Fair", 0.92, "REPAIR", "UPCYCLE", ["Mend frayed knee tears with denim patch.", "Cut into summer shorts.", "Repurpose denim for bags."], 83, "https://images.unsplash.com/photo-1542272604-780c36856d67?w=400&q=80"),
    ("Wool Knit Winter Sweater", "Clothing", "Good", 0.92, "DONATE", "REPAIR", ["Fix minor yarn pulls with needle.", "Donate to winter coat drive.", "Upcycle into pet bed liner."], 87, "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80"),
    ("Leather Biker Jacket", "Clothing", "Fair", 0.90, "REPAIR", "REUSE", ["Condition dry leather and fix zipper.", "Wear for casual outings.", "Resell vintage item."], 84, "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80"),
    ("Nike Air Max Sneakers", "Clothing", "Damaged", 0.87, "RECYCLE", "REPAIR", ["Drop off at shoe recycling collection.", "Glue detached sole edge.", "Use for rough gardening work."], 70, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"),
    ("Linen Button-Down Shirt", "Clothing", "Excellent", 0.95, "DONATE", "REUSE", ["Donate to clothing charity.", "Wear as summer casual shirt.", "Repurpose fabric."], 93, "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80"),
    ("Floral Summer Dress", "Clothing", "Not usable", 0.85, "UPCYCLE", "RECYCLE", ["Cut fabric into quilting patches.", "Craft handmade tote bag lining.", "Drop at textile recycling bin."], 66, "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80"),
    ("Trench Coat Outerwear", "Clothing", "Good", 0.94, "DONATE", "REUSE", ["Donate to winter shelter.", "Dry clean for formal wear.", "Pass along to colleague."], 91, "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80"),
    ("Hooded Fleece Sweatshirt", "Clothing", "Damaged", 0.86, "UPCYCLE", "RECYCLE", ["Shred fleece for pillow stuffing.", "Cut into car wash cleaning cloths.", "Make pet chew toys."], 71, "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80"),
    ("Leather Chelsea Boots", "Clothing", "Fair", 0.89, "REPAIR", "DONATE", ["Replace worn rubber heel soles.", "Polish leather.", "Donate to community shelter."], 82, "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&q=80"),
    ("Woolen Winter Scarf", "Clothing", "Good", 0.93, "DONATE", "REUSE", ["Donate to homeless shelter drive.", "Gift to friend.", "Wear during winter."], 89, "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80"),
    ("Sportswear Shorts", "Clothing", "Damaged", 0.86, "UPCYCLE", "RECYCLE", ["Use as workshop cleaning rags.", "Cut elastic for DIY projects.", "Textile recycling bin."], 69, "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80"),
    ("Classic Formal Blazer", "Clothing", "Excellent", 0.96, "DONATE", "REUSE", ["Donate to interview apparel program.", "Wear for meetings.", "Resell online."], 94, "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80"),
    ("Canvas High-Top Sneakers", "Clothing", "Not usable", 0.84, "RECYCLE", "UPCYCLE", ["Drop off at shoe recycling point.", "Use rubber sole scrap.", "Craft art piece."], 65, "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80"),
    ("Knitted Beanie Hat", "Clothing", "Good", 0.92, "DONATE", "REUSE", ["Donate to seasonal charity bank.", "Wear during winter walks.", "Gift to friend."], 88, "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&q=80"),
    ("Silk Patterned Necktie", "Clothing", "Good", 0.93, "DONATE", "UPCYCLE", ["Donate to charity store.", "Upcycle silk for hair ribbons.", "Keep for formal wear."], 90, "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&q=80"),
    ("Denim Overalls", "Clothing", "Fair", 0.91, "REPAIR", "REUSE", ["Stitch torn strap button.", "Wear for gardening.", "Donate to vintage shop."], 83, "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&q=80"),
    ("Thermal Base Layer Top", "Clothing", "Good", 0.90, "REUSE", "DONATE", ["Wear for winter sports.", "Donate to hiking group.", "Use for camping."], 86, "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80"),
    ("Woven Cotton Blanket", "Clothing", "Fair", 0.92, "DONATE", "UPCYCLE", ["Donate to animal shelter for pet bedding.", "Use as picnic blanket.", "Craft pet cushion cover."], 85, "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80"),

    # Paper (15)
    ("Corrugated Shipping Boxes", "Paper", "Fair", 0.89, "REUSE", "RECYCLE", ["Reuse for shipping or moving.", "Flatten for floor protection.", "Shred into compost heap."], 84, "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&q=80"),
    ("Hardcover Encyclopedia", "Paper", "Good", 0.93, "DONATE", "UPCYCLE", ["Donate to library or community hub.", "Craft secret book storage.", "Use for shelf decor."], 89, "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"),
    ("Spiral Grid Notebooks", "Paper", "Fair", 0.88, "RECYCLE", "REUSE", ["Use remaining blank pages.", "Shred used pages into compost.", "Recycle paper & metal coil."], 79, "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80"),
    ("Vintage Comic Book", "Paper", "Good", 0.94, "DONATE", "REUSE", ["Donate to youth literacy club.", "Frame covers for wall art.", "Trade with collectors."], 91, "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80"),
    ("Cardboard Packaging Cartons", "Paper", "Damaged", 0.86, "RECYCLE", "UPCYCLE", ["Flatten and place in curbside paper recycling.", "Shred into garden mulch.", "Use for weed barrier."], 72, "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80"),
    ("Architectural Sketchbook", "Paper", "Good", 0.92, "REUSE", "UPCYCLE", ["Use blank pages for draft notes.", "Repurpose paper into gift tags.", "Keep for creative ideas."], 87, "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80"),
    ("Monthly Science Magazines", "Paper", "Damaged", 0.85, "RECYCLE", "UPCYCLE", ["Cut out visuals for collage artwork.", "Place in paper recycling bin.", "Compost non-glossy pages."], 70, "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80"),
    ("Paper Shopping Bags", "Paper", "Fair", 0.89, "REUSE", "RECYCLE", ["Use as trash liners.", "Use for carrying items.", "Shred into compost."], 82, "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400&q=80"),
    ("Cardboard Storage Boxes", "Paper", "Good", 0.93, "REUSE", "DONATE", ["Use for organizing tax documents.", "Donate to non-profit.", "Store winter clothes."], 90, "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80"),
    ("Classic Novel Paperback", "Paper", "Fair", 0.90, "DONATE", "REUSE", ["Donate to little free library box.", "Pass on to fellow reader.", "Tape torn spine."], 84, "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80"),
    ("Kraft Wrapping Paper", "Paper", "Damaged", 0.84, "RECYCLE", "UPCYCLE", ["Shred into packaging filler.", "Compost brown paper.", "Recycle with paper stream."], 68, "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80"),
    ("Office Document Folders", "Paper", "Good", 0.90, "REUSE", "DONATE", ["Reuse for home document organizing.", "Donate to student group.", "Recycle worn folders."], 86, "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80"),
    ("Cardboard Shoe Boxes", "Paper", "Fair", 0.88, "UPCYCLE", "RECYCLE", ["Use for drawer organization.", "Convert into cable organizer.", "Recycle cardboard."], 80, "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80"),
    ("Printed Music Sheet Books", "Paper", "Good", 0.93, "DONATE", "UPCYCLE", ["Donate to music school.", "Use vintage music sheets for art craft.", "Keep for practice."], 90, "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80"),
    ("Recycled Note Cards", "Paper", "Not usable", 0.82, "RECYCLE", "UPCYCLE", ["Shred and compost into soil.", "Recycle paper stream.", "Use for papier-mâché art."], 64, "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&q=80"),

    # Plastic (15)
    ("Polypropylene Container", "Plastic", "Damaged", 0.87, "RECYCLE", "UPCYCLE", ["Recycle at municipal plastic bin.", "Cut into plant markers.", "Use for workshop screws."], 73, "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80"),
    ("PET Clear Water Bottles", "Plastic", "Not usable", 0.85, "RECYCLE", "UPCYCLE", ["Rinse and place in plastic recycling stream.", "Convert into garden drip irrigator.", "Craft bird feeder."], 66, "https://images.unsplash.com/photo-1548839140-29a749e1cf4e?w=400&q=80"),
    ("HDPE Detergent Jug", "Plastic", "Good", 0.93, "REUSE", "RECYCLE", ["Rinse thoroughly and use as garden scoop.", "Cut into durable plant markers.", "Recycle with plastics #2."], 87, "https://images.unsplash.com/photo-1585670149967-b4f4da88cc9f?w=400&q=80"),
    ("Plastic Bucket (5-Gal)", "Plastic", "Damaged", 0.88, "REPAIR", "UPCYCLE", ["Patch cracked bottom with plastic epoxy.", "Drill drainage holes for planter.", "Use for yard waste."], 74, "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&q=80"),
    ("Tupperware Food Box", "Plastic", "Fair", 0.90, "REUSE", "UPCYCLE", ["Use for food prep storage.", "Organize small workshop screws.", "Pass on to student."], 83, "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80"),
    ("Plastic Garden Planter Pots", "Plastic", "Damaged", 0.86, "RECYCLE", "UPCYCLE", ["Tape crack and use for seedlings.", "Recycle at garden center.", "Stack for storage."], 71, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80"),
    ("Rigid Plastic Storage Crate", "Plastic", "Good", 0.94, "REUSE", "DONATE", ["Use in car trunk for groceries.", "Donate to community pantry.", "Store garage tools."], 90, "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80"),
    ("Shampoo & Conditioner Bottles", "Plastic", "Not usable", 0.83, "RECYCLE", "UPCYCLE", ["Rinse clean and deposit in recycling.", "Cut into plastic funnel tool.", "Repurpose container."], 65, "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80"),
    ("Plastic Cutlery Tray", "Plastic", "Fair", 0.89, "REUSE", "UPCYCLE", ["Use for kitchen drawer organizing.", "Organize workshop screws.", "Pass on to neighbor."], 82, "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&q=80"),
    ("Beverage Cooler Jug", "Plastic", "Damaged", 0.87, "REPAIR", "RECYCLE", ["Replace broken spigot valve.", "Use for outdoor sports hydration.", "Recycle plastic body."], 73, "https://images.unsplash.com/photo-1527156231393-7023794f363c?w=400&q=80"),
    ("Plastic Drawer Unit", "Plastic", "Good", 0.92, "REUSE", "DONATE", ["Use for stationery storage.", "Donate to classroom.", "Organize office accessories."], 87, "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80"),
    ("Reusable Plastic Tumbler", "Plastic", "Fair", 0.89, "REUSE", "UPCYCLE", ["Use for cold drinks.", "Use as desk pen holder.", "Keep at work desk."], 83, "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&q=80"),
    ("Plastic Watering Can", "Plastic", "Damaged", 0.85, "REPAIR", "RECYCLE", ["Seal spout leak with silicone.", "Use for indoor plants.", "Recycle plastic."], 72, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80"),
    ("Plastic Food Storage Jars", "Plastic", "Good", 0.90, "REUSE", "UPCYCLE", ["Use for dry bean & grain storage.", "Organize craft buttons.", "Rinse for hardware parts."], 86, "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80"),
    ("Plastic Spray Bottle", "Plastic", "Not usable", 0.82, "RECYCLE", "UPCYCLE", ["Recycle body at plastic drop-off.", "Use pump mechanism.", "Replace nozzle."], 63, "https://images.unsplash.com/photo-1585670149967-b4f4da88cc9f?w=400&q=80"),

    # Glass (10)
    ("Glass Mason Jar Set", "Glass", "Good", 0.94, "REUSE", "UPCYCLE", ["Sanitize and use for food prep.", "Convert into candle holders.", "Plant propagation station."], 90, "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80"),
    ("Glass Water Bottle", "Glass", "Damaged", 0.88, "RECYCLE", "UPCYCLE", ["Wrap chipped bottle safely and recycle.", "Smooth rim for vase art.", "Recycle infinitely at glass bank."], 72, "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80"),
    ("Green Wine Bottles", "Glass", "Good", 0.93, "UPCYCLE", "RECYCLE", ["Convert into flower vases.", "Upcycle into tiki torch.", "Deposit in glass recycling."], 89, "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80"),
    ("Glass Olive Oil Dispenser", "Glass", "Fair", 0.89, "REUSE", "UPCYCLE", ["Clean spout and refill with oil.", "Donate to community kitchen.", "Use as vinegar carafe."], 84, "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80"),
    ("Glass Flower Vase", "Glass", "Damaged", 0.86, "RECYCLE", "UPCYCLE", ["Crush chipped glass into mosaic tiles.", "Wrap safely for glass recycling.", "Use for mosaic art."], 70, "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&q=80"),
    ("Glass Spice Jar Set", "Glass", "Good", 0.92, "REUSE", "UPCYCLE", ["Refill with organic herbs & spices.", "Organize craft beads & seeds.", "Gift home blends."], 88, "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80"),
    ("Glass Baking Dish", "Glass", "Not usable", 0.83, "RECYCLE", "UPCYCLE", ["Safely recycle broken glass cullet.", "Use crushed glass for garden stones.", "Dispose per local rules."], 62, "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80"),
    ("Clear Glass Tumblers", "Glass", "Good", 0.94, "REUSE", "DONATE", ["Use for daily kitchen glassware.", "Donate to neighborhood center.", "Keep for entertaining."], 90, "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80"),
    ("Glass Coffee Carafe", "Glass", "Fair", 0.88, "REPAIR", "UPCYCLE", ["Replace rubber seal ring.", "Convert into hydroponic plant jar.", "Recycle glass body."], 82, "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&q=80"),
    ("Glass Storage Canister", "Glass", "Good", 0.93, "REUSE", "DONATE", ["Use for flour or pasta storage.", "Donate to food bank.", "Keep pantry organized."], 89, "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80"),

    # Metal (10)
    ("Aluminum Beverage Cans", "Metal", "Not usable", 0.86, "RECYCLE", "UPCYCLE", ["Rinse and deposit in aluminum recycling bin.", "Take to scrap metal dealer.", "Recycle with 95% energy saving."], 66, "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80"),
    ("Cast Iron Frying Pan", "Metal", "Damaged", 0.91, "REPAIR", "REUSE", ["Remove rust with vinegar and re-season in oven.", "Pass down cookware.", "Use for campfire cooking."], 78, "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80"),
    ("Stainless Steel Water Bottle", "Metal", "Fair", 0.90, "REUSE", "REPAIR", ["Clean interior with baking soda.", "Replace rubber gasket cap.", "Keep as travel bottle."], 84, "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80"),
    ("Steel Food Tin Cans", "Metal", "Damaged", 0.87, "RECYCLE", "UPCYCLE", ["Rinse and recycle in metal bin.", "Upcycle into pencil holders.", "Punch holes for candle lantern."], 71, "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80"),
    ("Stainless Steel Cutlery Set", "Metal", "Good", 0.95, "DONATE", "REUSE", ["Donate to community dining hall.", "Use for daily meals.", "Keep in camping kit."], 91, "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&q=80"),
    ("Hand Tool Wrench Set", "Metal", "Fair", 0.90, "REPAIR", "REUSE", ["Remove surface rust with wire brush.", "Donate to community tool library.", "Pass on to mechanic."], 83, "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=400&q=80"),
    ("Metal Cookie Tin", "Metal", "Fair", 0.89, "REUSE", "UPCYCLE", ["Use for sewing accessories.", "Repurpose as gift tin.", "Store workshop screws."], 82, "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&q=80"),
    ("Copper Pipe Fittings", "Metal", "Damaged", 0.88, "RECYCLE", "UPCYCLE", ["Take to scrap metal yard for copper value.", "Upcycle into pipe clothing rack.", "Use for plumbing scrap."], 73, "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=400&q=80"),
    ("Aluminum Baking Pan", "Metal", "Damaged", 0.86, "RECYCLE", "UPCYCLE", ["Recycle aluminum pan at scrap yard.", "Use as drip tray under planter pots.", "Donate to baking drive."], 70, "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80"),
    ("Brass Candle Holders", "Metal", "Good", 0.94, "DONATE", "REUSE", ["Polish brass finish and display on table.", "Donate to antique shop.", "Pass down to family."], 90, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80"),

    # Furniture (8)
    ("Wooden Dining Chair", "Furniture", "Damaged", 0.89, "REPAIR", "UPCYCLE", ["Re-glue loose leg joints and sand surface scuffs.", "Re-upholster seat cushion.", "Repaint accent color."], 76, "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80"),
    ("Solid Oak Office Desk", "Furniture", "Fair", 0.92, "REPAIR", "REUSE", ["Refinish top wood surface with teak oil.", "Donate to student worker.", "Rearrange workstation."], 85, "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80"),
    ("Fabric Upholstered Sofa", "Furniture", "Damaged", 0.88, "REPAIR", "UPCYCLE", ["Steam clean fabric and repair seat cushion foam.", "Donate to shelter.", "Resell on reuse board."], 75, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"),
    ("3-Tier Bookcase Shelving", "Furniture", "Fair", 0.90, "REPAIR", "REUSE", ["Tighten back panel screws.", "Donate to local library.", "Paint accent color."], 83, "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80"),
    ("Wooden Nightstand Drawers", "Furniture", "Fair", 0.89, "REPAIR", "REUSE", ["Swap drawer slides and knobs.", "Use bedside for lamp storage.", "Donate to thrift store."], 82, "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=400&q=80"),
    ("Pine Dining Table", "Furniture", "Damaged", 0.87, "REPAIR", "UPCYCLE", ["Sand top deep scuffs and seal wood.", "Use as outdoor patio table.", "Pass along to neighbor."], 74, "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400&q=80"),
    ("Wooden Storage Cabinet", "Furniture", "Good", 0.94, "DONATE", "REUSE", ["Donate to shelter or school office.", "Use for linen storage.", "Keep for home storage."], 91, "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80"),
    ("Queen Wooden Bed Frame", "Furniture", "Fair", 0.91, "REPAIR", "REUSE", ["Reinforce center support slats.", "Donate to family in need.", "Keep in guest bedroom."], 84, "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80"),

    # Other (2)
    ("Ceramic Indoor Planter Pot", "Other", "Damaged", 0.86, "REPAIR", "UPCYCLE", ["Glue hairline crack with ceramic epoxy.", "Use for indoor succulents.", "Donate to plant swap."], 72, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80"),
    ("Framed Wall Decor Mirror", "Other", "Fair", 0.92, "REPAIR", "REUSE", ["Tighten hanging wire hardware.", "Hang in entryway.", "Donate to charity shop."], 85, "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80")
]

def seed_100_items():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM items;")
    
    now = datetime.now()
    inserted_count = 0

    for i, item_tuple in enumerate(ITEMS_100):
        name, category, condition, confidence, p_action, a_action, ideas, score, img_url = item_tuple

        days_offset = (i * 2) % 60
        created_time = (now - timedelta(days=days_offset, hours=random.randint(1, 23))).strftime("%Y-%m-%d %H:%M:%S")
        
        cursor.execute("""
        INSERT INTO items (
            item_name, category, condition, confidence, primary_action, alternative_action,
            second_life_ideas, waste_avoided, resource_saving, environmental_benefit,
            sustainability_score, image_url, is_sample, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
        """, (
            name, category, condition, confidence, p_action, a_action,
            json.dumps(ideas), "High", "High", "High", score, img_url, created_time
        ))
        inserted_count += 1

    conn.commit()
    conn.close()
    print(f"Successfully seeded exactly {inserted_count} items with balanced conditions (Damaged, Not usable, Fair, Good, Excellent) into database.")

if __name__ == "__main__":
    seed_100_items()
