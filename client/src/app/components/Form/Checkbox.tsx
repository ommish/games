import { Checkbox as MuiCheckbox, Tooltip } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import { InfoCircle } from 'react-bootstrap-icons';

type Props = {
  name: string;
  label: string;
  className?: string;
  tooltip?: string;
};

export const Checkbox: React.FC<Props> = props => {
  // eslint-disable-next-line
  const [input, meta, helpers] = useField(props);
  return (
    <div className={`my-4 ${props.className || ''}`}>
      {props.label}
      <MuiCheckbox
        checked={input.value}
        onChange={e => helpers.setValue(e.target.checked)}
        onBlur={input.onBlur}
        color="primary"
        size="small"
      />
      {props.tooltip && (
        <Tooltip title={props.tooltip}>
          <InfoCircle className="inline" />
        </Tooltip>
      )}
    </div>
  );
};
