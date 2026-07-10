tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:       '#211B10',   // primary text / headings (deep olive-espresso)
        bg:        '#FBFAF7',   // page background (warm ivory)
        card:      '#F3EEDE',   // section / card background (parchment)
        gold:      '#A9761D',   // primary brand accent — true antique gold
        goldlight: '#E7C179',   // warm champagne-gold, for text/accents on dark backgrounds
        wine:      '#7A1F1B',   // CTA / secondary accent (deep maroon)
        stone:     '#6E6852',   // muted secondary text (warm olive-gray)
        line:      '#E4DECC',   // hairline borders
        sage:      '#E7C179'    // (legacy token, now aliased to champagne-gold for consistency)
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        script:  ['"Dancing Script"', 'cursive'],
        body: ['Inter', 'sans-serif'],
        logo: ['"Alex Brush"', 'cursive']
      },
      keyframes: {
        emberFloat: {
          '0%':   { transform: 'translateY(0) translateX(0)', opacity: 0 },
          '10%':  { opacity: 0.8 },
          '90%':  { opacity: 0.35 },
          '100%': { transform: 'translateY(-100vh) translateX(24px)', opacity: 0 }
        },
        loaderSweep: {
          '0%':   { left: '-40%' },
          '100%': { left: '100%' }
        },
        pulseDot: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(184,137,43,0.45)' },
          '50%':      { opacity: 0.6, boxShadow: '0 0 0 5px rgba(184,137,43,0)' }
        },
        pinFloat: {
          '0%, 100%': { transform: 'rotate(-45deg) translateY(0)' },
          '50%':      { transform: 'rotate(-45deg) translateY(-8px)' }
        },
        scrollPulse: {
          '0%, 100%': { opacity: 0.25 },
          '50%':      { opacity: 1 }
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' }
        }
      },
      animation: {
        ember: 'emberFloat linear infinite',
        loaderSweep: 'loaderSweep 1.1s ease-in-out infinite',
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        pinFloat: 'pinFloat 3s ease-in-out infinite',
        scrollPulse: 'scrollPulse 2s ease-in-out infinite',
        kenBurns: 'kenBurns 8s ease-out forwards'
      }
    }
  }
}
