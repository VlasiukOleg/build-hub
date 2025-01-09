interface IMaterial {
  id: number;
  image: string;
  title: string;
  description: string;
  weight: number;
  movingTypeCalculation: string;
  price: number;
  quantity: number;
  totalPrice: number;
}
[];

type IMaterials = IMaterial[];

export const getMaterialsByCalculationType = (
  calculationType: string,
  materials: IMaterials
) => {
  const calculationTypeMaterials = materials.filter(
    material =>
      material.movingTypeCalculation === calculationType &&
      material.quantity > 0
  );

  return {
    calculationTypeMaterials,
  };
};
