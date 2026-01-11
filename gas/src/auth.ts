import { getScriptProperty } from './util'
import { ErrorCode } from './types'

/**
 * Validate API token
 * @throws Error if token is invalid
 */
export function validateToken(token: string): void {
  const validToken = getScriptProperty('API_TOKEN')

  if (token !== validToken) {
    throw new Error(ErrorCode.INVALID_TOKEN)
  }
}

/**
 * Check if token is required for endpoint
 */
export function isTokenRequired(endpoint: string): boolean {
  // GET /availability is public (no token required)
  // POST /reserve requires token
  return endpoint === '/reserve'
}
