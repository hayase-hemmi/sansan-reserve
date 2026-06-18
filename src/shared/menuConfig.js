/**
 * メニュー設定の単一ソース (Single Source of Truth)
 *
 * メニューのduration・displayName等はすべてこのファイルから参照すること。
 * GASバックエンド (gas/src/types.ts) にも同じ値のコピーがあり、
 * テストで整合性を自動検証している。
 */
export const MENU_CONFIG = {
    standard: { duration: 30, displayName: '15分撮影プラン' },
    premium: { duration: 60, displayName: '30分撮影プラン' },
    family: { duration: 120, displayName: '七五三 3歳女の子プラン' },
    wedding: { duration: 120, displayName: '七五三 5歳男の子プラン' },
};
export const DEFAULT_BUSINESS_HOURS = {
    start: 9,
    end: 18,
    slotInterval: 30,
};
export function getMenuDuration(menu) {
    return MENU_CONFIG[menu].duration;
}
