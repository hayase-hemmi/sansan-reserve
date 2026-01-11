import { ErrorCode } from './types'

/**
 * Create JSON response for GAS Web App
 */
export function createJsonResponse(data: any, _statusCode: number = 200): GoogleAppsScript.Content.TextOutput {
  const output = ContentService.createTextOutput(JSON.stringify(data))
  output.setMimeType(ContentService.MimeType.JSON)

  // Add CORS headers
  // Note: statusCode parameter is kept for future use but not currently utilized by GAS
  return output
}

/**
 * Create error response
 */
export function createErrorResponse(
  errorCode: ErrorCode | string,
  message: string,
  statusCode: number = 400
): GoogleAppsScript.Content.TextOutput {
  return createJsonResponse({
    ok: false,
    errorCode,
    message,
  }, statusCode)
}

/**
 * Parse request body as JSON
 */
export function parseRequestBody(e: GoogleAppsScript.Events.DoPost): any {
  try {
    return JSON.parse(e.postData.contents)
  } catch (error) {
    throw new Error('Invalid JSON in request body')
  }
}

/**
 * Get script property (for secrets)
 */
export function getScriptProperty(key: string): string {
  const value = PropertiesService.getScriptProperties().getProperty(key)
  if (!value) {
    throw new Error(`Script property '${key}' is not set`)
  }
  return value
}

/**
 * Log error for debugging
 */
export function logError(context: string, error: any): void {
  console.error(`[${context}]`, error)
  if (error instanceof Error) {
    console.error('Stack:', error.stack)
  }
}

/**
 * Format date to JST ISO string
 */
export function toJSTISOString(date: Date): string {
  // Google Apps Script runs in UTC, but we want JST
  const jstOffset = 9 * 60 // JST is UTC+9
  const jstDate = new Date(date.getTime() + jstOffset * 60 * 1000)
  return jstDate.toISOString().replace('Z', '+09:00')
}

/**
 * Parse ISO string to Date (handles JST offset)
 */
export function parseISOString(isoString: string): Date {
  return new Date(isoString)
}
