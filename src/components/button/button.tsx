import React from "react";
import useClassNames from "classnames";

type ButtonType = "default" | "primary" | "danger" | "link" | "text";

interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  className,
  children,
}) => {
  const computedClassNames = useClassNames(
    {
      "rf-btn": true,
      [`rf-btn-${type}`]: type ? true : false,
      "rf-btn-disabled": disabled,
    },
    className
  );

  return <button className={computedClassNames}>{children}</button>;
};

Button.defaultProps = {
  disabled: false,
  type: "primary",
};

export default Button;
