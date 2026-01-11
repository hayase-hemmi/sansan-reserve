// Menu types
export type Menu = 'standard' | 'premium' | 'family' | 'wedding'

export interface MenuConfig {
  duration: number // minutes
  displayName: string
}

export const MENU_CONFIG: Record<Menu, MenuConfig> = {
  standard: { duration: 30, displayName: 'スタンダードプラン' },
  premium: { duration: 60, displayName: 'プレミアムプラン' },
  family: { duration: 90, displayName: 'ファミリープラン' },
  wedding: { duration: 120, displayName: 'ウェディングプラン' },
}

// Business hours configuration
export interface BusinessHours {
  start: number // hour (0-23)
  end: number // hour (0-23)
  slotInterval: number // minutes
}

export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  start: 9,
  end: 18,
  slotInterval: 30,
}

// API Request/Response types
export interface AvailabilityRequest {
  from: string // ISO string
  to: string // ISO string
  durationMin: number
}

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
  menu: Menu
  start: string // ISO string
}

export interface ReserveResponse {
  ok: boolean
  eventId?: string
  errorCode?: string
  message?: string
}

// Error codes
export enum ErrorCode {
  INVALID_TOKEN = 'INVALID_TOKEN',
  SLOT_TAKEN = 'SLOT_TAKEN',
  INVALID_SLOT = 'INVALID_SLOT',
  CALENDAR_ERROR = 'CALENDAR_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
}
