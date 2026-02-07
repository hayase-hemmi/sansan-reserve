import { describe, it, expect } from 'vitest'
import {
  isSlotBusy,
  generateDaySlots,
  generateTimeSlotsFromBusyPeriods,
  type BusyPeriod,
} from '../slotLogic'
import type { BusinessHours } from '../menuConfig'

// ヘルパー: 時刻を Date に変換
function time(hour: number, min = 0): Date {
  const d = new Date(2025, 0, 15) // 任意の日付
  d.setHours(hour, min, 0, 0)
  return d
}

function busyPeriod(startH: number, startM: number, endH: number, endM: number): BusyPeriod {
  return { start: time(startH, startM), end: time(endH, endM) }
}

const DEFAULT_BH: BusinessHours = { start: 9, end: 18, slotInterval: 30 }

// ========================================
// isSlotBusy
// ========================================
describe('isSlotBusy', () => {
  const busy = [busyPeriod(13, 0, 14, 0)] // 13:00-14:00

  it('busy期間なし → false', () => {
    expect(isSlotBusy(time(9, 0), time(9, 30), [])).toBe(false)
  })

  it('スロットがbusy期間の完全に前 → false', () => {
    expect(isSlotBusy(time(10, 0), time(11, 0), busy)).toBe(false)
  })

  it('スロットがbusy期間の完全に後 → false', () => {
    expect(isSlotBusy(time(15, 0), time(16, 0), busy)).toBe(false)
  })

  it('スロットの開始がbusy期間内 → true', () => {
    expect(isSlotBusy(time(13, 30), time(14, 30), busy)).toBe(true)
  })

  it('スロットの終了がbusy期間内 → true', () => {
    expect(isSlotBusy(time(12, 30), time(13, 30), busy)).toBe(true)
  })

  it('スロットがbusy期間を完全に含む → true', () => {
    expect(isSlotBusy(time(12, 0), time(15, 0), busy)).toBe(true)
  })

  it('busy期間がスロットを完全に含む → true', () => {
    expect(isSlotBusy(time(13, 15), time(13, 45), busy)).toBe(true)
  })

  it('スロット終了 === busy開始（境界） → false', () => {
    expect(isSlotBusy(time(12, 0), time(13, 0), busy)).toBe(false)
  })

  it('スロット開始 === busy終了（境界） → false', () => {
    expect(isSlotBusy(time(14, 0), time(15, 0), busy)).toBe(false)
  })

  it('複数busy期間のうち2番目と重なる → true', () => {
    const multiBusy = [
      busyPeriod(10, 0, 11, 0),
      busyPeriod(15, 0, 16, 0),
    ]
    expect(isSlotBusy(time(15, 0), time(15, 30), multiBusy)).toBe(true)
  })
})

// ========================================
// generateDaySlots
// ========================================
describe('generateDaySlots', () => {
  const date = new Date(2025, 0, 15)

  describe('busy無し', () => {
    it('30分プラン → 18スロット (9:00-17:30)', () => {
      const slots = generateDaySlots(date, 30, [], DEFAULT_BH)
      expect(slots).toHaveLength(18)
      // 最初のスロット
      expect(slots[0].start.getHours()).toBe(9)
      expect(slots[0].end.getHours()).toBe(9)
      expect(slots[0].end.getMinutes()).toBe(30)
      // 最後のスロット
      const last = slots[slots.length - 1]
      expect(last.start.getHours()).toBe(17)
      expect(last.start.getMinutes()).toBe(30)
      expect(last.end.getHours()).toBe(18)
      // 全てavailable
      expect(slots.every((s) => s.available)).toBe(true)
    })

    it('60分プラン → 17スロット (9:00-17:00)', () => {
      const slots = generateDaySlots(date, 60, [], DEFAULT_BH)
      expect(slots).toHaveLength(17)
      const last = slots[slots.length - 1]
      expect(last.start.getHours()).toBe(17)
      expect(last.start.getMinutes()).toBe(0)
      expect(last.end.getHours()).toBe(18)
    })

    it('120分プラン → 15スロット (9:00-16:00)', () => {
      const slots = generateDaySlots(date, 120, [], DEFAULT_BH)
      expect(slots).toHaveLength(15)
      const last = slots[slots.length - 1]
      expect(last.start.getHours()).toBe(16)
      expect(last.start.getMinutes()).toBe(0)
      expect(last.end.getHours()).toBe(18)
    })
  })

  describe('営業時間外にはみ出すスロットが生成されないこと', () => {
    it('120分プラン: 16:30開始は18:30終了→生成されない', () => {
      const slots = generateDaySlots(date, 120, [], DEFAULT_BH)
      const has1630 = slots.some(
        (s) => s.start.getHours() === 16 && s.start.getMinutes() === 30
      )
      expect(has1630).toBe(false)
    })
  })

  describe('busy期間との重複', () => {
    it('busy期間と重なるスロットがavailable=falseになること', () => {
      const busy = [busyPeriod(10, 0, 11, 0)] // 10:00-11:00
      const slots = generateDaySlots(date, 30, busy, DEFAULT_BH)

      // 10:00-10:30 と 10:30-11:00 は unavailable
      const at1000 = slots.find(
        (s) => s.start.getHours() === 10 && s.start.getMinutes() === 0
      )
      const at1030 = slots.find(
        (s) => s.start.getHours() === 10 && s.start.getMinutes() === 30
      )
      expect(at1000?.available).toBe(false)
      expect(at1030?.available).toBe(false)

      // 9:30-10:00 は available（境界: スロット終了 === busy開始）
      const at0930 = slots.find(
        (s) => s.start.getHours() === 9 && s.start.getMinutes() === 30
      )
      expect(at0930?.available).toBe(true)

      // 11:00-11:30 は available（境界: スロット開始 === busy終了）
      const at1100 = slots.find(
        (s) => s.start.getHours() === 11 && s.start.getMinutes() === 0
      )
      expect(at1100?.available).toBe(true)
    })

    it('120分プランで10:00-11:00がbusyの場合、9:00-11:00も影響を受ける', () => {
      const busy = [busyPeriod(10, 0, 11, 0)]
      const slots = generateDaySlots(date, 120, busy, DEFAULT_BH)

      // 9:00-11:00 → busyと重なる → unavailable
      const at0900 = slots.find(
        (s) => s.start.getHours() === 9 && s.start.getMinutes() === 0
      )
      expect(at0900?.available).toBe(false)

      // 9:30-11:30 → busyと重なる → unavailable
      const at0930 = slots.find(
        (s) => s.start.getHours() === 9 && s.start.getMinutes() === 30
      )
      expect(at0930?.available).toBe(false)
    })

    it('全スロットがbusy → 全てavailable=false', () => {
      const busy = [busyPeriod(9, 0, 18, 0)]
      const slots = generateDaySlots(date, 30, busy, DEFAULT_BH)
      expect(slots.length).toBeGreaterThan(0)
      expect(slots.every((s) => !s.available)).toBe(true)
    })
  })

  describe('カスタム営業時間', () => {
    it('10:00-14:00, 30分間隔, 30分プラン → 8スロット', () => {
      const customBH: BusinessHours = { start: 10, end: 14, slotInterval: 30 }
      const slots = generateDaySlots(date, 30, [], customBH)
      expect(slots).toHaveLength(8)
      expect(slots[0].start.getHours()).toBe(10)
      const last = slots[slots.length - 1]
      expect(last.start.getHours()).toBe(13)
      expect(last.start.getMinutes()).toBe(30)
    })

    it('60分間隔にするとスロット数が半減', () => {
      const customBH: BusinessHours = { start: 9, end: 18, slotInterval: 60 }
      const slots = generateDaySlots(date, 30, [], customBH)
      expect(slots).toHaveLength(9) // 9:00, 10:00, ..., 17:00
    })
  })
})

// ========================================
// generateTimeSlotsFromBusyPeriods
// ========================================
describe('generateTimeSlotsFromBusyPeriods', () => {
  it('1日分の範囲 → generateDaySlotsと同一結果', () => {
    const from = new Date(2025, 0, 15, 9, 0, 0, 0)
    const to = new Date(2025, 0, 15, 18, 0, 0, 0)

    const multiDaySlots = generateTimeSlotsFromBusyPeriods(from, to, 30, [], DEFAULT_BH)
    const singleDaySlots = generateDaySlots(new Date(2025, 0, 15), 30, [], DEFAULT_BH)

    expect(multiDaySlots).toHaveLength(singleDaySlots.length)
  })

  it('2日分の範囲 → 2日分のスロットが返ること', () => {
    const from = new Date(2025, 0, 15, 9, 0, 0, 0)
    const to = new Date(2025, 0, 16, 18, 0, 0, 0) // 15日と16日

    const slots = generateTimeSlotsFromBusyPeriods(from, to, 30, [], DEFAULT_BH)
    const oneDaySlots = generateDaySlots(new Date(2025, 0, 15), 30, [], DEFAULT_BH)

    expect(slots).toHaveLength(oneDaySlots.length * 2)
  })

  it('busy期間が特定の日に影響すること', () => {
    const from = new Date(2025, 0, 15, 9, 0, 0, 0)
    const to = new Date(2025, 0, 17, 18, 0, 0, 0)

    // 15日の10:00-11:00がbusy
    const busy: BusyPeriod[] = [{
      start: new Date(2025, 0, 15, 10, 0, 0, 0),
      end: new Date(2025, 0, 15, 11, 0, 0, 0),
    }]

    const slots = generateTimeSlotsFromBusyPeriods(from, to, 30, busy, DEFAULT_BH)
    const unavailable = slots.filter((s) => !s.available)

    // 15日の10:00-10:30, 10:30-11:00 のみunavailable
    expect(unavailable).toHaveLength(2)
    expect(unavailable[0].start.getDate()).toBe(15)
  })
})
