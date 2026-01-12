/**
 * Design Tokens
 * Based on the aesthetic of komori-aya.com
 * A warm, natural, and professional design system
 */

export const designTokens = {
  // Color Palette
  colors: {
    // Primary colors - warm beige tones
    background: {
      main: '#fbf7f0',      // Warm beige background
      card: '#ffffff',      // White card background
      hover: '#f6f6f6',     // Light gray for hover states
      input: '#ffffff',     // Input field background
    },
    text: {
      primary: '#423e3e',   // Deep gray for main text
      secondary: '#6b6766', // Medium gray for secondary text
      disabled: '#a8a4a3',  // Light gray for disabled text
    },
    accent: {
      primary: '#d4b5a0',   // Warm dusty rose
      secondary: '#e8d5c4', // Light warm beige
      hover: '#f2eee5',     // Very light beige for tag hover
    },
    border: {
      light: '#e8e4df',     // Light border
      medium: '#d4cfc9',    // Medium border
      focus: '#d4b5a0',     // Focus state border (accent)
    },
    status: {
      success: '#7c9e7a',   // Muted green
      error: '#c87c7c',     // Muted red
      warning: '#d4a574',   // Muted orange
      info: '#7b9eb8',      // Muted blue
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '"Noto Sans JP", "Zen Kaku Gothic Antique", sans-serif',
      secondary: '"Shippori Antique", "Noto Serif JP", serif',
      heading: '"Zen Kaku Gothic Antique", "Noto Sans JP", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
      wider: '0.05em',
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
