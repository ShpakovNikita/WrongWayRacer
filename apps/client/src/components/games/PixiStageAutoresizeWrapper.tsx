import { HTMLAttributes, useState, useEffect, useCallback } from 'react';

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
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      const rect = element?.getBoundingClientRect();
      if (rect) {
        setDimensions({ height: rect?.height, width: rect?.width });
      }
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [element]);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node) {
      setElement(node);
    }
  }, []);

  return (
    <div {...props} ref={ref}>
      {width && height ? children({ width, height }) : null}
    </div>
  );
};

export default PixiStageAutoresizeWrapper;
