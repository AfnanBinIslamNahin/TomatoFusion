/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiagnosisResponse } from '../types/diagnosis';

const STORAGE_KEY_API_URL = 'tomatofusion_api_base_url';

export const DEFAULT_API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY_API_URL);
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/+$/, '');
    }
  }
  return DEFAULT_API_BASE_URL.replace(/\/+$/, '');
}

export function setApiBaseUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (!url.trim()) {
      localStorage.removeItem(STORAGE_KEY_API_URL);
    } else {
      localStorage.setItem(STORAGE_KEY_API_URL, url.trim().replace(/\/+$/, ''));
    }
  }
}

export class ApiConnectionError extends Error {
  isConnectionError: boolean;
  statusCode?: number;

  constructor(message: string, isConnectionError = true, statusCode?: number) {
    super(message);
    this.name = 'ApiConnectionError';
    this.isConnectionError = isConnectionError;
    this.statusCode = statusCode;
  }
}

/**
 * Sends tomato leaf image to the TomatoFusion Python backend API.
 * Endpoint: POST {baseUrl}/api/predict
 * Content-Type: multipart/form-data
 * Field: file
 */
export async function predictLeaf(file: File): Promise<DiagnosisResponse> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/predict`;

  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 502 || response.status === 503) {
        throw new ApiConnectionError('Diagnosis service is not connected yet.', true, response.status);
      }
      const errorText = await response.text().catch(() => '');
      throw new ApiConnectionError(
        `Backend service error (${response.status}): ${errorText || response.statusText}`,
        false,
        response.status
      );
    }

    const data = await response.json();
    return validateAndNormalizeResponse(data);
  } catch (err: unknown) {
    if (err instanceof ApiConnectionError) {
      throw err;
    }
    // Network / offline / server unreached
    throw new ApiConnectionError('Diagnosis service is not connected yet.', true);
  }
}

/**
 * Checks connectivity to the backend health endpoint
 */
export async function checkApiHealth(): Promise<{ online: boolean; message: string }> {
  const baseUrl = getApiBaseUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      signal: controller.signal,
    }).catch(() =>
      fetch(`${baseUrl}/api/health`, {
        method: 'GET',
        signal: controller.signal,
      })
    );

    clearTimeout(timeoutId);

    if (res && res.ok) {
      return { online: true, message: `Connected to ${baseUrl}` };
    }
    return {
      online: false,
      message: `Diagnosis service is not connected yet at ${baseUrl}.`,
    };
  } catch {
    return {
      online: false,
      message: `Diagnosis service is not connected yet at ${baseUrl}.`,
    };
  }
}

function validateAndNormalizeResponse(data: unknown): DiagnosisResponse {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response received from the diagnosis service.');
  }

  const d = data as Partial<DiagnosisResponse>;
  if (!d.prediction) {
    throw new Error('Response is missing a prediction result.');
  }

  // Support both management / treatment and plant_care / fertilizer keys
  const managementList = Array.isArray(d.management)
    ? d.management
    : Array.isArray(d.treatment)
    ? d.treatment
    : [];

  const plantCareList = Array.isArray(d.plant_care)
    ? d.plant_care
    : Array.isArray(d.fertilizer)
    ? d.fertilizer
    : [];

  const symptomsList = Array.isArray(d.symptoms) ? d.symptoms : [];
  const preventionList = Array.isArray(d.prevention) ? d.prevention : [];

  return {
    prediction: d.prediction,
    confidence: typeof d.confidence === 'number' ? Number(d.confidence.toFixed(2)) : 0,
    probabilities: {
      'Early Blight': d.probabilities?.['Early Blight'] ?? 0,
      'Healthy': d.probabilities?.['Healthy'] ?? 0,
      'Late Blight': d.probabilities?.['Late Blight'] ?? 0,
      'Septoria Leaf Spot': d.probabilities?.['Septoria Leaf Spot'] ?? 0,
      ...(d.probabilities || {}),
    },
    gradcam_url: d.gradcam_url || '',
    description: d.description || 'Diagnosis details received from the system.',
    symptoms: symptomsList,
    management: managementList,
    treatment: managementList,
    prevention: preventionList,
    plant_care: plantCareList,
    fertilizer: plantCareList,
    safety_advice:
      d.safety_advice ||
      'TomatoFusion provides AI-assisted guidance for informational and decision-support purposes. For serious disease outbreaks or before applying agricultural chemicals, consult a qualified agricultural professional and follow locally approved product-label instructions.',
  };
}

/**
 * Clean reference schema payload strictly for developer UI preview and testing.
 * Practical, farmer-friendly wording without academic jargon.
 */
export const SAMPLE_API_SCHEMA_PAYLOAD: DiagnosisResponse = {
  prediction: 'Late Blight',
  confidence: 94.27,
  probabilities: {
    'Early Blight': 2.14,
    'Healthy': 0.83,
    'Late Blight': 94.27,
    'Septoria Leaf Spot': 2.76,
  },
  gradcam_url: '',
  description:
    'Late blight is a fast-spreading leaf condition that creates dark, water-soaked patches on tomato leaves and stems. It thrives in cool, humid, or rainy weather and can quickly damage leaves and reduce plant health if not addressed promptly.',
  symptoms: [
    'Large, irregular dark-brown to olive-green patches that look water-soaked',
    'Pale yellow or light-green borders surrounding the dark spots',
    'Thin whitish fuzzy growth on the underside of leaves in damp mornings',
    'Stems turning dark brown or black, leading to rapid wilting',
  ],
  management: [
    'Carefully prune and remove infected lower leaves to slow the spread',
    'Dispose of removed leaves away from the garden or compost pile',
    'Clean and wipe pruning shears with rubbing alcohol between plants',
    'Avoid handling or pruning tomato plants while leaves are wet',
  ],
  treatment: [
    'Carefully prune and remove infected lower leaves to slow the spread',
    'Dispose of removed leaves away from the garden or compost pile',
    'Clean and wipe pruning shears with rubbing alcohol between plants',
    'Avoid handling or pruning tomato plants while leaves are wet',
  ],
  prevention: [
    'Space plants well (60–75 cm apart) so air can circulate freely through the leaves',
    'Water only at the base of the plant using drip or soaker hoses to keep leaves dry',
    'Apply clean straw or mulch around the base to stop soil from splashing onto leaves',
    'Rotate tomatoes to a different garden spot every 2 to 3 years',
  ],
  plant_care: [
    'Avoid applying high-nitrogen fertilizers that create overly dense, tender foliage',
    'Ensure balanced potassium and phosphorus to support natural leaf strength',
    'Ensure steady soil moisture rather than letting plants alternate between dry and soaked',
  ],
  fertilizer: [
    'Avoid applying high-nitrogen fertilizers that create overly dense, tender foliage',
    'Ensure balanced potassium and phosphorus to support natural leaf strength',
    'Ensure steady soil moisture rather than letting plants alternate between dry and soaked',
  ],
  safety_advice:
    'TomatoFusion provides AI-assisted guidance for informational and decision-support purposes. For serious disease outbreaks or before applying agricultural chemicals, consult a qualified agricultural professional and follow locally approved product-label instructions.',
};
