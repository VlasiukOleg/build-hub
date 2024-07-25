'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import { DisclosurePanel, Field, Label, Input } from '@headlessui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addAdditionalMaterial,
  removeAdditionalMaterial,
  clearAdditionalMaterial,
  toggleAdditionalPriceAddToOrder,
} from '@/redux/additionalMaterialSlice';

import Remove from '@/../public/images/remove.png';
import Plus from '@/../public/images/plus.png';

interface IDisclosureAddMaterialsPanelProps {}

interface ICustomMaterial {
  title: string;
  quantity: number;
  price: string;
}

const DisclosureAddMaterialsPanel: React.FC<
  IDisclosureAddMaterialsPanelProps
> = ({}) => {
  const [newMaterial, setNewMaterial] = useState({ title: '', quantity: 0 });

  const dispatch = useAppDispatch();

  const additionalMaterial = useAppSelector(
    state => state.additionalMaterial.additionalMaterial
  );
  const isAdditionalMaterialAddToOrder = useAppSelector(
    state => state.additionalMaterial.isAdditionalMaterialAddToOrder
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.title && newMaterial.quantity) {
      dispatch(addAdditionalMaterial({ ...newMaterial, price: 'Договірна' }));
      setNewMaterial({ title: '', quantity: 0 });
    }
  };

  const handleRemoveMaterial = (index: number) => {
    dispatch(removeAdditionalMaterial(index));
    dispatch(toggleAdditionalPriceAddToOrder());
  };

  const onToggleAdditionalMaterialToOrder = () => {
    dispatch(toggleAdditionalPriceAddToOrder());
  };

  return (
    <DisclosurePanel className="mt-2 text-sm/5 text-grey md:text-lg xl:text-xl xl:mt-6">
      <Field className="relative mb-2">
        <Label className="text-xs/6 font-medium  text-grey md:text-sm">
          Назва матеріалу
        </Label>
        <Input
          onChange={handleInputChange}
          name="title"
          value={newMaterial.title}
          className={clsx(
            'mt-1 block w-full rounded-lg border-[1px] border-grey bg-bgWhite py-1.5 px-3 text-xs/6 text-grey md:text-sm md:py-2',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-accent'
          )}
        />
      </Field>
      <div className="flex items-end gap-1">
        <Field className="relative">
          <Label className="text-xs/6 font-medium  text-grey md:text-sm">
            Кількість
          </Label>
          <Input
            onChange={handleInputChange}
            name="quantity"
            value={newMaterial.quantity}
            className={clsx(
              'mt-1 block w-full rounded-lg border-[1px] border-grey bg-bgWhite py-1.5 px-3 text-xs/6 text-grey md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-accent'
            )}
          />
        </Field>

        <button type="button" onClick={handleAddMaterial}>
          <Image
            src={Plus}
            alt="іконка додавання"
            className="size-9 md:size-8 xl:size-12"
          />
        </button>
      </div>

      {additionalMaterial.length > 0 && (
        <>
          <div className="mt-2">
            <h3 className="font-bold text-xs mb-2">Додані матеріали:</h3>
            <div className=" bg-bgWhite border-[1px] border-grey rounded-xl py-1 mb-2 md:py-3">
              <ul className="divide-y divide-grey">
                {additionalMaterial.map((material, index) => (
                  <li
                    key={material.title}
                    className="p-2 font-semibold flex items-center text-grey md:p-4"
                  >
                    <p className="text-xs text-semibold w-[70%] md:text-base ">
                      {' '}
                      {material.title}
                    </p>
                    <p className="text-sm font-normal text-center w-[15%] md:text-lg">
                      {material.quantity}
                    </p>
                    <div className="w-[15%] text-right flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(index)}
                      >
                        <Image
                          src={Remove}
                          alt="іконка видалення"
                          className="size-6 md:size-8 xl:size-12"
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onToggleAdditionalMaterialToOrder}
              className="inline-flex justify-center border border-accent items-center rounded-md gap-4 text-xs font-medium leading-[1.5] bg-bgWhite text-accent px-6 py-2 md:text-base xl:text-2xl"
            >
              {isAdditionalMaterialAddToOrder
                ? 'Видалити з замовлення'
                : 'Додати до замовлення'}
            </button>
          </div>
        </>
      )}
    </DisclosurePanel>
  );
};

export default DisclosureAddMaterialsPanel;
