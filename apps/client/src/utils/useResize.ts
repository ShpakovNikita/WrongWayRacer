import { useEffect, useState } from 'react';

const useResize = (): { width: number; height: number } => {
  if (typeof window === 'undefined') {
    return { width: 1920, height: 1080 };
  }

  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const onResize = () => {
      requestAnimationFrame(() => {
        setSize([window.innerWidth, window.innerHeight]);
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { width: size[0], height: size[1] };
};

export { useResize };
