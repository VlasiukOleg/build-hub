import Image from 'next/image';
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';

import DisclosureMovingPanel from '../DisclosureMovingPanel';

import { normalizedWeight } from '@/utils/normalizesWeight';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Moving from '@/../public/images/moving.png';

import { MOVING_TYPE_CALCULATION_LIST_MAP } from '@/components/common/MovingCostTable/constans';
import { MATERIAL_SIZE } from '@/constants/constants';
import { PRICE_PER_TON } from '@/constants/constants';

interface IDisclosureMovingProps {
  materials: {
    id: number;
    image: string;
    title: string;
    description: string;
    weight: number;
    movingTypeCalculation: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }[];
}

const DisclosureMoving: React.FC<IDisclosureMovingProps> = ({ materials }) => {
  const totalWeight = materials?.reduce((acc, value) => {
    return acc + value.weight * value.quantity;
  }, 0);

  const liftSizedGipsokarton = materials.filter(
    material => material.size === MATERIAL_SIZE.SM
  );

  const liftSizedGipsokartonQuantity = liftSizedGipsokarton.reduce(
    (acc, value) => {
      return acc + Number(value.quantity);
    },
    0
  );

  const weightTypeCalculateMaterial = materials.filter(
    material =>
      material.movingTypeCalculation === MOVING_TYPE_CALCULATION_LIST_MAP.WEIGHT
  );

  const weightTypeCalculateMaterialTotalWeight =
    weightTypeCalculateMaterial.reduce((acc, value) => {
      return acc + value.weight * value.quantity;
    }, 0);

  const normalizedWeightTypeCalculateMaterialTotalWeight = normalizedWeight(
    weightTypeCalculateMaterialTotalWeight
  );

  const getRows = () => {
    if (weightTypeCalculateMaterialTotalWeight > 0) {
      return [
        {
          key: '1',
          type: 'Ваговий матеріал',
          measure: 'тн',
          quantity: normalizedWeightTypeCalculateMaterialTotalWeight,
          price: PRICE_PER_TON,
          totalPrice:
            normalizedWeightTypeCalculateMaterialTotalWeight * PRICE_PER_TON,
        },
      ];
    }

    return [];
  };

  const rows = getRows();

  console.log(
    'weighCalculationMaterialWeight',
    normalizedWeightTypeCalculateMaterialTotalWeight
  );

  console.log('liftSizedGipsokartonQuantity', liftSizedGipsokartonQuantity);

  return (
    <Disclosure as="div" className="p-6">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <div className="text-left flex gap-2 items-center">
          <Image
            src={Moving}
            width={20}
            height={20}
            alt="moving icon"
            className="md:size-6 xl:size-7"
          />

          <span className="text-xs/6 text-left  text-grey font-semibold group-data-[hover]:text-grey/80 md:text-base xl:text-xl">
            Розвантаження
          </span>
        </div>
        <ChevronDownIcon className="size-5 fill-grey group-data-[hover]:fill-grey/80 group-data-[open]:rotate-180 md:size-6 xl:size-7" />
      </DisclosureButton>
      <DisclosureMovingPanel
        totalWeight={totalWeight}
        rows={rows}
        liftSizedGipsokarton={liftSizedGipsokartonQuantity}
      />
    </Disclosure>
  );
};

export default DisclosureMoving;
