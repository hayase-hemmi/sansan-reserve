import type { Menu } from '../services/api'

export interface MenuOption {
  value: Menu
  title: string
  description: string
  duration: number // minutes
  price: string
  priceNote?: string
  capacity?: string
  details: string[]
}

export const menuOptions: MenuOption[] = [
  {
    value: 'standard',
    title: '15分撮影プラン',
    description: 'お手軽にセルフフォト撮影を楽しめる基本プラン',
    duration: 30,
    price: '¥3,000',
    priceNote: '2人まで / 3人目以降 +¥1,000',
    capacity: '定員4人まで（ペット除く）',
    details: [
      '施設説明・準備（約5分）',
      'セルフ撮影（15分）',
      'リモコンシャッター貸出',
      'データ転送（Airdrop / USB）',
    ],
  },
  {
    value: 'premium',
    title: '30分撮影プラン',
    description: 'たっぷり撮影できるゆとりのプラン',
    duration: 60,
    price: '¥5,000',
    priceNote: '2人まで / 3人目以降 +¥1,500',
    capacity: '定員4人まで（ペット除く）',
    details: [
      '施設説明・準備',
      'セルフ撮影（30分）',
      'リモコンシャッター貸出',
      'データ転送（Airdrop / USB）',
    ],
  },
  {
    value: 'family',
    title: '七五三 3歳女の子プラン',
    description: '衣装レンタル・着付け込みの七五三撮影',
    duration: 120,
    price: '¥10,000',
    priceNote: '補助2人まで / 写真に写る場合 +¥1,500',
    details: [
      '衣装一式レンタル',
      '着付け',
      'セルフ撮影（30分）',
      'データ転送（Airdrop / USB）',
    ],
  },
  {
    value: 'wedding',
    title: '七五三 5歳男の子プラン',
    description: '衣装レンタル・着付け込みの七五三撮影',
    duration: 120,
    price: '¥10,000',
    priceNote: '補助2人まで / 写真に写る場合 +¥1,500',
    details: [
      '衣装一式レンタル',
      '着付け',
      'セルフ撮影（30分）',
      'データ転送（Airdrop / USB）',
    ],
  },
]
