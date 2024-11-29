import Image from 'next/image';
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';

import DisclosureMovingPanel from '../DisclosureMovingPanel';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Moving from '@/../public/images/moving.png';

import { MATERIAL_SIZE } from '@/constants/constants';
import { PRICE_PER_TON } from '@/constants/constants';

interface IDisclosureMovingProps {
  materials: {
    id: number;
    image: string;
    title: string;
    description: string;
    size: number;
    isWeightCalculation: boolean;
    price: number;
    quantity: number;
    totalPrice: number;
    weight: number;
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

  const getRows = () => {
    let rows = [];
    const weighCalculationMaterialTotalWeight = materials
      .filter(material => material.isWeightCalculation)
      .reduce((acc, value) => {
        return acc + value.weight * value.quantity;
      }, 0);
  };

  const rows = materials.map(material => {
    if (material.isWeightCalculation) {
      return {
        key: material.id,
        type: 'Ваговий матеріал',
        measure: 'тн',
        quantity: material.quantity * material.weight,
        price: PRICE_PER_TON,
        totalPrice: material.quantity * material.weight * PRICE_PER_TON,
      };
    }
  });

  const weighCalculationMaterialTotalWeight = materials
    .filter(material => material.isWeightCalculation)
    .reduce((acc, value) => {
      return acc + value.weight * value.quantity;
    }, 0);

  console.log(
    'weighCalculationMaterialWeight',
    weighCalculationMaterialTotalWeight
  );

  const itemCalculationMaterial = materials.filter(
    material => !material.isWeightCalculation
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
        weightCalculationMaterialTotalWeight={
          weighCalculationMaterialTotalWeight
        }
        liftSizedGipsokarton={liftSizedGipsokartonQuantity}
      />
    </Disclosure>
  );
};

export default DisclosureMoving;
