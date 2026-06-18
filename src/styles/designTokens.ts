/**
 * Design Tokens
 * Based on the aesthetic of komori-aya.com
 * A warm, natural, and professional design system
 */

export const designTokens = {
  // Color Palette - uses CSS custom properties for theming
  colors: {
    background: {
      main: 'var(--bg-main)',
      card: 'var(--bg-card)',
      hover: 'var(--bg-hover)',
      input: 'var(--bg-input)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      disabled: 'var(--text-disabled)',
    },
    accent: {
      primary: 'var(--accent-primary)',
      secondary: 'var(--accent-secondary)',
      hover: 'var(--accent-hover)',
    },
    border: {
      light: 'var(--border-light)',
      medium: 'var(--border-medium)',
      focus: 'var(--border-focus)',
    },
    status: {
      success: 'var(--status-success)',
      error: 'var(--status-error)',
      warning: 'var(--status-warning)',
      info: 'var(--status-info)',
    },
  },

  // Typography - Based on komori-aya.com
  typography: {
    fontFamily: {
      // 本文: 英語優先（Lato, Inter）→ 日本語（Zen Kaku Gothic Antique）
      primary: '"Lato", "Inter", "Zen Kaku Gothic Antique", sans-serif',
      // セリフ体: 落ち着いた雰囲気の本文用
      secondary: '"Shippori Antique", "Shippori Antique B1", serif',
      // 見出し: 力強さと読みやすさ（Zen Kaku Gothic Antique優先）
      heading: '"Zen Kaku Gothic Antique", "Lato", sans-serif',
      // ナビゲーション: シンプルで読みやすく（Inter優先）
      navigation: '"Inter", "Zen Kaku Gothic Antique", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px (komori-ayaのh1相当)
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 900,        // 見出し用の重めのウェイト
    },
    lineHeight: {
      tight: 1,          // komori-ayaの基本line-height
      base: 1.4,         // テーブル・リッチテキスト用
      normal: 1.5,
      relaxed: 1.75,
      loose: 1.875,      // h1用 (30px)
    },
    letterSpacing: {
      tight: '-0.01em',
      normal: '0.01em',
      wide: '0.04em',
      wider: '0.08em',
      widest: '0.14em',  // タイトル用
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },

  // Shadows - uses --shadow-alpha CSS variable for theme adaptation
  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, var(--shadow-alpha, 0.04))',
    md: '0 4px 12px -2px rgba(0, 0, 0, calc(var(--shadow-alpha, 0.04) * 1.5)), 0 2px 4px -1px rgba(0, 0, 0, var(--shadow-alpha, 0.04))',
    lg: '0 8px 24px -4px rgba(0, 0, 0, calc(var(--shadow-alpha, 0.04) * 1.75)), 0 4px 8px -2px rgba(0, 0, 0, var(--shadow-alpha, 0.04))',
    xl: '0 16px 32px -6px rgba(0, 0, 0, calc(var(--shadow-alpha, 0.04) * 2)), 0 8px 16px -4px rgba(0, 0, 0, calc(var(--shadow-alpha, 0.04) * 0.75))',
  },

  // Transitions
  transitions: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.4s',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },

  // Layout
  layout: {
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    containerPadding: {
      mobile: '1rem',
      tablet: '2rem',
      desktop: '3rem',
    },
  },
} as const

export type DesignTokens = typeof designTokens
