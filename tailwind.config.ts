import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        wave: 'wave 1s ease-in-out infinite',
        wave2: 'wave 1s ease-in-out'
      },
      backgroundImage: {
        "azul-gradiente": "linear-gradient(45deg, #0066FF, #0053D1, #0041A4, #003473)",    
        "azul-gradiente2": "linear-gradient(45deg, #003473, #0041A4, #0053D1, #0066FF)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        '3': '3px',
      },
      colors: {
        azulEscuro: '#003473',
        azulClaro: '#0066FF',
        branco: '#FFFFFF',
        cinza: '#D3D3D3',
        // cinza: '#ECEFF4',
        verde: '#00FF7F',
      },
      boxShadow: {
        'global': '0px 0px 5px rgba(0, 0, 0, 0.3)',
      },
      width: {
        '45': '45%',
        'max-250px-50vh': 'max(100px, 19vw)',
        'responsive': 'max(400px, 19vw)',
        'responsiveImg':'min(40px, 8vw)'
      },
      screens:{
        'smallphone': '320px',

        'tablet': '600px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }

        'smartphone': '1px',

        'tablet2': '870px'
      
      },
      fontSize: {
        // '16': '1rem',
        '16': '0.93rem',
        '12': '0.75rem',
        '14': '0.875rem',
      }
    },
  },
  plugins: [],
};
export default config;
