/* generated by ./scripts/generate.ts, do not edit manually */

import React, {ForwardRefRenderFunction, forwardRef} from 'react';
import CloseRoundFilledSVG from '../svg/CloseRoundFilled.svg';
import BaseIcon, {BaseIconProps} from './BaseIcon';

interface IconProps extends Omit<BaseIconProps, 'Icon'> {}

const CloseRoundFilled: ForwardRefRenderFunction<any, IconProps> = (
    props,
    ref,
) => {
  return (
    <BaseIcon {...props} ref={ref} Icon={CloseRoundFilledSVG}/>
  );
};

const CloseRoundFilledIcon = forwardRef(CloseRoundFilled);

export default CloseRoundFilledIcon;
