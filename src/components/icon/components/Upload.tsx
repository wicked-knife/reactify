/* generated by ./scripts/generate.ts, do not edit manually */

import React, { ForwardRefRenderFunction, forwardRef } from 'react'
import {ReactComponent as UploadSVG} from '../svg/Upload.svg'
import BaseIcon, {BaseIconProps} from './BaseIcon'

interface IconProps extends Omit<BaseIconProps, 'Icon'> {}

const Upload: ForwardRefRenderFunction<any, IconProps> = (
  props,
  ref
) => {
  return (
    <BaseIcon {...props} ref={ref} Icon={UploadSVG}/>
  )
}

const UploadIcon = forwardRef(Upload)

export default UploadIcon
