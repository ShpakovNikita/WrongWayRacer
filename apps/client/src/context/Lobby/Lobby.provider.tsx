import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { LobbyStore } from './Lobby.store';

const StoreContext = createContext<LobbyStore | null>(null);

/**
 * Component wrapper for providing Mobx LobbyStore context
 * @param children: ReactNode
 */
const LobbyStoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // init store
  const store = LobbyStore.store;

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

/**
 * React hook to return LobbyStore from our StoreContext
 * Note: we must use it inside components, which are wrapped in LobbyStoreProvider
 */
const useLobbyStore = (): LobbyStore => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error('useLobbyStore must be used within LobbyStoreProvider');
  }

  return context;
};

export { useLobbyStore, LobbyStoreProvider };
