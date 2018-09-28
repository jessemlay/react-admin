import { CHANGE_THEME } from './containers/Settings/actions';

export default (previousState = 'light', { type, payload }) => {
   if (type === CHANGE_THEME) {
      return payload;
   }
   return previousState;
};
