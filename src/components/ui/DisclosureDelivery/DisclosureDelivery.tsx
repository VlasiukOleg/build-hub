import Image from 'next/image';

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/react';

import DisclosureDeliveryPanel from '../DisclosureDeliveryPanel';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Delivery from '@/../public/images/delivery.png';

interface IDisclosureDeliveryProps {
  totalWeight: number;
}

const DisclosureMoving: React.FC<IDisclosureDeliveryProps> = ({
  totalWeight,
}) => {
  return (
    <Disclosure as="div" className="p-6">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <div className="text-left flex gap-2 items-center">
          <Image
            src={Delivery}
            width={20}
            height={20}
            alt="moving icon"
            className="md:size-6 xl:size-7"
          />

          <span className="text-xs/6 text-left  text-grey font-semibold group-data-[hover]:text-white/80 md:text-base xl:text-xl">
            Доставка
          </span>
        </div>
        <ChevronDownIcon className="size-5 fill-grey group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 md:size-6 xl:size-7" />
      </DisclosureButton>
      <DisclosureDeliveryPanel totalWeight={totalWeight} />
    </Disclosure>
  );
};

export default DisclosureMoving;
