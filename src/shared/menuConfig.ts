/**
 * メニュー設定の単一ソース (Single Source of Truth)
 *
 * メニューのduration・displayName等はすべてこのファイルから参照すること。
 * GASバックエンド (gas/src/types.ts) にも同じ値のコピーがあり、
 * テストで整合性を自動検証している。
 */

export type Menu = 'standard' | 'premium' | 'family' | 'wedding'

export interface MenuConfig {
  duration: number // 所要時間（分）— 説明・準備・撮影・データ渡しを含む
  displayName: string
}

export const MENU_CONFIG: Record<Menu, MenuConfig> = {
  standard: { duration: 30, displayName: '15分撮影プラン' },
  premium: { duration: 60, displayName: '30分撮影プラン' },
  family: { duration: 120, displayName: '七五三 3歳女の子プラン' },
  wedding: { duration: 120, displayName: '七五三 5歳男の子プラン' },
}

export interface BusinessHours {
  start: number // 開始時刻 (0-23)
  end: number // 終了時刻 (0-23)
  slotInterval: number // スロット間隔（分）
}

export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  start: 9,
  end: 18,
  slotInterval: 30,
}

export function getMenuDuration(menu: Menu): number {
  return MENU_CONFIG[menu].duration
}
