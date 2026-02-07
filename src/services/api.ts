// Menu type and duration are defined in the shared config (single source of truth)
import { type Menu, getMenuDuration } from '../shared/menuConfig'
export { type Menu, getMenuDuration }

export interface TimeSlot {
  start: string // ISO string
  end: string // ISO string
  available: boolean
}

export interface AvailabilityResponse {
  slots: TimeSlot[]
}

export interface ReserveRequest {
  token: string
  lastName: string
  firstName: string
  email: string
  phone: string
  menu: Menu
  start: string // ISO string
}

export interface ReserveResponse {
  ok: boolean
  eventId?: string
  errorCode?: string
  message?: string
}

// API configuration
const GAS_ENDPOINT = import.meta.env.VITE_GAS_ENDPOINT
const API_TOKEN = import.meta.env.VITE_API_TOKEN

if (!GAS_ENDPOINT) {
  throw new Error('VITE_GAS_ENDPOINT is not set. Please configure environment variables.')
}

if (!API_TOKEN) {
  throw new Error('VITE_API_TOKEN is not set. Please configure environment variables.')
}

/**
 * Get availability slots
 */
export async function getAvailability(
  from: string,
  to: string,
  durationMin: number
): Promise<AvailabilityResponse> {
  const url = new URL(GAS_ENDPOINT)
  url.searchParams.set('path', '/availability')
  url.searchParams.set('from', from)
  url.searchParams.set('to', to)
  url.searchParams.set('durationMin', durationMin.toString())

  const response = await fetch(url.toString(), {
    method: 'GET',
    // GETリクエストではContent-Typeヘッダーは不要
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch availability: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Create a reservation
 */
export async function createReservation(
  request: Omit<ReserveRequest, 'token'>
): Promise<ReserveResponse> {
  const url = new URL(GAS_ENDPOINT)
  url.searchParams.set('path', '/reserve')

  const body: ReserveRequest = {
    ...request,
    token: API_TOKEN || '',
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      // text/plainを使用してプリフライトリクエストを回避
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    // Return error response with error code
    return data as ReserveResponse
  }

  return data
}

/**
 * Format date to JST ISO string
 */
export function toJSTISOString(date: Date): string {
  // Ensure we're working with JST
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`
}

/**
 * Parse ISO string to Date
 */
export function parseISOString(isoString: string): Date {
  return new Date(isoString)
}
