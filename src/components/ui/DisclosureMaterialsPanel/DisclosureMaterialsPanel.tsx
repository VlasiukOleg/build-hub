import Image from 'next/image';
import clsx from 'clsx';

import { DisclosurePanel, Input } from '@headlessui/react';

interface IDisclosureMaterialsPanelProps {
  material: {
    id: number;
    image: string;
    title: string;
    description: string;
    weight: number;
    price: number;
    quantity: number;
    totalPrice: number;
  };
  catInd: number;
  matInd: number;
  totalMaterialPrice: number;
  handleButtonChangeQuantity: (
    catInd: number,
    matInd: number,
    value: number
  ) => void;
  handleInputChangeQuantity: (
    e: React.ChangeEvent<HTMLInputElement>,
    catInd: number,
    matInd: number
  ) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const DisclosureMaterialsPanel: React.FC<IDisclosureMaterialsPanelProps> = ({
  material,
  catInd,
  matInd,
  handleButtonChangeQuantity,
  handleInputChangeQuantity,
  totalMaterialPrice,
  handleFocus,
  handleBlur,
}) => {
  return (
    <DisclosurePanel
      transition
      className="mt-4  text-white/50  origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 xl:mt-5"
      key={material.id}
    >
      <div className="xl:flex xl:justify-between">
        <div className="flex items-center gap-4 mb-2 xl:mb-0">
          <div className="rounded-xl border-[1px] border-accent overflow-hidden inline-block min-w-[75px] max-h-[75px] md:min-w-[100px] md:max-h-[100px] xl:min-w-[150px] xl:max-h-[150px]">
            <Image
              src={material.image}
              alt={material.title}
              width={150}
              height={150}
              className="size-[75px] md:size-[100px] xl:size-[150px]"
            />
          </div>
          <div className="xl:w-[500px]">
            <div className="text-sm md:text-base underline xl:text-xl">
              {material.title}
            </div>
            <p className="text-[8px] md:text-xs xl:text-sm">
              {material.description}
            </p>
          </div>
        </div>

        <div className="md:flex md:items-center justify-between xl:flex-wrap xl:flex-col xl:justify-center">
          <div className="flex items-center justify-between mb-2 md:mb-0 xl:mb-5">
            <div className="text-sm text-white flex items-center gap-1 md:mr-5 md:text-base xl:text-xl">
              Ціна: {material.price} грн.
            </div>
            <div>
              <button
                type="button"
                className="bg-accent size-6 rounded-md"
                onClick={() => handleButtonChangeQuantity(catInd, matInd, -1)}
              >
                -
              </button>
              <Input
                min={1}
                name="quantity"
                value={material.quantity}
                onChange={e => handleInputChangeQuantity(e, catInd, matInd)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="number"
                className={clsx(
                  'inline-block mx-2 text-center w-[60px]  rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white md:text-base md:w-[80px] xl:text-xl xl:w-[100px]',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
              />
              <button
                type="button"
                className="bg-accent size-6 rounded-md"
                onClick={() => handleButtonChangeQuantity(catInd, matInd, 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="bg-white/5 text-center rounded-lg border-[1px] border-accent p-2 md:text-lg xl:w-full xl:text-xl xl:p-3">
            Всього: {totalMaterialPrice.toFixed(2)} грн.
          </div>
        </div>
      </div>
    </DisclosurePanel>
  );
};

export default DisclosureMaterialsPanel;
