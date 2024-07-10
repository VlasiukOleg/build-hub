import { createSlice } from '@reduxjs/toolkit';
import shtukaturka from '@/data/shtukaturka.json';

const materialsSlice = createSlice({
  name: 'categories',
  initialState: shtukaturka,
  reducers: {
    toggleCategory(state, action) {
      state[action.payload].isCategoryOpen =
        !state[action.payload].isCategoryOpen;
    },
    changeQuantity(state, action) {
      const { catInd, matInd } = action.payload;
      console.log(action.payload);
      state[catInd].materials[matInd].quantity =
        Number(state[catInd].materials[matInd].quantity) + action.payload.value;
    },
    inputChangeQuantity(state, action) {
      state[action.payload.catInd].materials[action.payload.matInd].quantity =
        action.payload.value;
    },
    clearQuantity(state, action) {
      const groupMaterials = state.flatMap(material => material.materials);
      groupMaterials.map(item => (item.quantity = action.payload));
    },
  },
});

export const {
  toggleCategory,
  changeQuantity,
  inputChangeQuantity,
  clearQuantity,
} = materialsSlice.actions;
export const materialsReducer = materialsSlice.reducer;
