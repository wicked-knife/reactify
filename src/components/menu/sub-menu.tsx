import React, {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useRef,
  FunctionComponentElement,
} from 'react';
import {ArrowUp} from '../icon';
import useClassnames from 'classnames';
import {MenuContext} from './index';
import {CSSTransition} from 'react-transition-group';
import {MenuItemProps} from './item';
export interface SubMenuProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string | ReactNode
  icon?: ReactNode
  defaultOpen?: boolean
}

type SubMenuChild = FunctionComponentElement<MenuItemProps>

const BaseSubMenu: ForwardRefRenderFunction<any, SubMenuProps> = (
    {title, icon, defaultOpen, className, children},
    ref,
) => {
  const {mode} = useContext(MenuContext);

  const computedClassnames = useClassnames('rf-sub-menu', className);

  const [open, setOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const nodeRef = useRef(null);

  const renderChildren = () => {
    const validDisplayName = 'MenuItem';
    return React.Children.map(children, (child, index) => {
      const childElement = (child as SubMenuChild);
      if (!childElement.type ||
         !childElement.type.displayName ||
          childElement.type.displayName !== validDisplayName) {
        return console.warn('Warning: Menu.SubMenu component child should be Menu.Item');
      }
      if (childElement.type.displayName === validDisplayName) {
        return child;
      }
    });
  };


  const verticalProps = mode === 'vertical' ? {onClick: toggleOpen} : {};
  const horizontalProps = mode === 'horizontal' ? {
    onMouseLeave: () => setOpen(false),
    onMouseEnter: () => setOpen(true),
  } : {};

  return (
    <div className={computedClassnames} ref={ref} {...horizontalProps}>
      <div className='menu-subtitle' {...verticalProps}>
        {icon && <div className='icon-wrapper'>{icon}</div>}
        {title}
        {mode === 'vertical' && (
          <div className={`menu-arrow ${open ? 'is-open' : ''}`}>
            <ArrowUp className='icon-arrow_down' size="18" />
          </div>
        )}
      </div>
      <CSSTransition
        timeout={300}
        classNames='menu'
        in={open}
        nodeRef={nodeRef}
        unmountOnExit>
        <ul ref={nodeRef} className={`menu-item-list ${mode === 'horizontal' ? 'box-shadow' : ''}`}>
          {renderChildren()}
        </ul>
      </CSSTransition>
    </div>
  );
};

const SubMenu = forwardRef(BaseSubMenu);

SubMenu.defaultProps = {
  title: '',
  defaultOpen: false,
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
