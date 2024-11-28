import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/helpers/cn';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    classNameParent?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNameParent,
      type,
      label,
      error,
      onChange,
      registration,
      ...props
    },
    ref,
  ) => {
    return (
      <FieldWrapper label={label} error={error} className={classNameParent}>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-gray-400 bg-gray-50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-black',
            className,
          )}
          ref={ref}
          onChange={(e) => {
            registration?.onChange?.(e);
            onChange?.(e);
          }}
          {...registration}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
Input.displayName = 'Input';

export { Input };
