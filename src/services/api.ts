/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiagnosisResponse } from '../types/diagnosis';
import { toPercentage } from '../utils/format';

export const API_BASE_URL = (
  (import.meta.env.VITE_API_BASE_URL as string) || ''
).replace(/\/+$/, '');

export class ApiConnectionError extends Error {
  constructor(message = 'Diagnosis service is temporarily unavailable. Please try again later.') {
    super(message);
    this.name = 'ApiConnectionError';
  }
}

/**
 * Sends tomato leaf image to the TomatoFusion Python backend API.
 * Endpoint: POST {VITE_API_BASE_URL}/api/predict
 * Content-Type: multipart/form-data
 * Field: file
 */
export async function predictLeaf(file: File): Promise<DiagnosisResponse> {
  const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/predict` : '/api/predict';

  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new ApiConnectionError('Diagnosis service is temporarily unavailable. Please try again later.');
    }

    const data = await response.json();
    return validateAndNormalizeResponse(data);
  } catch (err: unknown) {
    if (err instanceof ApiConnectionError) {
      throw err;
    }
    throw new ApiConnectionError('Diagnosis service is temporarily unavailable. Please try again later.');
  }
}

function validateAndNormalizeResponse(data: unknown): DiagnosisResponse {
  if (!data || typeof data !== 'object') {
    throw new ApiConnectionError('Diagnosis service is temporarily unavailable. Please try again later.');
  }

  const d = data as Partial<DiagnosisResponse>;
  if (!d.prediction) {
    throw new ApiConnectionError('Diagnosis service is temporarily unavailable. Please try again later.');
  }

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
    confidence: toPercentage(d.confidence),
    probabilities: {
      'Early Blight': toPercentage(d.probabilities?.['Early Blight']),
      'Healthy': toPercentage(d.probabilities?.['Healthy']),
      'Late Blight': toPercentage(d.probabilities?.['Late Blight']),
      'Septoria Leaf Spot': toPercentage(d.probabilities?.['Septoria Leaf Spot']),
      ...(d.probabilities
        ? Object.fromEntries(
            Object.entries(d.probabilities).map(([k, v]) => [k, toPercentage(v)])
          )
        : {}),
    },
    gradcam_url: typeof d.gradcam_url === 'string' ? d.gradcam_url : '',
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
