import { HTMLAttributes, useState, useRef, useEffect } from 'react';

interface IPixiStageAutoresizeWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (args: { width: number; height: number }) => JSX.Element;
}

const PixiStageAutoresizeWrapper = ({
  children,
  ...props
}: IPixiStageAutoresizeWrapperProps): JSX.Element => {
  const [{ width, height }, setDimensions] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setDimensions({ height: rect?.height, width: rect?.width });
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div {...props} ref={ref}>
      {width && height ? children({ width, height }) : null}
    </div>
  );
};

export default PixiStageAutoresizeWrapper;
