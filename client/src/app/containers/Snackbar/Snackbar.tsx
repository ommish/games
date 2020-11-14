import MuiSnackbar from '@material-ui/core/Snackbar';
import React from 'react';
import {
  CheckCircle,
  ExclamationCircle,
  InfoCircle,
} from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { bg } from 'styles/util';
import { Color } from 'types';
import { useInjectReducer } from 'utils/redux-injectors';
import { selectSnackbar } from './state/selectors';
import { actions, reducer } from './state/slice';

const getIconBySnackbarColor = (type: Color | undefined) => {
  switch (type) {
    case 'primary':
      return CheckCircle;
    case 'error':
      return ExclamationCircle;
    case 'secondary':
      return InfoCircle;
  }
  return null;
};
export const Snackbar: React.FC = () => {
  useInjectReducer({
    key: 'snackbar',
    reducer,
  });
  const { isOpen, className, gameName = null, message } = useSelector(
    selectSnackbar,
  );
  const dispatch = useDispatch();
  const Icon = getIconBySnackbarColor(className);
  return (
    <MuiSnackbar
      color={className}
      open={isOpen}
      autoHideDuration={60000}
      onClose={() => dispatch(actions.hideSnackbar())}
    >
      <div
        className={`rounded w-full h-full flex items-center text-white text-xl ${
          className && gameName ? bg(gameName, className, 'main') : ''
        }`}
      >
        {Icon && <Icon className="ml-6" />}
        <div className="mx-6 py-2 tracking-wide">{message}</div>
      </div>
    </MuiSnackbar>
  );
};
