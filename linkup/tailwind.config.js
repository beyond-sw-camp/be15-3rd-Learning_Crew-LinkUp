/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        serif: ['Pretendard', 'serif'],
        mono: ['Pretendard', 'monospace'],
      },
      colors: {
        background: {
          default: '#F1F3FC',
          surface: '#FFFFFF',
          muted: '#F3F3F3',
          lightDark: '#6B7280',
        },
        primary: {
          default: '#5790FF',
          hover: '#88A0FF',
          active: '#365EC9',
          soft: '#B4C7FF',
          background: '#E8ECFF',
        },
        secondary: {
          default: '#939DC1',
          background: '#DDE8FF',
        },
        accent: {
          blue: '#88A0FF',
          purple: '#939DC1',
          lightBlue: '#B4C7FF',
        },
        warning: {
          default: '#FEB5A1',
          background: '#FFF5F2',
          text: '#FF4714',
        },
        highlight: {
          yellow: '#FFDD00',
        },
        border: {
          subtle: '#E6E6E6',
        },
        text: {
          default: '#1A1A1A',
          subtle: '#6B7280',
          link: '#5790FF',
        },
      },
      fontSize: {
        display: '3rem',
        heading1: '2.25rem',
        heading2: '1.875rem',
        heading3: '1.5rem',
        bodyLg: '1.125rem',
        bodyMd: '1rem',
        bodySm: '0.875rem',
        caption: '0.75rem',
      },
      fontWeight: {
        display: '700',
        heading1: '700',
        heading2: '700',
        heading3: '600',
        bodyLg: '400',
        bodyMd: '400',
        bodySm: '400',
        caption: '400',
      },
      lineHeight: {
        display: '1.2',
        heading1: '1.3',
        heading2: '1.4',
        heading3: '1.5',
        bodyLg: '1.6',
        bodyMd: '1.6',
        bodySm: '1.6',
        caption: '1.4',
      },
      letterSpacing: {
        caption: '0.01em',
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
      backdropBlur: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};
