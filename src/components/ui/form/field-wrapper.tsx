import * as React from 'react';
import { type FieldError } from 'react-hook-form';

import { Error } from './error';
import { Label } from './label';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  button?: React.ReactNode;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, button, error, children } = props;
  return (
    <div className={className}>
      <Label>
        <div className="flex flex-row justify-between">
          {label} {button}
        </div>
        <div className="mt-2">{children}</div>
      </Label>
      <Error errorMessage={error?.message} />
    </div>
  );
};
