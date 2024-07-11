import { configureStore } from '@reduxjs/toolkit';

import { deliveryReducer } from './deliverySlice';
import { materialsReducer } from './materialsSlice';
import { movingReducer } from './movingSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      delivery: deliveryReducer,
      categories: materialsReducer,
      moving: movingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
