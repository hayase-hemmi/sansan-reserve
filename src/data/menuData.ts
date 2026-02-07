import type { Menu } from '../services/api'

export type ContentItemType = 'text' | 'bullet' | 'note' | 'sub-item' | 'example-ok' | 'example-ng'

export interface ContentItem {
  type: ContentItemType
  text: string
}

export interface MenuSection {
  title: string
  items: ContentItem[]
}

export interface MenuOption {
  value: Menu
  title: string
  description: string
  duration: number // minutes
  price: string
  priceNote?: string
  capacity?: string
  sections: MenuSection[]
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
    sections: [
      {
        title: '料金',
        items: [
          { type: 'text', text: '3,000円（2人まで）' },
          { type: 'note', text: '3人目以降は1人あたり＋1,000円' },
          { type: 'text', text: '写真に映る、映らない関わらずご来店された方全員の料金を頂戴しております。' },
        ],
      },
      {
        title: '撮影の流れ',
        items: [
          { type: 'text', text: '所要時間：約30分' },
          { type: 'text', text: '説明 → 準備 → 撮影（15分）→ データ渡し' },
          { type: 'sub-item', text: '説明：施設の使い方や撮影の仕方を説明します。' },
          { type: 'sub-item', text: '準備：メイク直しのお時間です。' },
          { type: 'sub-item', text: '撮影：リモコンシャッターでセルフ撮影！' },
          { type: 'sub-item', text: 'データ渡し：AirdropもしくはUSBメモリ（お客様持参）へ転送します。' },
        ],
      },
      {
        title: '定員',
        items: [
          { type: 'text', text: '4人まで（ペットを除く）' },
          { type: 'text', text: '4人以上をご希望の方は、メールにてご相談ください。' },
        ],
      },
      {
        title: 'お子様について',
        items: [
          { type: 'bullet', text: '走り回ると機材や設備にぶつかり怪我をする恐れがあります。当方では責任を負いかねますので必ず目を離さないようにしてください。やむを得ず中断して頂く場合もございます。' },
          { type: 'bullet', text: 'おむつ替えなどは、バスタオル等をご持参の上行ってください。（ベビーベッド等のご用意はございません）' },
        ],
      },
      {
        title: 'ペットについて',
        items: [
          { type: 'bullet', text: '撮影時間まではおむつを着用の上ご来店ください。' },
          { type: 'bullet', text: 'ペットの頭数以上の大人（18歳以上）を同伴・予約してください。' },
          { type: 'example-ok', text: '【例：ペットが2頭、18歳以上の大人3人】' },
          { type: 'example-ng', text: '【例：ペットが2頭、18歳以上の大人1人、10歳の未成年1人】' },
          { type: 'example-ng', text: '【例：ペットが1頭、17歳の未成年1人】' },
          { type: 'bullet', text: '走り回ると機材や設備にぶつかり怪我をする恐れがあります。当方では責任を負いかねますので必ず目を離さないようにしてください。' },
        ],
      },
      {
        title: 'その他',
        items: [
          { type: 'bullet', text: 'ご予約は2日前の10時に締め切らせて頂いております。それ以降のご予約についてはメールもしくはLINE（＠203uldwt）にて承ります。' },
          { type: 'bullet', text: 'お客様用のお手洗いのご用意はございません。ご了承ください。' },
          { type: 'bullet', text: '駐車場は、店周辺の道路脇にある白枠の無料駐車帯にお停めください。' },
          { type: 'bullet', text: '自転車でお越しの場合は、店前にお停めください。' },
          { type: 'bullet', text: '施設内の物を汚損、破損した場合は弁償して頂きますのでご了承ください。' },
          { type: 'bullet', text: '各種お問い合わせは下記のメールアドレスへお願いいたします。photostudiosansan@gmail.com' },
        ],
      },
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
    sections: [
      {
        title: '料金',
        items: [
          { type: 'text', text: '5,000円（2人まで）' },
          { type: 'note', text: '3人目以降は1人あたり＋1,500円' },
          { type: 'text', text: '写真に映る、映らない関わらずご来店された方全員の料金を頂戴しております。' },
        ],
      },
      {
        title: '撮影の流れ',
        items: [
          { type: 'text', text: '所要時間：約60分' },
          { type: 'text', text: '説明 → 準備 → 撮影（30分）→ データ渡し' },
          { type: 'sub-item', text: '説明：施設の使い方や撮影の仕方を説明します。' },
          { type: 'sub-item', text: '準備：メイク直しのお時間です。' },
          { type: 'sub-item', text: '撮影：リモコンシャッターでセルフ撮影！' },
          { type: 'sub-item', text: 'データ渡し：AirdropもしくはUSBメモリ（お客様持参）へ転送します。' },
        ],
      },
      {
        title: '定員',
        items: [
          { type: 'text', text: '4人まで（ペットを除く）' },
          { type: 'text', text: '4人以上をご希望の方は、メールにてご相談ください。' },
        ],
      },
      {
        title: 'お子様について',
        items: [
          { type: 'bullet', text: '走り回ると機材や設備にぶつかり怪我をする恐れがあります。当方では責任を負いかねますので必ず目を離さないようにしてください。やむを得ず中断して頂く場合もございます。' },
          { type: 'bullet', text: 'おむつ替えなどは、バスタオル等をご持参の上行ってください。（ベビーベッド等のご用意はございません）' },
        ],
      },
      {
        title: 'ペットについて',
        items: [
          { type: 'bullet', text: '撮影時間まではおむつを着用の上ご来店ください。' },
          { type: 'bullet', text: 'ペットの頭数以上の大人（18歳以上）を同伴・予約してください。' },
          { type: 'example-ok', text: '【例：ペットが2頭、18歳以上の大人3人】' },
          { type: 'example-ng', text: '【例：ペットが2頭、18歳以上の大人1人、10歳の未成年1人】' },
          { type: 'example-ng', text: '【例：ペットが1頭、17歳の未成年1人】' },
          { type: 'bullet', text: '走り回ると機材や設備にぶつかり怪我をする恐れがあります。当方では責任を負いかねますので必ず目を離さないようにしてください。' },
        ],
      },
      {
        title: 'その他',
        items: [
          { type: 'bullet', text: 'ご予約は2日前の10時に締め切らせて頂いております。それ以降のご予約についてはメールもしくはLINE（＠203uldwt）にて承ります。' },
          { type: 'bullet', text: 'お客様用のお手洗いのご用意はございません。ご了承ください。' },
          { type: 'bullet', text: '駐車場は、店周辺の道路脇にある白枠の無料駐車帯にお停めください。' },
          { type: 'bullet', text: '自転車でお越しの場合は、店前にお停めください。' },
          { type: 'bullet', text: '施設内の物を汚損、破損した場合は弁償して頂きますのでご了承ください。' },
          { type: 'bullet', text: '各種お問い合わせは下記のメールアドレスへお願いいたします。photostudiosansan@gmail.com' },
        ],
      },
    ],
  },
  {
    value: 'family',
    title: '七五三 3歳女の子プラン',
    description: '衣装レンタル・着付け込みの七五三撮影',
    duration: 120,
    price: '¥10,000',
    priceNote: '補助2人まで / 写真に写る場合 +¥1,500',
    sections: [
      {
        title: '金額',
        items: [
          { type: 'text', text: '10,000円（税込）' },
        ],
      },
      {
        title: '内容',
        items: [
          { type: 'text', text: '衣装一式レンタル' },
          { type: 'text', text: '着付（ヘアメイクは含まれません）' },
          { type: 'text', text: 'セルフ撮影30分' },
        ],
      },
      {
        title: '流れ',
        items: [
          { type: 'text', text: '撮影日のご予約' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: '撮影日にご来店' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: '着付・撮影' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: 'データ渡し（Airdropもしくはお持ちのUSB）' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: 'お支払い（現金もしくはPayPay）' },
        ],
      },
      {
        title: 'その他・注意事項',
        items: [
          { type: 'bullet', text: '補助は2人まで（写真に写る場合は1人あたり＋1,500円）' },
          { type: 'bullet', text: 'ヘアメイクはつきませんので、ご了承ください。必要な場合は、ご来店前にお済ましください。' },
          { type: 'bullet', text: '衣装及び施設設備を破損、汚損された場合は弁償またはクリーニング代を頂きます。' },
          { type: 'bullet', text: 'お客様用のお手洗いのご用意はございません。ご了承ください。' },
          { type: 'bullet', text: '駐車場は、店周辺の道路脇にある白枠の無料駐車帯にお停めください。' },
          { type: 'bullet', text: '各種お問い合わせは下記のメールアドレスへお願いいたします。photostudiosansan@gmail.com' },
        ],
      },
    ],
  },
  {
    value: 'wedding',
    title: '七五三 5歳男の子プラン',
    description: '衣装レンタル・着付け込みの七五三撮影',
    duration: 120,
    price: '¥10,000',
    priceNote: '補助2人まで / 写真に写る場合 +¥1,500',
    sections: [
      {
        title: '金額',
        items: [
          { type: 'text', text: '10,000円（税込）' },
        ],
      },
      {
        title: '内容',
        items: [
          { type: 'text', text: '衣装一式レンタル' },
          { type: 'text', text: '着付（ヘアメイクは含まれません）' },
          { type: 'text', text: 'セルフ撮影30分' },
        ],
      },
      {
        title: '流れ',
        items: [
          { type: 'text', text: '撮影日のご予約' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: '撮影日にご来店' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: '着付・撮影' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: 'データ渡し（Airdropもしくはお持ちのUSB）' },
          { type: 'sub-item', text: '↓' },
          { type: 'text', text: 'お支払い（現金もしくはPayPay）' },
        ],
      },
      {
        title: 'その他・注意事項',
        items: [
          { type: 'bullet', text: '補助は2人まで（写真に写る場合は1人あたり＋1,500円）' },
          { type: 'bullet', text: 'ヘアメイクはつきませんので、ご了承ください。必要な場合は、ご来店前にお済ましください。' },
          { type: 'bullet', text: '衣装及び施設設備を破損、汚損された場合は弁償またはクリーニング代を頂きます。' },
          { type: 'bullet', text: 'お客様用のお手洗いのご用意はございません。ご了承ください。' },
          { type: 'bullet', text: '駐車場は、店周辺の道路脇にある白枠の無料駐車帯にお停めください。' },
          { type: 'bullet', text: '各種お問い合わせは下記のメールアドレスへお願いいたします。photostudiosansan@gmail.com' },
        ],
      },
    ],
  },
]
