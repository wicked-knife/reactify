import React, {
  ForwardRefRenderFunction,
  forwardRef,
  SVGProps,
} from 'react';
import useClassNames from 'classnames';

export interface BaseIconProps extends SVGProps<SVGElement> {
  color?: string;
  size?: number | string;
  className?: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}

const BaseIcon: ForwardRefRenderFunction<any, BaseIconProps> = (
    {color, size, className, Icon, ...props},
    ref,
) => {
  const computedClassNames = useClassNames('iconfont', 'rf-icon', className);
  const attrs = {
    width: size,
    height: size,
    fill: color,
  };
  return (
    <Icon className={computedClassNames} {...props} {...attrs} ref={ref} />
  );
};

const Icon = forwardRef(BaseIcon);

Icon.defaultProps = {
  size: 16,
};

export default Icon;
