import {all, spawn, takeEvery} from 'redux-saga/effects';

import {RepositoriesTypes} from '../ducks/repositories';
import {addRepository} from './repositories';

import {startWatchingNetworkConnectivity} from './offline';
import networkStatusSaga from 'react-native-network-status-saga';

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnectivity),
    // spawn(networkStatusSaga),

    takeEvery(RepositoriesTypes.ADD_REPOSITORY_REQUEST, addRepository),
  ]);
}
