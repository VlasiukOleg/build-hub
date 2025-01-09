import { useAppSelector } from '@/redux/hooks';
import { useMaterials } from './useMaterials';

export const useMaterialsByCalculationType = (calculationType: string) => {
  const {materials} = useMaterials();
  
  const calculationTypeMaterials = materials.filter(
    material => material.movingTypeCalculation === calculationType && material.quantity > 0
  );

  return {
    calculationTypeMaterials,
  };
};
