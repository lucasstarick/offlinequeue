import {createStore, applyMiddleware, compose} from 'redux';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './ducks';
import rootSaga from './sagas';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;

// const store = createAppropriateStore(
//   rootReducer,
//   applyMiddleware(...middlewares),
// );

const persistConfig = {
  key: 'Offline',
  storage: AsyncStorage,
  version: 1,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = applyMiddleware(...middlewares)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

// const persistor = persistStore(store);
// export {persistor};
export default store;
