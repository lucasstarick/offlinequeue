import {combineReducers} from 'redux';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {reducer as offline} from 'redux-offline-queue';
import {reducer as repositories} from './repositories';

const config = {
  key: 'Offline',
  storage: AsyncStorage,
};

export default persistCombineReducers(config, {
  offline,
  repositories,
});
