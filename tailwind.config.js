/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240, 10%, 4%)',
        text: 'hsl(0, 0%, 98%)',
        'text-muted': 'hsl(240, 5%, 64%)',
        primary: 'hsl(262, 83%, 58%)',
        'primary-hover': 'hsl(262, 83%, 52%)',
        accent: 'hsl(142, 76%, 45%)',
        'accent-hover': 'hsl(142, 76%, 38%)',
        surface: 'hsl(240, 6%, 10%)',
        'surface-hover': 'hsl(240, 6%, 14%)',
        border: 'hsl(240, 6%, 18%)',
        success: 'hsl(142, 76%, 45%)',
        warning: 'hsl(45, 93%, 47%)',
        error: 'hsl(0, 84%, 60%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
        'xxl': '48px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(240, 10%, 3%, 0.12)',
        'elevated': '0 16px 48px hsla(240, 10%, 3%, 0.18)',
        'glow': '0 0 32px hsla(262, 83%, 58%, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scaleIn 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}