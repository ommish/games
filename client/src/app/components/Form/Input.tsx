import { TextField, Tooltip } from '@material-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';

type Props = {
  name: string;
  label: string;
  className?: string;
  tooltip?: string;
};

export const Input: React.FC<
  Props & InputHTMLAttributes<HTMLInputElement>
> = props => {
  const [input, meta] = useField(props);
  return (
    <div className={`my-4 ${props.className || ''}`}>
      <TextField
        {...input}
        {...props}
        variant="outlined"
        color="primary"
        size="small"
        error={meta.touched && !!meta.error}
        InputProps={{
          endAdornment: props.tooltip && (
            <Tooltip title={props.tooltip}>
              <InfoCircle />
            </Tooltip>
          ),
        }}
      />
      <div className="input-error-message">
        {meta.touched && meta.error ? meta.error : null}
      </div>
    </div>
  );
};
