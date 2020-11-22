/* generated by ./scripts/generate.ts, do not edit manually */

import React, {ForwardRefRenderFunction, forwardRef} from 'react';
import CloseSVG from '../svg/Close.svg';
import BaseIcon, {BaseIconProps} from './BaseIcon';

interface IconProps extends Omit<BaseIconProps, 'Icon'> {}

const Close: ForwardRefRenderFunction<any, IconProps> = (
    props,
    ref,
) => {
  return (
    <BaseIcon {...props} ref={ref} Icon={CloseSVG}/>
  );
};

const CloseIcon = forwardRef(Close);

export default CloseIcon;