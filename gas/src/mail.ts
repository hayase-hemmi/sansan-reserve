import { MENU_CONFIG, Menu } from './types'

interface ReservationMailParams {
  lastName: string
  firstName: string
  email: string
  phone: string
  guestCount: number
  hasPet: boolean
  menu: Menu
  start: Date
}

/**
 * Send confirmation email to customer
 */
export function sendConfirmationEmail(params: ReservationMailParams): void {
  const menuConfig = MENU_CONFIG[params.menu]
  const end = new Date(params.start.getTime() + menuConfig.duration * 60 * 1000)

  const dateStr = formatDateJST(params.start)
  const startTimeStr = formatTimeJST(params.start)
  const endTimeStr = formatTimeJST(end)

  const subject = `【Sansan Reserve】ご予約確認 - ${dateStr} ${startTimeStr}`

  const body = `${params.lastName} ${params.firstName} 様

この度はご予約いただき、誠にありがとうございます。
以下の内容でご予約を承りました。

━━━━━━━━━━━━━━━━━━━━━━━━
  ご予約内容
━━━━━━━━━━━━━━━━━━━━━━━━

■ お名前: ${params.lastName} ${params.firstName} 様
■ メールアドレス: ${params.email}
■ 電話番号: ${params.phone}
■ ご来店人数: ${params.guestCount}人
■ ペット同伴: ${params.hasPet ? 'あり' : 'なし'}
■ 撮影メニュー: ${menuConfig.displayName}
■ 所要時間: 約${menuConfig.duration}分
■ 予約日時: ${dateStr} ${startTimeStr}〜${endTimeStr}

━━━━━━━━━━━━━━━━━━━━━━━━

ご不明な点がございましたら、お気軽にお問い合わせください。

当日のご来店をお待ちしております。

──────────────────────
Sansan Reserve 写真スタジオ
──────────────────────`

  MailApp.sendEmail({
    to: params.email,
    subject,
    body,
  })
}

function formatDateJST(date: Date): string {
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const dow = dayNames[date.getDay()]
  return `${y}年${m}月${d}日（${dow}）`
}

function formatTimeJST(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${min}`
}
