/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DiseaseClass =
  | 'Early Blight'
  | 'Late Blight'
  | 'Septoria Leaf Spot'
  | 'Healthy';

export interface ClassProbabilities {
  'Early Blight': number;
  'Healthy': number;
  'Late Blight': number;
  'Septoria Leaf Spot': number;
  [key: string]: number;
}

export interface DiagnosisResponse {
  prediction: DiseaseClass | string;
  confidence: number;
  probabilities: ClassProbabilities;
  gradcam_url: string;
  description: string;
  symptoms?: string[];
  management?: string[];
  treatment?: string[]; // fallback compatibility
  prevention: string[];
  plant_care?: string[];
  fertilizer?: string[]; // fallback compatibility
  safety_advice: string;
}

export interface DiseaseDetail {
  id: string;
  name: DiseaseClass;
  tagline: string;
  shortDescription: string;
  commonSymptoms: string[];
  howItAffectsPlant: string;
  preventionTips: string[];
  bannerColor: string;
  badgeColor: string;
  image?: string;
}
