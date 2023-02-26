import { useEffect, useState } from 'react';

const useResize = (): { width: number; height: number } => {
  const [size, setSize] = useState([window?.innerWidth ?? 1920, window?.innerHeight ?? 1080]);

  useEffect(() => {
    const onResize = () => {
      requestAnimationFrame(() => {
        setSize([window?.innerWidth, window?.innerHeight]);
      });
    };

    window?.addEventListener('resize', onResize);

    return () => {
      window?.removeEventListener('resize', onResize);
    };
  }, []);

  return { width: size[0], height: size[1] };
};

export { useResize };
