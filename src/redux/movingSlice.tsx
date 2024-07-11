import { createSlice } from '@reduxjs/toolkit';

const movingSlice = createSlice({
  name: 'moving',
  initialState: {
    movingPrice: 0,
    isMovingPriceAddToOrder: false,
  },
  reducers: {
    setMovingCost(state, action) {
      state.movingPrice = action.payload;
    },
    toggleMovingPriceToOrder(state, action) {
      state.isMovingPriceAddToOrder = !state.isMovingPriceAddToOrder;
    },
  },
});

export const { setMovingCost, toggleMovingPriceToOrder } = movingSlice.actions;
export const movingReducer = movingSlice.reducer;
