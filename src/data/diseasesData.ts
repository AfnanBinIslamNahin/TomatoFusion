/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiseaseDetail } from '../types/diagnosis';

export const DISEASES_DATA: DiseaseDetail[] = [
  {
    id: 'early-blight',
    name: 'Early Blight',
    tagline: 'Dark target-like spots with concentric rings on older lower leaves.',
    shortDescription:
      'Early Blight is a common fungal leaf disease that usually begins on the lowest and oldest leaves of the tomato plant. It is recognizable by brown or black spots with distinct concentric rings, often surrounded by yellowing leaf tissue.',
    commonSymptoms: [
      'Brown or black circular spots with concentric "bullseye" rings',
      'Yellow rings or halos forming around spots as they enlarge',
      'Leaves turning yellow, drying up, and dropping off starting from the bottom',
      'Dark sunken areas on stems near the soil level on young plants',
    ],
    howItAffectsPlant:
      'As lower leaves turn yellow and drop off, the plant loses photosynthetic surface. Exposed fruit can suffer from sunscald, and overall yield may decline.',
    preventionTips: [
      'Water at the base of the plant using drip irrigation; keep the leaves dry',
      'Add mulch around the base of the plants to prevent soil spores from splashing up',
      'Remove and discard infected lower leaves as soon as spots appear',
      'Allow good airflow by spacing plants 60 to 75 cm apart and using stakes or cages',
      'Rotate tomatoes and related plants (potatoes, peppers, eggplants) every 2–3 years',
    ],
    bannerColor: 'from-amber-600/10 to-emerald-600/10',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: '/disease-images/early-blight.jpg',
  },
  {
    id: 'late-blight',
    name: 'Late Blight',
    tagline: 'Fast-spreading water-soaked dark patches that can quickly wilt foliage.',
    shortDescription:
      'Late Blight is a destructive disease that spreads quickly during cool, wet, or humid periods. It produces dark, water-soaked patches on leaves and stems, often with light borders, and can cause rapid foliage wilting.',
    commonSymptoms: [
      'Large, irregular water-soaked dark-green to brown spots on leaves',
      'A pale light-green or yellow border surrounding the dark lesions',
      'Delicate white fuzzy growth on the underside of leaves during damp mornings',
      'Dark brown to black greasy-looking patches on stems and branches',
    ],
    howItAffectsPlant:
      'Late Blight spreads rapidly across foliage, causing whole leaves and stems to collapse. If unmanaged during wet weather, it can cause severe canopy loss and damage green fruit.',
    preventionTips: [
      'Choose disease-resistant tomato varieties whenever available',
      'Avoid overhead sprinklers; water only early in the morning so foliage dries quickly',
      'Provide ample space between plants to encourage wind circulation',
      'Promptly remove and safely discard infected foliage away from your garden area',
      'Do not work in the tomato patch or prune stems while leaves are damp with dew or rain',
    ],
    bannerColor: 'from-rose-600/10 to-amber-600/10',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    image: '/disease-images/late-blight.jpg',
  },
  {
    id: 'septoria-leaf-spot',
    name: 'Septoria Leaf Spot',
    tagline: 'Numerous small circular spots with grayish centers and dark borders.',
    shortDescription:
      'Septoria Leaf Spot is a fungal condition that covers tomato leaflets with dozens of small, circular spots. Each spot has a pale gray or tan center and a dark-brown border. It typically starts on the lower canopy and works its way up.',
    commonSymptoms: [
      'Many tiny round spots (1 to 3 mm wide) scattered across leaflets',
      'Spots have pale tan or gray centers with distinct dark brown margins',
      'Leaves turn yellow around clusters of spots and dry up prematurely',
      'Loss of leaves starting from the bottom of the plant upwards',
    ],
    howItAffectsPlant:
      'Although individual spots remain small, having many spots causes leaves to yellow and drop prematurely. This defoliation weakens the plant and leaves growing tomatoes exposed to harsh sunlight.',
    preventionTips: [
      'Apply clean straw, wood shavings, or organic mulch to cover bare soil beneath plants',
      'Water plants at soil level to prevent water from splashing spores onto lower foliage',
      'Prune the lowest leaves up to 25–30 cm off the ground once the plant is established',
      'Disinfect garden shears and stakes between seasons',
      'Clean up and clear away all crop debris thoroughly at the end of the harvest season',
    ],
    bannerColor: 'from-indigo-600/10 to-emerald-600/10',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    image: '/disease-images/septoria-leaf-spot.jpg',
  },
  {
    id: 'healthy',
    name: 'Healthy',
    tagline: 'Vibrant, uniform green leaves with crisp margins and clean veins.',
    shortDescription:
      'A healthy tomato leaf has a rich, uniform green color, smooth or slightly serrated leaf edges, clean veins, and no dark spots, water-soaked patches, or yellow halos.',
    commonSymptoms: [
      'Deep, consistent green color across the whole leaf blade',
      'Firm, upright leaf posture and strong stem attachment',
      'No dark spots, concentric bullseye rings, or water-soaked patches',
      'Clean leaf undersides without white fuzzy mold or powdery residue',
    ],
    howItAffectsPlant:
      'Healthy leaves maximize sunlight capture and photosynthesis, supporting robust stem development, flower pollination, and high tomato fruit yield.',
    preventionTips: [
      'Keep watering regular and consistent to avoid dry/wet stress',
      'Provide 6 to 8 hours of full sunlight daily for optimal vigor',
      'Use balanced organic compost or tomato fertilizer according to soil needs',
      'Inspect leaves regularly once or twice a week to spot any issues early',
    ],
    bannerColor: 'from-emerald-600/15 to-teal-600/10',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    image: '/disease-images/healthy.jpg',
  },
];
