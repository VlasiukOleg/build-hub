'use client';

import clsx from 'clsx';

import { Disclosure, DisclosureButton } from '@headlessui/react';

import DisclosureMaterialsPanel from '../DisclosureMaterialsPanel';
import DisclosureMoving from '../DisclosureMoving';
import OrderBar from '@/components/common/OrderBar';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { inputChangeQuantity, changeQuantity } from '@/redux/materialsSlice';

import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface IDisclosureCategoriesProps {}

const DisclosureCategories: React.FC<IDisclosureCategoriesProps> = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories);
  const materials = categories.flatMap(material => material.materials);

  const totalPrice = materials.reduce((acc, value) => {
    return acc + value.price * value.quantity;
  }, 0);

  const totalWeight = materials.reduce((acc, value) => {
    return acc + value.weight * value.quantity;
  }, 0);

  const totalQuantity = materials.reduce((acc, value) => {
    return acc + value.quantity;
  }, 0);

  const handleInputChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    catInd: number,
    matInd: number
  ) => {
    let value = e.currentTarget.value.trim();
    console.log(value);

    if (value.charAt(0) === '0' && value.length > 1) {
      value = value.slice(1);
      console.log(value);
      e.currentTarget.value = value;
    }

    //   let numericValue = Math.max(0, parseInt(value, 10));
    // value = Math.max(0, value);
    // value = parseInt(value, 10);

    const payload = { catInd, matInd, value };
    dispatch(inputChangeQuantity(payload));
  };

  const handleButtonChangeQuantity = (
    catInd: number,
    matInd: number,
    value: number
  ) => {
    const payload = { catInd, matInd, value };

    dispatch(changeQuantity(payload));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();

    if (value === '0') {
      e.currentTarget.value = '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();

    if (!value) {
      e.currentTarget.value = '0';
    }
  };

  return (
    <section className={clsx('pt-5 py-5', totalQuantity > 0 && 'pt-14')}>
      <div className="container">
        <OrderBar
          totalQuantity={totalQuantity}
          totalWeight={totalWeight}
          totalPrice={totalPrice}
        />

        <div className="mx-auto w-full  divide-y divide-white/20 rounded-xl bg-white/10">
          {categories.map((category, catInd) => {
            return (
              <Disclosure
                as="div"
                className="p-6"
                defaultOpen={category.id === 1}
                key={category.id}
              >
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <div className="text-left flex gap-2 items-center">
                    <div className="rounded-full bg-accent size-5 flex justify-center items-center text-xs md:size-6 md:text-sm xl:size-7 xl:text-base ">
                      {category.id}
                    </div>
                    <span className="text-xs/6 text-left font-medium text-white  group-data-[hover]:text-white/80 md:text-base xl:text-xl">
                      {category.categoryTitle}
                    </span>
                  </div>

                  <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 md:size-6 xl:size-7" />
                </DisclosureButton>
                {category.materials.map((material, matInd) => {
                  const { quantity, price } = material;
                  const totalMaterialPrice = quantity * price;
                  return (
                    <DisclosureMaterialsPanel
                      key={matInd}
                      material={material}
                      totalMaterialPrice={totalMaterialPrice}
                      catInd={catInd}
                      matInd={matInd}
                      handleButtonChangeQuantity={handleButtonChangeQuantity}
                      handleInputChangeQuantity={handleInputChangeQuantity}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                    />
                  );
                })}
              </Disclosure>
            );
          })}
          <DisclosureMoving totalWeight={totalWeight} />
        </div>
      </div>
    </section>
  );
};

export default DisclosureCategories;
