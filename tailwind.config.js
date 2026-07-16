/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'Rajdhani', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: '#070a12',
        panel: '#0d1424',
        neon: '#31f7c7',
        magenta: '#ff3cf7',
        amber: '#ffcc66',
      },
      boxShadow: {
        neon: '0 0 22px rgba(49, 247, 199, 0.28)',
        magenta: '0 0 22px rgba(255, 60, 247, 0.22)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(49,247,199,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(49,247,199,.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
