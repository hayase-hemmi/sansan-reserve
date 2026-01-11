import {
  createJsonResponse,
  createErrorResponse,
  parseRequestBody,
  logError,
  parseISOString,
} from './util'
import { validateToken } from './auth'
import { generateTimeSlots, createReservationEvent } from './calendar'
import {
  AvailabilityRequest,
  AvailabilityResponse,
  ReserveRequest,
  ReserveResponse,
  ErrorCode,
  MENU_CONFIG,
} from './types'

/**
 * Handle GET requests
 */
function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput {
  try {
    const path = e.parameter.path || '/'

    if (path === '/availability') {
      return handleAvailability(e)
    }

    return createErrorResponse(
      ErrorCode.INVALID_REQUEST,
      'Invalid endpoint',
      404
    )
  } catch (error) {
    logError('doGet', error)
    return createErrorResponse(
      ErrorCode.CALENDAR_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}

/**
 * Handle POST requests
 */
function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  try {
    const path = e.parameter.path || '/'

    if (path === '/reserve') {
      return handleReserve(e)
    }

    return createErrorResponse(
      ErrorCode.INVALID_REQUEST,
      'Invalid endpoint',
      404
    )
  } catch (error) {
    logError('doPost', error)

    // Handle specific error codes
    if (error instanceof Error) {
      if (error.message === ErrorCode.INVALID_TOKEN) {
        return createErrorResponse(ErrorCode.INVALID_TOKEN, 'Invalid API token', 401)
      }
      if (error.message === ErrorCode.SLOT_TAKEN) {
        return createErrorResponse(
          ErrorCode.SLOT_TAKEN,
          'This time slot is no longer available',
          409
        )
      }
    }

    return createErrorResponse(
      ErrorCode.CALENDAR_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}

/**
 * Handle GET /availability
 */
function handleAvailability(
  e: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  const params = e.parameter as any as AvailabilityRequest

  // Validate required parameters
  if (!params.from || !params.to || !params.durationMin) {
    return createErrorResponse(
      ErrorCode.INVALID_REQUEST,
      'Missing required parameters: from, to, durationMin'
    )
  }

  const from = parseISOString(params.from)
  const to = parseISOString(params.to)
  const durationMin = parseInt(params.durationMin.toString(), 10)

  if (isNaN(durationMin)) {
    return createErrorResponse(
      ErrorCode.INVALID_REQUEST,
      'Invalid durationMin value'
    )
  }

  // Generate time slots
  const slots = generateTimeSlots(from, to, durationMin)

  const response: AvailabilityResponse = {
    slots,
  }

  return createJsonResponse(response)
}

/**
 * Handle POST /reserve
 */
function handleReserve(
  e: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
  const body = parseRequestBody(e) as ReserveRequest

  // Validate required fields
  if (
    !body.token ||
    !body.lastName ||
    !body.firstName ||
    !body.email ||
    !body.menu ||
    !body.start
  ) {
    return createErrorResponse(
      ErrorCode.INVALID_REQUEST,
      'Missing required fields'
    )
  }

  // Validate token
  try {
    validateToken(body.token)
  } catch (error) {
    return createErrorResponse(
      ErrorCode.INVALID_TOKEN,
      'Invalid API token',
      401
    )
  }

  // Validate menu
  if (!MENU_CONFIG[body.menu]) {
    return createErrorResponse(
      ErrorCode.INVALID_REQUEST,
      'Invalid menu type'
    )
  }

  // Parse start time
  const start = parseISOString(body.start)

  // Create reservation
  try {
    const eventId = createReservationEvent(
      body.lastName,
      body.firstName,
      body.email,
      body.menu,
      start
    )

    const response: ReserveResponse = {
      ok: true,
      eventId,
    }

    return createJsonResponse(response)
  } catch (error) {
    if (error instanceof Error && error.message === 'SLOT_TAKEN') {
      return createErrorResponse(
        ErrorCode.SLOT_TAKEN,
        'This time slot is no longer available',
        409
      )
    }
    throw error
  }
}

// Export functions for GAS
// @ts-ignore
globalThis.doGet = doGet
// @ts-ignore
globalThis.doPost = doPost
