import { getScriptProperty, toJSTISOString } from './util'
import { TimeSlot, DEFAULT_BUSINESS_HOURS, MENU_CONFIG, Menu } from './types'

/**
 * Get calendar instance
 */
function getCalendar(): GoogleAppsScript.Calendar.Calendar {
  const calendarId = getScriptProperty('CALENDAR_ID')
  const calendar = CalendarApp.getCalendarById(calendarId)

  if (!calendar) {
    throw new Error('Calendar not found')
  }

  return calendar
}

/**
 * Get busy time periods from calendar
 */
export function getBusyPeriods(from: Date, to: Date): Array<{ start: Date; end: Date }> {
  const calendar = getCalendar()
  const events = calendar.getEvents(from, to)

  return events.map((event) => ({
    start: new Date(event.getStartTime().getTime()),
    end: new Date(event.getEndTime().getTime()),
  }))
}

/**
 * Generate time slots based on business hours and busy periods
 */
export function generateTimeSlots(
  from: Date,
  to: Date,
  durationMin: number
): TimeSlot[] {
  const slots: TimeSlot[] = []
  const busyPeriods = getBusyPeriods(from, to)

  // Generate slots for each day
  const currentDate = new Date(from)
  const endDate = new Date(to)

  while (currentDate < endDate) {
    const daySlots = generateDaySlots(currentDate, durationMin, busyPeriods)
    slots.push(...daySlots)

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return slots
}

/**
 * Generate slots for a single day
 */
function generateDaySlots(
  date: Date,
  durationMin: number,
  busyPeriods: Array<{ start: Date; end: Date }>
): TimeSlot[] {
  const slots: TimeSlot[] = []
  const { start: startHour, end: endHour, slotInterval } = DEFAULT_BUSINESS_HOURS

  // Create slots from business start to end
  let currentTime = new Date(date)
  currentTime.setHours(startHour, 0, 0, 0)

  const dayEnd = new Date(date)
  dayEnd.setHours(endHour, 0, 0, 0)

  while (currentTime < dayEnd) {
    const slotEnd = new Date(currentTime.getTime() + durationMin * 60 * 1000)

    // Check if slot end is within business hours
    if (slotEnd <= dayEnd) {
      const available = !isSlotBusy(currentTime, slotEnd, busyPeriods)

      slots.push({
        start: toJSTISOString(currentTime),
        end: toJSTISOString(slotEnd),
        available,
      })
    }

    // Move to next slot
    currentTime = new Date(currentTime.getTime() + slotInterval * 60 * 1000)
  }

  return slots
}

/**
 * Check if a time slot overlaps with any busy period
 */
function isSlotBusy(
  slotStart: Date,
  slotEnd: Date,
  busyPeriods: Array<{ start: Date; end: Date }>
): boolean {
  return busyPeriods.some((busy) => {
    // Check if there's any overlap
    return slotStart < busy.end && slotEnd > busy.start
  })
}

/**
 * Check if a specific slot is available
 */
export function isSlotAvailable(start: Date, durationMin: number): boolean {
  const end = new Date(start.getTime() + durationMin * 60 * 1000)
  const busyPeriods = getBusyPeriods(start, end)

  return !isSlotBusy(start, end, busyPeriods)
}

/**
 * Create a reservation event in calendar
 */
export function createReservationEvent(
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

  // Double-check availability before creating
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
