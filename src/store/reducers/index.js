import { combineReducers } from 'redux';
import realestatesReducer from './realestatesReducer';

export const rootReducer = combineReducers({
    realestates: realestatesReducer,
});