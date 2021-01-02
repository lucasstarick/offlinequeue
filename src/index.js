import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import './config/reactotron';
import {store, persistor} from './store';

import RepositoryList from './components/RepositoryList';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RepositoryList />
    </PersistGate>
  </Provider>
);

export default App;
