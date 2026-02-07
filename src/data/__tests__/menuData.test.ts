import { describe, it, expect } from 'vitest'
import { menuOptions } from '../menuData'
import { MENU_CONFIG, type Menu } from '../../shared/menuConfig'

describe('menuOptions と MENU_CONFIG の整合性', () => {
  it('全menuOptionsのdurationがMENU_CONFIGと一致すること', () => {
    for (const option of menuOptions) {
      expect(option.duration).toBe(MENU_CONFIG[option.value].duration)
    }
  })

  it('全MENU_CONFIGキーに対応するmenuOptionが存在すること', () => {
    const menuValues = menuOptions.map((o) => o.value)
    for (const key of Object.keys(MENU_CONFIG) as Menu[]) {
      expect(menuValues).toContain(key)
    }
  })

  it('menuOptionsに重複したvalueがないこと', () => {
    const values = menuOptions.map((o) => o.value)
    expect(new Set(values).size).toBe(values.length)
  })

  it('全menuOptionsのpriceが空でないこと', () => {
    for (const option of menuOptions) {
      expect(option.price.length).toBeGreaterThan(0)
    }
  })

  it('全menuOptionsのsectionsが1つ以上あること', () => {
    for (const option of menuOptions) {
      expect(option.sections.length).toBeGreaterThan(0)
    }
  })
})

describe('回帰テスト: バグ再発防止', () => {
  it('familyメニュー(七五三3歳女の子プラン)のdurationが120分であること', () => {
    const family = menuOptions.find((o) => o.value === 'family')
    expect(family).toBeDefined()
    expect(family!.duration).toBe(120)
  })

  it('weddingメニュー(七五三5歳男の子プラン)のdurationが120分であること', () => {
    const wedding = menuOptions.find((o) => o.value === 'wedding')
    expect(wedding).toBeDefined()
    expect(wedding!.duration).toBe(120)
  })
})
