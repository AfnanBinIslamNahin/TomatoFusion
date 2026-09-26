"""
TomatoFusion Disease Information & Care Guidance Module.
Provides safe, practical agronomic information for the 4 recognized tomato leaf conditions.
"""

SAFETY_ADVICE = (
    "TomatoFusion provides AI-assisted guidance for informational and decision-support purposes. "
    "For serious disease outbreaks or before applying agricultural chemicals, consult a qualified "
    "agricultural professional and follow locally approved product-label instructions."
)

DISEASE_INFO = {
    "Early Blight": {
        "description": (
            "Early Blight is a common fungal leaf disease caused by Alternaria solani. It typically starts "
            "on the lowest, oldest foliage and is identified by dark circular spots with distinct concentric "
            "'bullseye' rings, often surrounded by yellowing leaf tissue. If unmanaged, leaves yellow and drop, "
            "exposing tomato fruit to sunscald."
        ),
        "symptoms": [
            "Dark brown to black spots with characteristic concentric rings (target pattern)",
            "Yellow halos developing around enlarging spots",
            "Yellowing and premature drying of lower foliage, progressing upward",
            "Dark, sunken stem lesions near the base of young plants",
        ],
        "management": [
            "Carefully prune and remove infected lower leaves to slow the upward spread of spores",
            "Dispose of infected leaf cuttings away from your garden or compost heap",
            "Disinfect pruning shears with 70% alcohol or diluted bleach between plants",
            "Avoid handling, pruning, or working around plants while leaves are wet",
        ],
        "prevention": [
            "Water at the base of plants using drip irrigation; keep the leaves dry",
            "Apply a clean straw or organic mulch layer around the base to stop soil splash",
            "Ensure wide plant spacing (60 to 75 cm) and stake or cage plants for good airflow",
            "Rotate tomato crops every 2 to 3 years away from solanaceous plants (potatoes, peppers, eggplants)",
        ],
        "plant_care": [
            "Maintain steady soil moisture to avoid stressing root systems",
            "Provide balanced tomato fertilizer with adequate potassium and phosphorus for leaf cell wall strength",
            "Avoid excessive quick-release nitrogen fertilizers that spur overly soft, vulnerable growth",
        ],
        "safety_advice": SAFETY_ADVICE,
    },
    "Late Blight": {
        "description": (
            "Late Blight is a destructive disease caused by Phytophthora infestans that spreads rapidly in "
            "cool, moist, or rainy conditions. It produces irregular water-soaked dark patches on leaves and stems, "
            "often with pale light-green margins. In damp weather, delicate whitish fuzz may appear on leaf undersides, "
            "and foliage can collapse quickly if left unaddressed."
        ),
        "symptoms": [
            "Large, irregular water-soaked greenish-brown to black patches on leaves",
            "Pale yellow or light-green borders surrounding the dark lesions",
            "Delicate white fuzzy sporulation on leaf undersides during cool, damp mornings",
            "Dark brown to greasy-black stem lesions leading to rapid wilting of upper branches",
        ],
        "management": [
            "Quickly prune and safely destroy severely infected leaves and stems to prevent spore drift",
            "Dispose of infected tissue in sealed bags; do not compost blighted foliage",
            "Clean and sanitize all tools, stakes, and gloves after touching affected plants",
            "Avoid moving through wet fields to prevent brushing spores onto healthy vines",
        ],
        "prevention": [
            "Space plants generously (60 to 75 cm apart) to maximize canopy drying and air circulation",
            "Water exclusively at soil level with drip hoses; never use overhead sprinklers",
            "Select certified disease-resistant tomato varieties suitable for your climate",
            "Remove and destroy volunteer tomato and potato sprouts near your growing area",
        ],
        "plant_care": [
            "Avoid excessive nitrogen fertilization, which produces dense foliage that traps moisture",
            "Ensure balanced potassium and calcium nutrition to support robust epidermal tissue",
            "Stake or cage plants upright to keep foliage elevated away from damp ground",
        ],
        "safety_advice": SAFETY_ADVICE,
    },
    "Septoria Leaf Spot": {
        "description": (
            "Septoria Leaf Spot is a fungal condition caused by Septoria lycopersici that produces numerous small, "
            "circular spots across tomato leaflets. Each spot typically has a pale gray or tan center with a dark "
            "brown border. It usually starts near the base of the plant and works upward, causing leaves to yellow "
            "and drop prematurely."
        ),
        "symptoms": [
            "Numerous small, circular spots (1 to 3 mm wide) peppered across the leaf surface",
            "Spots have tan or grayish centers with distinct dark brown margins",
            "Yellowing of surrounding leaf tissue as spot density increases",
            "Lower canopy leaf loss, leaving stems bare and developing fruit exposed",
        ],
        "management": [
            "Pinch off and discard spotted lower leaves as soon as initial lesions are spotted",
            "Clear away fallen leaves from the soil surface to reduce fungal spore reservoirs",
            "Disinfect garden tools and pruning clippers between plants",
            "Allow plants to dry completely before pruning or harvesting",
        ],
        "prevention": [
            "Apply a clean mulch layer (straw, paper, or clean compost) beneath plants to prevent spore splash",
            "Water solely at the soil line using soaker or drip hoses",
            "Prune bottom foliage up to 25–30 cm above the ground once plants are established",
            "Clear out and compost or destroy all tomato plant debris immediately after harvest",
        ],
        "plant_care": [
            "Ensure regular, even watering so plants do not alternate between drought and saturation",
            "Feed with balanced organic compost or tomato fertilizer to sustain steady growth",
            "Provide full sun (6 to 8 hours daily) for optimal plant vigor and fast leaf drying",
        ],
        "safety_advice": SAFETY_ADVICE,
    },
    "Healthy": {
        "description": (
            "The leaf exhibits healthy physiological characteristics with uniform green coloration, intact veins, "
            "clean leaf margins, and no visible signs of fungal spotting, water-soaked necrosis, or viral mottling. "
            "The foliage is functioning with optimal photosynthetic efficiency."
        ),
        "symptoms": [
            "Deep, consistent green color across both upper and lower leaf surfaces",
            "Firm, upright leaf posture with intact venation and leaf margins",
            "Absence of dark spots, concentric bullseye rings, or water-soaked patches",
            "Clean leaf undersides without fuzzy molds or powdery residues",
        ],
        "management": [
            "No disease management intervention required",
            "Continue standard watering, trellising, and weeding routines",
            "Routinely inspect plants once or twice weekly to detect any future issues early",
        ],
        "prevention": [
            "Maintain consistent soil moisture using drip irrigation",
            "Ensure good airflow between plants through proper spacing and staking",
            "Keep garden tools clean and garden beds free of weeds that harbor pests",
            "Follow crop rotation practices between growing seasons",
        ],
        "plant_care": [
            "Apply a balanced organic fertilizer or compost to support steady blossom and fruit set",
            "Mulch around plant bases to conserve soil moisture and suppress weeds",
            "Ensure plants receive 6 to 8 hours of direct daily sunlight",
        ],
        "safety_advice": SAFETY_ADVICE,
    },
}


def get_disease_info(condition_name: str) -> dict:
    """
    Returns disease metadata, description, symptoms, management,
    prevention, plant care, and safety advice for a given condition.
    """
    return DISEASE_INFO.get(
        condition_name,
        {
            "description": f"Diagnosis result: {condition_name}.",
            "symptoms": [],
            "management": ["Consult a local agricultural extension specialist for specific diagnosis."],
            "prevention": ["Maintain good garden hygiene and ensure proper air circulation."],
            "plant_care": ["Provide balanced watering and soil nutrition."],
            "safety_advice": SAFETY_ADVICE,
        },
    )
