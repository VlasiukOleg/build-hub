import Image from 'next/image';
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';
import { Avatar } from "@heroui/react";

import DisclosureMovingPanel from '../DisclosureMovingPanel';

import { normalizedWeight } from '@/utils/normalizesWeight';
import { useMaterials } from '@/hooks/useMaterials';

import { MOVING_TYPE_CALCULATION_LIST_MAP } from '@/components/common/MovingCostTable/constans';

import { LiaLuggageCartSolid } from "react-icons/lia";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface IDisclosureMovingProps {}

const DisclosureMoving: React.FC<IDisclosureMovingProps> = () => {
  const { materials, totalWeight } = useMaterials();

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

  return (
    <Disclosure as="div" className="p-6">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <div className="text-left flex gap-2 items-center">
          <Avatar
            icon={<LiaLuggageCartSolid />}
            className="w-5 h-5 bg-accent text-base md:size-6 md:text-base xl:size-7 xl:text-xl"
            radius="sm"
            color="primary"
          />

          <span className="text-xs/6 text-left  text-grey font-semibold group-data-[hover]:text-grey/80 md:text-base xl:text-xl">
            Розвантаження
          </span>
        </div>
        <ChevronDownIcon className="size-5 fill-grey group-data-[hover]:fill-grey/80 group-data-[open]:rotate-180 md:size-6 xl:size-7" />
      </DisclosureButton>
      <DisclosureMovingPanel />
    </Disclosure>
  );
};

export default DisclosureMoving;
