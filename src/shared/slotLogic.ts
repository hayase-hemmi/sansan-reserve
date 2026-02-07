/**
 * スロット生成のビジネスロジック（純粋関数）
 *
 * CalendarApp等の外部依存なし。テスト可能。
 * GASバックエンド (gas/src/calendar.ts) と同等のアルゴリズム。
 */

import type { BusinessHours } from './menuConfig'
import { DEFAULT_BUSINESS_HOURS } from './menuConfig'

export interface BusyPeriod {
  start: Date
  end: Date
}

export interface SlotResult {
  start: Date
  end: Date
  available: boolean
}

/**
 * スロットがbusy期間と重複しているか判定する。
 * slotStart < busy.end && slotEnd > busy.start で重複検出。
 * 境界が一致する場合（slotEnd === busy.start 等）は重複しない。
 */
export function isSlotBusy(
  slotStart: Date,
  slotEnd: Date,
  busyPeriods: BusyPeriod[]
): boolean {
  return busyPeriods.some(
    (busy) => slotStart < busy.end && slotEnd > busy.start
  )
}

/**
 * 1日分のスロットを生成する。
 * 営業時間内で slotInterval ごとにスロット開始時刻を設定し、
 * duration分の枠が営業時間内に収まるスロットのみ返す。
 */
export function generateDaySlots(
  date: Date,
  durationMin: number,
  busyPeriods: BusyPeriod[],
  businessHours: BusinessHours = DEFAULT_BUSINESS_HOURS
): SlotResult[] {
  const slots: SlotResult[] = []
  const { start: startHour, end: endHour, slotInterval } = businessHours

  const currentTime = new Date(date)
  currentTime.setHours(startHour, 0, 0, 0)

  const dayEnd = new Date(date)
  dayEnd.setHours(endHour, 0, 0, 0)

  while (currentTime < dayEnd) {
    const slotEnd = new Date(currentTime.getTime() + durationMin * 60 * 1000)

    if (slotEnd <= dayEnd) {
      const available = !isSlotBusy(currentTime, slotEnd, busyPeriods)
      slots.push({
        start: new Date(currentTime),
        end: new Date(slotEnd),
        available,
      })
    }

    currentTime.setTime(currentTime.getTime() + slotInterval * 60 * 1000)
  }

  return slots
}

/**
 * 複数日にわたるスロットを生成する。
 */
export function generateTimeSlotsFromBusyPeriods(
  from: Date,
  to: Date,
  durationMin: number,
  busyPeriods: BusyPeriod[],
  businessHours: BusinessHours = DEFAULT_BUSINESS_HOURS
): SlotResult[] {
  const slots: SlotResult[] = []
  const currentDate = new Date(from)
  const endDate = new Date(to)

  while (currentDate < endDate) {
    const daySlots = generateDaySlots(currentDate, durationMin, busyPeriods, businessHours)
    slots.push(...daySlots)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return slots
}
