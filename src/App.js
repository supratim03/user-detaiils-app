import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store';
import { Provider } from 'react-redux';
import AppRoot from './AppRoot/AppRoot';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRoot />
      </ConnectedRouter>
    </Provider >
  );
}

export default App;
