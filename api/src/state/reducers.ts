import { combineReducers } from 'redux';
import { DesertAdventureReducer } from '../desert-adventure/reducer';
import { DixthisReducer } from '../dixthis/reducer';

export const reducers = combineReducers({
  dixthis: DixthisReducer,
  desertAdventure: DesertAdventureReducer,
});
