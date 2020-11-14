import { Color, GameName, Shade } from 'types';

export function bg(gameName: GameName | null, color: Color, shade: Shade) {
  switch (gameName) {
    case null:
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'bg-primary-extraLight';
            case 'light':
              return 'bg-primary-light';
            case 'main':
              return 'bg-primary-main';
            case 'dark':
              return 'bg-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'bg-secondary-extraLight';
            case 'light':
              return 'bg-secondary-light';
            case 'main':
              return 'bg-secondary-main';
            case 'dark':
              return 'bg-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'bg-grey-extraLight';
            case 'light':
              return 'bg-grey-light';
            case 'main':
              return 'bg-grey-main';
            case 'dark':
              return 'bg-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'bg-error-extraLight';
            case 'light':
              return 'bg-error-light';
            case 'main':
              return 'bg-error-main';
            case 'dark':
              return 'bg-error-dark';
          }
          break;
      }
      break;
    case 'dixthis':
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'bg-dixthis-primary-extraLight';
            case 'light':
              return 'bg-dixthis-primary-light';
            case 'main':
              return 'bg-dixthis-primary-main';
            case 'dark':
              return 'bg-dixthis-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'bg-dixthis-secondary-extraLight';
            case 'light':
              return 'bg-dixthis-secondary-light';
            case 'main':
              return 'bg-dixthis-secondary-main';
            case 'dark':
              return 'bg-dixthis-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'bg-dixthis-grey-extraLight';
            case 'light':
              return 'bg-dixthis-grey-light';
            case 'main':
              return 'bg-dixthis-grey-main';
            case 'dark':
              return 'bg-dixthis-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'bg-dixthis-error-extraLight';
            case 'light':
              return 'bg-dixthis-error-light';
            case 'main':
              return 'bg-dixthis-error-main';
            case 'dark':
              return 'bg-dixthis-error-dark';
          }
          break;
      }
      break;
    case 'desert-adventure':
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'bg-desert-primary-extraLight';
            case 'light':
              return 'bg-desert-primary-light';
            case 'main':
              return 'bg-desert-primary-main';
            case 'dark':
              return 'bg-desert-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'bg-desert-secondary-extraLight';
            case 'light':
              return 'bg-desert-secondary-light';
            case 'main':
              return 'bg-desert-secondary-main';
            case 'dark':
              return 'bg-desert-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'bg-desert-grey-extraLight';
            case 'light':
              return 'bg-desert-grey-light';
            case 'main':
              return 'bg-desert-grey-main';
            case 'dark':
              return 'bg-desert-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'bg-desert-error-extraLight';
            case 'light':
              return 'bg-desert-error-light';
            case 'main':
              return 'bg-desert-error-main';
            case 'dark':
              return 'bg-desert-error-dark';
          }
          break;
      }
      break;
  }
}

export function text(gameName: GameName | null, color: Color, shade: Shade) {
  switch (gameName) {
    case null:
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'text-primary-extraLight';
            case 'light':
              return 'text-primary-light';
            case 'main':
              return 'text-primary-main';
            case 'dark':
              return 'text-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'text-secondary-extraLight';
            case 'light':
              return 'text-secondary-light';
            case 'main':
              return 'text-secondary-main';
            case 'dark':
              return 'text-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'text-grey-extraLight';
            case 'light':
              return 'text-grey-light';
            case 'main':
              return 'text-grey-main';
            case 'dark':
              return 'text-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'text-error-extraLight';
            case 'light':
              return 'text-error-light';
            case 'main':
              return 'text-error-main';
            case 'dark':
              return 'text-error-dark';
          }
          break;
      }
      break;
    case 'dixthis':
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'text-dixthis-primary-extraLight';
            case 'light':
              return 'text-dixthis-primary-light';
            case 'main':
              return 'text-dixthis-primary-main';
            case 'dark':
              return 'text-dixthis-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'text-dixthis-secondary-extraLight';
            case 'light':
              return 'text-dixthis-secondary-light';
            case 'main':
              return 'text-dixthis-secondary-main';
            case 'dark':
              return 'text-dixthis-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'text-dixthis-grey-extraLight';
            case 'light':
              return 'text-dixthis-grey-light';
            case 'main':
              return 'text-dixthis-grey-main';
            case 'dark':
              return 'text-dixthis-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'text-dixthis-error-extraLight';
            case 'light':
              return 'text-dixthis-error-light';
            case 'main':
              return 'text-dixthis-error-main';
            case 'dark':
              return 'text-dixthis-error-dark';
          }
          break;
      }
      break;
    case 'desert-adventure':
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'text-desert-primary-extraLight';
            case 'light':
              return 'text-desert-primary-light';
            case 'main':
              return 'text-desert-primary-main';
            case 'dark':
              return 'text-desert-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'text-desert-secondary-extraLight';
            case 'light':
              return 'text-desert-secondary-light';
            case 'main':
              return 'text-desert-secondary-main';
            case 'dark':
              return 'text-desert-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'text-desert-grey-extraLight';
            case 'light':
              return 'text-desert-grey-light';
            case 'main':
              return 'text-desert-grey-main';
            case 'dark':
              return 'text-desert-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'text-desert-error-extraLight';
            case 'light':
              return 'text-desert-error-light';
            case 'main':
              return 'text-desert-error-main';
            case 'dark':
              return 'text-desert-error-dark';
          }
          break;
      }
      break;
  }
}

export function border(gameName: GameName | null, color: Color, shade: Shade) {
  switch (gameName) {
    case null:
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'border-primary-extraLight';
            case 'light':
              return 'border-primary-light';
            case 'main':
              return 'border-primary-main';
            case 'dark':
              return 'border-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'border-secondary-extraLight';
            case 'light':
              return 'border-secondary-light';
            case 'main':
              return 'border-secondary-main';
            case 'dark':
              return 'border-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'border-grey-extraLight';
            case 'light':
              return 'border-grey-light';
            case 'main':
              return 'border-grey-main';
            case 'dark':
              return 'border-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'border-error-extraLight';
            case 'light':
              return 'border-error-light';
            case 'main':
              return 'border-error-main';
            case 'dark':
              return 'border-error-dark';
          }
          break;
      }
      break;
    case 'dixthis':
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'border-dixthis-primary-extraLight';
            case 'light':
              return 'border-dixthis-primary-light';
            case 'main':
              return 'border-dixthis-primary-main';
            case 'dark':
              return 'border-dixthis-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'border-dixthis-secondary-extraLight';
            case 'light':
              return 'border-dixthis-secondary-light';
            case 'main':
              return 'border-dixthis-secondary-main';
            case 'dark':
              return 'border-dixthis-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'border-dixthis-grey-extraLight';
            case 'light':
              return 'border-dixthis-grey-light';
            case 'main':
              return 'border-dixthis-grey-main';
            case 'dark':
              return 'border-dixthis-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'border-dixthis-error-extraLight';
            case 'light':
              return 'border-dixthis-error-light';
            case 'main':
              return 'border-dixthis-error-main';
            case 'dark':
              return 'border-dixthis-error-dark';
          }
          break;
      }
      break;
    case 'desert-adventure':
      switch (color) {
        case 'primary':
          switch (shade) {
            case 'extraLight':
              return 'border-desert-primary-extraLight';
            case 'light':
              return 'border-desert-primary-light';
            case 'main':
              return 'border-desert-primary-main';
            case 'dark':
              return 'border-desert-primary-dark';
          }
          break;
        case 'secondary':
          switch (shade) {
            case 'extraLight':
              return 'border-desert-secondary-extraLight';
            case 'light':
              return 'border-desert-secondary-light';
            case 'main':
              return 'border-desert-secondary-main';
            case 'dark':
              return 'border-desert-secondary-dark';
          }
          break;
        case 'grey':
          switch (shade) {
            case 'extraLight':
              return 'border-desert-grey-extraLight';
            case 'light':
              return 'border-desert-grey-light';
            case 'main':
              return 'border-desert-grey-main';
            case 'dark':
              return 'border-desert-grey-dark';
          }
          break;
        case 'error':
          switch (shade) {
            case 'extraLight':
              return 'border-desert-error-extraLight';
            case 'light':
              return 'border-desert-error-light';
            case 'main':
              return 'border-desert-error-main';
            case 'dark':
              return 'border-desert-error-dark';
          }
          break;
      }
      break;
  }
}
