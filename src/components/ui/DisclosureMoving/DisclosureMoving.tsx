import Image from 'next/image';

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';

import DisclosureMovingPanel from '../DisclosureMovingPanel';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Moving from '@/../public/images/moving.png';

interface IDisclosureMovingProps {
  totalWeight: number;
  liftSizedGipsokarton: number;
}

const DisclosureMoving: React.FC<IDisclosureMovingProps> = ({
  totalWeight,
  liftSizedGipsokarton,
}) => {
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
        liftSizedGipsokarton={liftSizedGipsokarton}
      />
    </Disclosure>
  );
};

export default DisclosureMoving;
