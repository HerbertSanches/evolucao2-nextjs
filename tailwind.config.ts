import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
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
        verde: '#00FF7F',
      },
      boxShadow: {
        'global': '5px 5px 5px 5px rgba(0, 0, 0, 0.1 )',
      },
      width: {
        '45': '45%',
      },
    },
  },
  plugins: [],
};
export default config;
