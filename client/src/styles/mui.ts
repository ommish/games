import blueGray from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from '@material-ui/core/styles';
import appTheme from './theme';

function makeColors() {
  // TODO- fix types when I'm not so lazy
  const colors: any = {};
  Object.keys(appTheme.colors.main).forEach(cat => {
    colors[cat] = appTheme.colors.main[cat];
  });
  Object.keys(appTheme.colors.dixthis).forEach(cat => {
    colors[`dixthis-${cat}`] = appTheme.colors.dixthis[cat];
  });
  Object.keys(appTheme.colors.desert).forEach(cat => {
    colors[`desert-${cat}`] = appTheme.colors.desert[cat];
  });
  return colors;
}

const colors = makeColors();

export const theme = createMuiTheme({
  palette: {
    ...colors.main,
    grey: blueGray,
  },
  typography: {
    fontFamily: 'Catamaran',
  },
  overrides: {
    MuiSnackbar: {
      root: {
        borderRadius: '4px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      },
    },
    MuiInputBase: {
      input: {
        background: 'white',
      },
    },
    MuiSwitch: {
      switchBase: {
        color: colors.error.dark,
        '&$checked': {
          color: colors.secondary.light,
        },
        '&$checked + $track': {
          backgroundColor: colors.grey.light,
          opacity: 0.7,
        },
      },
      checked: {},
      track: {
        backgroundColor: colors.grey.light,
        opacity: 0.7,
      },
    },
    MuiDialog: {
      paper: {
        padding: '24px',
      },
    },
  },
});
