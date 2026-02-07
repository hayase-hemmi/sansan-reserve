// ============================================================================
// Types
// ============================================================================

type Menu = 'standard' | 'premium' | 'family' | 'wedding'

interface MenuConfig {
  duration: number
  displayName: string
}

// IMPORTANT: これらの値は src/shared/menuConfig.ts と一致させること（テストで自動検証）
const MENU_CONFIG: Record<Menu, MenuConfig> = {
  standard: { duration: 30, displayName: '15分撮影プラン' },
  premium: { duration: 60, displayName: '30分撮影プラン' },
  family: { duration: 120, displayName: '七五三 3歳女の子プラン' },
  wedding: { duration: 120, displayName: '七五三 5歳男の子プラン' },
}

interface BusinessHours {
  start: number
  end: number
  slotInterval: number
}

const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  start: 9,
  end: 18,
  slotInterval: 30,
}

interface TimeSlot {
  start: string
  end: string
  available: boolean
}

interface AvailabilityRequest {
  from: string
  to: string
  durationMin: number
}

interface AvailabilityResponse {
  slots: TimeSlot[]
}

interface ReserveRequest {
  token: string
  lastName: string
  firstName: string
  email: string
  phone: string
  guestCount: number
  hasPet: boolean
  menu: Menu
  start: string
}

interface ReserveResponse {
  ok: boolean
  eventId?: string
  errorCode?: string
  message?: string
}

enum ErrorCode {
  INVALID_TOKEN = 'INVALID_TOKEN',
  SLOT_TAKEN = 'SLOT_TAKEN',
  INVALID_SLOT = 'INVALID_SLOT',
  CALENDAR_ERROR = 'CALENDAR_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
}

// ============================================================================
// Utility Functions
// ============================================================================

function createJsonResponse(data: any, _statusCode: number = 200): GoogleAppsScript.Content.TextOutput {
  const output = ContentService.createTextOutput(JSON.stringify(data))
  output.setMimeType(ContentService.MimeType.JSON)
  return output
}

function createErrorResponse(
  errorCode: ErrorCode | string,
  message: string,
  _statusCode: number = 400
): GoogleAppsScript.Content.TextOutput {
  return createJsonResponse({
    ok: false,
    errorCode,
    message,
  }, _statusCode)
}

function parseRequestBody(e: GoogleAppsScript.Events.DoPost): any {
  try {
    return JSON.parse(e.postData.contents)
  } catch (error) {
    throw new Error('Invalid JSON in request body')
  }
}

function getScriptProperty(key: string): string {
  const value = PropertiesService.getScriptProperties().getProperty(key)
  if (!value) {
    throw new Error(`Script property '${key}' is not set`)
  }
  return value
}

function logError(context: string, error: any): void {
  console.error(`[${context}]`, error)
  if (error instanceof Error) {
    console.error('Stack:', error.stack)
  }
}

function toJSTISOString(date: Date): string {
  const jstOffset = 9 * 60
  const jstDate = new Date(date.getTime() + jstOffset * 60 * 1000)
  return jstDate.toISOString().replace('Z', '+09:00')
}

function parseISOString(isoString: string): Date {
  return new Date(isoString)
}

// ============================================================================
// Authentication
// ============================================================================

function validateToken(token: string): void {
  const validToken = getScriptProperty('API_TOKEN')
  if (token !== validToken) {
    throw new Error(ErrorCode.INVALID_TOKEN)
  }
}

// ============================================================================
// Calendar Operations
// ============================================================================

function getCalendar(): GoogleAppsScript.Calendar.Calendar {
  const calendarId = getScriptProperty('CALENDAR_ID')
  const calendar = CalendarApp.getCalendarById(calendarId)
  if (!calendar) {
    throw new Error('Calendar not found')
  }
  return calendar
}

function getBusyPeriods(from: Date, to: Date): Array<{ start: Date; end: Date }> {
  const calendar = getCalendar()
  const events = calendar.getEvents(from, to)
  return events.map((event) => ({
    start: new Date(event.getStartTime().getTime()),
    end: new Date(event.getEndTime().getTime()),
  }))
}

function generateTimeSlots(from: Date, to: Date, durationMin: number): TimeSlot[] {
  const slots: TimeSlot[] = []
  const busyPeriods = getBusyPeriods(from, to)
  const currentDate = new Date(from)
  const endDate = new Date(to)

  while (currentDate < endDate) {
    const daySlots = generateDaySlots(currentDate, durationMin, busyPeriods)
    slots.push(...daySlots)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return slots
}

function generateDaySlots(
  date: Date,
  durationMin: number,
  busyPeriods: Array<{ start: Date; end: Date }>
): TimeSlot[] {
  const slots: TimeSlot[] = []
  const { start: startHour, end: endHour, slotInterval } = DEFAULT_BUSINESS_HOURS

  let currentTime = new Date(date)
  currentTime.setHours(startHour, 0, 0, 0)

  const dayEnd = new Date(date)
  dayEnd.setHours(endHour, 0, 0, 0)

  while (currentTime < dayEnd) {
    const slotEnd = new Date(currentTime.getTime() + durationMin * 60 * 1000)

    if (slotEnd <= dayEnd) {
      const available = !isSlotBusy(currentTime, slotEnd, busyPeriods)

      slots.push({
        start: toJSTISOString(currentTime),
        end: toJSTISOString(slotEnd),
        available,
      })
    }

    currentTime = new Date(currentTime.getTime() + slotInterval * 60 * 1000)
  }

  return slots
}

function isSlotBusy(
  slotStart: Date,
  slotEnd: Date,
  busyPeriods: Array<{ start: Date; end: Date }>
): boolean {
  return busyPeriods.some((busy) => {
    return slotStart < busy.end && slotEnd > busy.start
  })
}

function isSlotAvailable(start: Date, durationMin: number): boolean {
  const end = new Date(start.getTime() + durationMin * 60 * 1000)
  const busyPeriods = getBusyPeriods(start, end)
  return !isSlotBusy(start, end, busyPeriods)
}

function createReservationEvent(
  lastName: string,
  firstName: string,
  email: string,
  phone: string,
  guestCount: number,
  hasPet: boolean,
  menu: Menu,
  start: Date
): string {
  const calendar = getCalendar()
  const menuConfig = MENU_CONFIG[menu]
  const end = new Date(start.getTime() + menuConfig.duration * 60 * 1000)

  if (!isSlotAvailable(start, menuConfig.duration)) {
    throw new Error('SLOT_TAKEN')
  }

  const title = `Sansan Reserve: ${menuConfig.displayName} ${lastName}${firstName}`
  const description = `
予約情報:
- お名前: ${lastName} ${firstName}
- メール: ${email}
- 電話番号: ${phone}
- ご来店人数: ${guestCount}人
- ペット同伴: ${hasPet ? 'あり' : 'なし'}
- メニュー: ${menuConfig.displayName}
- 時間: ${menuConfig.duration}分
- 予約日時: ${new Date().toISOString()}
  `.trim()

  const event = calendar.createEvent(title, start, end, {
    description,
    guests: email,
    sendInvites: false,
  })

  return event.getId()
}

// ============================================================================
// Main Handlers
// ============================================================================

function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput {
  try {
    const path = e.parameter.path || '/'

    if (path === '/availability') {
      return handleAvailability(e)
    }

    return createErrorResponse(ErrorCode.INVALID_REQUEST, 'Invalid endpoint', 404)
  } catch (error) {
    logError('doGet', error)
    return createErrorResponse(
      ErrorCode.CALENDAR_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}

function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  try {
    const path = e.parameter.path || '/'

    if (path === '/reserve') {
      return handleReserve(e)
    }

    return createErrorResponse(ErrorCode.INVALID_REQUEST, 'Invalid endpoint', 404)
  } catch (error) {
    logError('doPost', error)

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


function handleAvailability(
  e: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  const params = e.parameter as any as AvailabilityRequest

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
    return createErrorResponse(ErrorCode.INVALID_REQUEST, 'Invalid durationMin value')
  }

  const slots = generateTimeSlots(from, to, durationMin)

  const response: AvailabilityResponse = {
    slots,
  }

  return createJsonResponse(response)
}

function handleReserve(
  e: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
  const body = parseRequestBody(e) as ReserveRequest

  if (
    !body.token ||
    !body.lastName ||
    !body.firstName ||
    !body.email ||
    !body.menu ||
    !body.start
  ) {
    return createErrorResponse(ErrorCode.INVALID_REQUEST, 'Missing required fields')
  }

  try {
    validateToken(body.token)
  } catch (error) {
    return createErrorResponse(ErrorCode.INVALID_TOKEN, 'Invalid API token', 401)
  }

  if (!MENU_CONFIG[body.menu]) {
    return createErrorResponse(ErrorCode.INVALID_REQUEST, 'Invalid menu type')
  }

  const start = parseISOString(body.start)

  try {
    const eventId = createReservationEvent(
      body.lastName,
      body.firstName,
      body.email,
      body.phone || '',
      body.guestCount || 1,
      body.hasPet || false,
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
