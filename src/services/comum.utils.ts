import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowWidth;
}

export function darkMode() {
  // const [mode, setMode] = useState<string | null>('');
  const setMode = localStorage.getItem('DarkMode');

  // setMode(modeGetLocalStorage); //pegando o mode aqui
  return setMode;
}
