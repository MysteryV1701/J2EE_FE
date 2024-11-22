import React, { forwardRef } from 'react';
import { VariantProps } from 'tailwind-variants';
import {
  filledButton,
  ghostButton,
  outlinedButton,
  textButton,
} from './button-styled';
import { Spinner } from '../spinner';
type BaseButtonAttributes = React.ComponentPropsWithoutRef<'button'>;
type Ref = HTMLButtonElement;

export interface ButtonProps extends BaseButtonAttributes {
  isLoading?: boolean;
  disable?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  buttonStyled?: VariantProps<
    | typeof filledButton
    | typeof outlinedButton
    | typeof ghostButton
    | typeof textButton
  >;
  buttonVariant?: 'filled' | 'outlined' | 'text' | 'ghost';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    type,
    children,
    buttonStyled,
    buttonVariant = 'filled',
    disable,
    isLoading,
    className,
    title,
    leftIcon,
    rightIcon,
    onClick,
    ...rest
  } = props;

  const renderButtonVariant = () => {
    switch (buttonVariant) {
      case 'filled':
        return filledButton({ ...buttonStyled, className });
      case 'outlined':
        return outlinedButton({ ...buttonStyled, className });
      case 'text':
        return textButton({ ...buttonStyled, className });
      case 'ghost':
        return ghostButton({ ...buttonStyled, className });
    }
  };
  return (
    <button
      className={renderButtonVariant()}
      {...rest}
      onClick={onClick}
      ref={ref}
      type={type ? 'submit' : 'button'}
      disabled={disable || isLoading}
      title={title}
    >
      {leftIcon}
      {isLoading && <Spinner size="md" />}
      {!isLoading && children}
      {rightIcon}
    </button>
  );
});

export default Button;
