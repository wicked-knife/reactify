import React, {
  HTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
  createContext,
  ForwardRefExoticComponent,
  useState,
  FunctionComponentElement,
  ReactElement,
} from "react";
import useClassNames from "classnames";
import MenuItem, { MenuItemProps } from "./item";
import SubMenu, { SubMenuProps } from "./sub-menu";
import "./menu.scss";

interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  mode?: "vertical" | "horizontal";
  defaultSelectedKey?: string | number;
}

interface MenuInterface extends ForwardRefExoticComponent<MenuProps> {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
}

interface MenuContext {
  mode: "vertical" | "horizontal";
  selectedKey: number | string;
  setSelectedKey: React.Dispatch<number | string>;
}

type MenuChild =
  | FunctionComponentElement<MenuItemProps>
  | FunctionComponentElement<SubMenuProps>;

export const MenuContext = createContext<MenuContext>({
  mode: "vertical",
  selectedKey: 0,
  setSelectedKey: () => {},
});

const BaseMenu: ForwardRefRenderFunction<any, MenuProps> = (
  { mode, className, children, defaultSelectedKey },
  ref
) => {
  const [selectedKey, setSelectedKey] = useState(
    mode === "vertical" ? defaultSelectedKey! : -1
  );

  const computedClassNames = useClassNames("rf-menu", `is-${mode}`, className);

  const initialContextValue: MenuContext = {
    mode: mode!,
    selectedKey: selectedKey,
    setSelectedKey: setSelectedKey,
  };

  let menuCount = -1;

  const renderChildren = () => {
    const validDisplayName = ["SubMenu", "MenuItem"];
    return React.Children.map(children, (child, index) => {
      const childElement = child as MenuChild;
      if (
        !childElement.type ||
        !childElement.type.displayName ||
        !validDisplayName.includes(childElement.type.displayName)
      ) {
        return console.error(
          "Warning: Menu component child should be Menu.SubMenu or Menu.Item"
        );
      }
      const { displayName } = childElement.type;
      if (validDisplayName.includes(displayName)) {
        if (displayName === "MenuItem") {
          menuCount++;
          return React.cloneElement(childElement as ReactElement, {
            menuIndex: menuCount,
          });
        }
        if (displayName === "SubMenu") {
          return React.cloneElement(
            childElement as ReactElement,
            undefined,
            React.Children.map(
              childElement.props.children,
              (_child, _index) => {
                const subMenuChild = _child as MenuChild;
                if (subMenuChild.type.displayName === "MenuItem") {
                  menuCount++;
                  return React.cloneElement(subMenuChild as ReactElement, {
                    menuIndex: menuCount,
                  });
                }
                return subMenuChild;
              }
            )
          );
        }
      }
    });
  };

  return (
    <MenuContext.Provider value={initialContextValue}>
      <ul className={computedClassNames} ref={ref}>
        {renderChildren()}
      </ul>
    </MenuContext.Provider>
  );
};

const Menu: MenuInterface = Object.assign(forwardRef(BaseMenu), {
  Item: MenuItem,
  SubMenu,
});

Menu.defaultProps = {
  mode: "vertical",
  defaultSelectedKey: 0,
};

export default Menu;
