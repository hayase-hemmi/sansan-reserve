import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { MENU_CONFIG, getMenuDuration, type Menu } from '../menuConfig'

describe('MENU_CONFIG', () => {
  describe('duration', () => {
    it.each([
      ['standard', 30],
      ['premium', 60],
      ['family', 120],
      ['wedding', 120],
    ] as const)('%s は %d 分', (menu, expected) => {
      expect(MENU_CONFIG[menu].duration).toBe(expected)
    })
  })

  describe('displayName', () => {
    it.each([
      ['standard', '15分撮影プラン'],
      ['premium', '30分撮影プラン'],
      ['family', '七五三 3歳女の子プラン'],
      ['wedding', '七五三 5歳男の子プラン'],
    ] as const)('%s は "%s"', (menu, expected) => {
      expect(MENU_CONFIG[menu].displayName).toBe(expected)
    })
  })

  it('全メニューキーが定義されていること', () => {
    const expectedKeys: Menu[] = ['standard', 'premium', 'family', 'wedding']
    expect(Object.keys(MENU_CONFIG).sort()).toEqual(expectedKeys.sort())
  })

  it('全メニューのdurationが正の整数であること', () => {
    for (const config of Object.values(MENU_CONFIG)) {
      expect(config.duration).toBeGreaterThan(0)
      expect(Number.isInteger(config.duration)).toBe(true)
    }
  })
})

describe('getMenuDuration', () => {
  it.each([
    ['standard', 30],
    ['premium', 60],
    ['family', 120],
    ['wedding', 120],
  ] as const)('%s → %d 分', (menu, expected) => {
    expect(getMenuDuration(menu)).toBe(expected)
  })

  it('MENU_CONFIG.duration と一致すること', () => {
    for (const [key, config] of Object.entries(MENU_CONFIG)) {
      expect(getMenuDuration(key as Menu)).toBe(config.duration)
    }
  })
})

describe('GASバックエンドとの整合性', () => {
  const gasTypesPath = resolve(__dirname, '../../../gas/src/types.ts')
  const gasTypesContent = readFileSync(gasTypesPath, 'utf-8')

  for (const [menu, config] of Object.entries(MENU_CONFIG)) {
    it(`gas/src/types.ts の ${menu} duration が ${config.duration} であること`, () => {
      const regex = new RegExp(
        `${menu}:\\s*\\{[^}]*duration:\\s*${config.duration}[^\\d]`
      )
      expect(gasTypesContent).toMatch(regex)
    })

    it(`gas/src/types.ts の ${menu} displayName が '${config.displayName}' であること`, () => {
      expect(gasTypesContent).toContain(config.displayName)
    })
  }
})
