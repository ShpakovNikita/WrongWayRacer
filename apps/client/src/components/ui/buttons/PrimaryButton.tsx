import * as React from 'react';
import { classNames } from '@/utils/classNames';
import { ButtonUnstyledOwnerState, ButtonUnstyledProps, ButtonUnstyled } from '@mui/base';

const mapSizeToStyle = {
  sm: 'px-2 py-1',
  md: 'px-4 py-2',
  lg: 'px-6 py-3'
};

/**
 * MUI Styled button wrapper, that applies our game styling to MUI Base button.
 * @param size?: 'sm' | 'md' | 'lg' - button size styling
 * @param props: MUI ButtonUnstyledProps
 */
const PrimaryButton = React.forwardRef(function Button(
  { size, ...props }: ButtonUnstyledProps & { size?: 'sm' | 'md' | 'lg' },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonUnstyled
      {...props}
      slotProps={{
        root: (state: ButtonUnstyledOwnerState) => ({
          className: classNames(
            mapSizeToStyle[size ?? 'md'],
            'rounded-md items-center transition-colors',
            state.focusVisible ? 'outline-0 ring-2 ring-cyan-500' : '',
            state.disabled
              ? 'text-gray-700 font-bold border-purple-700 border-4 bg-purple-800'
              : 'hover:text-gray-200 hover:bg-purple-700 font-bold border-purple-600 border-4 bg-purple-800'
          )
        })
      }}
      ref={ref}
    />
  );
});

export default PrimaryButton;
