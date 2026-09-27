/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Safely converts confidence and probability values into a formatted percentage (0 - 100).
 * Handles numbers in 0.0 - 1.0 range (e.g., 0.9427 -> 94.27) as well as already scaled numbers.
 */
export function toPercentage(value: unknown): number {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  const percentage =
    numericValue >= 0 && numericValue <= 1
      ? numericValue * 100
      : numericValue;

  return Number(
    Math.min(100, Math.max(0, percentage)).toFixed(2)
  );
}
