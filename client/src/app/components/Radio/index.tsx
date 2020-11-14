import React, { memo } from 'react';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends InputProps {
  id: string;
  label: string;
  className?: string;
  isSelected?: boolean;
}

export const Radio = memo(
  ({ id, label, className, isSelected, ...restOf }: Props) => {
    return (
      <div className={className}>
        <input type="radio" id={id} checked={isSelected} {...restOf} />
        <label className="ml-2" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  },
);
