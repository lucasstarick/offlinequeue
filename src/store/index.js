import {createStore, applyMiddleware, compose} from 'redux';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './ducks';
import rootSaga from './sagas';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const persistConfig = {
  key: 'Offline',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
);

let persistor = persistStore(store);

// const store = createAppropriateStore(
//   rootReducer,
//   applyMiddleware(...middlewares),
// );

sagaMiddleware.run(rootSaga);

export {store, persistor};
