/**
 * Design Tokens
 * Based on the aesthetic of komori-aya.com
 * A warm, natural, and professional design system
 */

export const designTokens = {
  // Color Palette
  colors: {
    // Primary colors - light blue tones
    background: {
      main: '#e7f0f7',      // Very light blue background
      card: '#ffffff',      // White card background
      hover: '#f0f6fa',     // Even lighter blue for hover states
      input: '#ffffff',     // Input field background
    },
    text: {
      primary: '#2c3e50',   // Deep blue-gray for main text
      secondary: '#5a6c7d', // Medium blue-gray for secondary text
      disabled: '#95a5b3',  // Light blue-gray for disabled text
    },
    accent: {
      primary: '#52372d',   // Brown (accent color) (82, 55, 45)
      secondary: '#a68a7b', // Light brown (secondary accent)
      hover: '#d9cdc5',     // Very light brown for tag hover
    },
    border: {
      light: '#d9e8f2',     // Light blue border
      medium: '#b8d0e0',    // Medium blue border
      focus: '#52372d',     // Focus state border (brown accent)
    },
    status: {
      success: '#6ba572',   // Muted green
      error: '#c87c7c',     // Muted red
      warning: '#d4a574',   // Muted orange
      info: '#5a9ab8',      // Blue for info (matching accent)
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
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
      wider: '0.05em',
      widest: '2.45px',  // タイトル用（komori-ayaと同じ）
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

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(66, 62, 62, 0.05)',
    md: '0 4px 6px -1px rgba(66, 62, 62, 0.08), 0 2px 4px -1px rgba(66, 62, 62, 0.06)',
    lg: '0 10px 15px -3px rgba(66, 62, 62, 0.08), 0 4px 6px -2px rgba(66, 62, 62, 0.05)',
    xl: '0 20px 25px -5px rgba(66, 62, 62, 0.08), 0 10px 10px -5px rgba(66, 62, 62, 0.04)',
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
