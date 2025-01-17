import { Avatar } from '@nextui-org/react';

import { Disclosure, DisclosureButton } from '@headlessui/react';

import DisclosureDeliveryPanel from '../DisclosureDeliveryPanel';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { TbTruckDelivery } from "react-icons/tb";

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
          <Avatar
            icon={<TbTruckDelivery />}
            className="w-5 h-5 bg-accent text-base md:size-6 md:text-base xl:size-7 xl:text-xl"
            radius="sm"
            color="primary"
          />

          <span className="text-xs/6 text-left  text-grey font-semibold group-data-[hover]:text-grey/80 md:text-base xl:text-xl">
            Доставка
          </span>
        </div>
        <ChevronDownIcon className="size-5 fill-grey group-data-[hover]:fill-grey/80 group-data-[open]:rotate-180 md:size-6 xl:size-7" />
      </DisclosureButton>
      <DisclosureDeliveryPanel totalWeight={totalWeight} />
    </Disclosure>
  );
};

export default DisclosureMoving;
