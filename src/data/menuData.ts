import type { Menu } from '../services/api'

export interface MenuOption {
  value: Menu
  title: string
  description: string
  duration: number // minutes
  price: string
}

export const menuOptions: MenuOption[] = [
  {
    value: 'standard',
    title: 'スタンダードプラン',
    description: '個人向けの基本的な撮影プラン',
    duration: 30,
    price: '¥10,000',
  },
  {
    value: 'premium',
    title: 'プレミアムプラン',
    description: 'より充実した撮影時間とポーズバリエーション',
    duration: 60,
    price: '¥20,000',
  },
  {
    value: 'family',
    title: 'ファミリープラン',
    description: 'ご家族やグループでの撮影に最適',
    duration: 90,
    price: '¥30,000',
  },
  {
    value: 'wedding',
    title: 'ウェディングプラン',
    description: '特別な日の記念撮影をじっくりと',
    duration: 120,
    price: '¥50,000',
  },
]
