import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import WrongWayRacerStore from './WrongWayRacer.store';

const StoreContext = createContext<WrongWayRacerStore | null>(null);

/**
 * Component wrapper for providing Mobx WrongWayRacerStore context
 * @param children: ReactNode
 */
const WrongWayRacerStoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // init store
  const store = WrongWayRacerStore.store;

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

/**
 * React hook to return WrongWayRacerStore from our StoreContext
 * Note: we must use it inside components, which are wrapped in WrongWayRacerStoreProvider
 */
const useWrongWayRacerStore = (): WrongWayRacerStore => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error('useWrongWayRacerStore must be used within WrongWayRacerStoreProvider');
  }

  return context;
};

export { useWrongWayRacerStore, WrongWayRacerStoreProvider };
