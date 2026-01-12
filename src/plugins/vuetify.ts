import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { designTokens } from '../styles/designTokens'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          background: designTokens.colors.background.main,
          surface: designTokens.colors.background.card,
          primary: designTokens.colors.accent.primary,
          secondary: designTokens.colors.accent.secondary,
          error: designTokens.colors.status.error,
          info: designTokens.colors.status.info,
          success: designTokens.colors.status.success,
          warning: designTokens.colors.status.warning,
        },
      },
    },
  },
  defaults: {
    VBtn: {
      style: [
        {
          textTransform: 'none',
          letterSpacing: designTokens.typography.letterSpacing.normal,
          fontWeight: designTokens.typography.fontWeight.medium,
          transition: `all ${designTokens.transitions.duration.normal} ${designTokens.transitions.easing.easeInOut}`,
        },
      ],
    },
    VCard: {
      elevation: 0,
      style: [
        {
          borderRadius: designTokens.borderRadius.lg,
          border: `1px solid ${designTokens.colors.border.light}`,
          transition: `all ${designTokens.transitions.duration.normal} ${designTokens.transitions.easing.easeInOut}`,
        },
      ],
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      style: [
        {
          borderRadius: designTokens.borderRadius.md,
        },
      ],
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
      style: [
        {
          borderRadius: designTokens.borderRadius.md,
        },
      ],
    },
  },
})
