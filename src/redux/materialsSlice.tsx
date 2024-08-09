import { createSlice } from '@reduxjs/toolkit';
import shtukaturka from '@/data/shtukaturka.json';

const materialsSlice = createSlice({
  name: 'categories',
  initialState: shtukaturka,
  reducers: {
    changeQuantity(state, action) {
      const { catInd, matInd, slug, value } = action.payload;

      // Найти категорию по slug
      const category = state.find(item => item.id === slug);

      if (category) {
        const { categories } = category;
        // Проверить существование категории и материала
        const categoryItem = categories[catInd];
        const material = categoryItem?.materials[matInd];

        if (categoryItem && material) {
          // Обновить количество материала
          material.quantity = (Number(material.quantity) || 0) + value;
        }
      }
    },
    inputChangeQuantity(state, action) {
      const { catInd, matInd, slug, value } = action.payload;

      const category = state.find(item => item.id === slug);

      if (category) {
        const { categories } = category;
        // Проверить существование категории и материала
        const categoryItem = categories[catInd];
        const material = categoryItem?.materials[matInd];

        if (categoryItem && material) {
          // Обновить количество материала
          material.quantity = value;
        }
      }
    },
    clearQuantity(state, action) {
      const allMaterials = state.flatMap(item => item.categories);

      const groupMaterials = allMaterials.flatMap(
        category => category.materials
      );
      groupMaterials.map(item => (item.quantity = action.payload));
    },
  },
});

export const { changeQuantity, inputChangeQuantity, clearQuantity } =
  materialsSlice.actions;
export const materialsReducer = materialsSlice.reducer;
