import {put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import {OFFLINE, ONLINE} from 'redux-offline-queue';

export function* startWatchingNetworkConnectivity() {
  const channel = eventChannel((emitter) => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      let allowConnection = state.isConnected;

      emitter(allowConnection);
    });
    return () => unsubscribe();
  });

  try {
    for (;;) {
      const isConnected = yield take(channel);

      if (isConnected) {
        yield put({type: ONLINE});
      } else {
        yield put({type: OFFLINE});
      }
    }
  } finally {
    channel.close();
  }
}
