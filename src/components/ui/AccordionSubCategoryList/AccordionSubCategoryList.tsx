'use client';

import React from 'react';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Avatar } from '@heroui/react';

import DisclosureMaterialsPanel from '../DisclosureMaterialsPanel';
import DisclosureGipsokartonPanel from '../DisclosureGipsokartonPanel';
import DisclosureMovingPanel from '../DisclosureMovingPanel';
import DisclosureDeliveryPanel from '../DisclosureDeliveryPanel';
import DisclosureAddMaterialsPanel from '../DisclosureAddMaterialsPanel';

import { Pages } from '@/@types';

import { useMaterials } from '@/hooks/useMaterials';
import { useAppDispatch } from '@/redux/hooks';
import { inputChangeQuantity, changeQuantity } from '@/redux/materialsSlice';

import { LiaLuggageCartSolid } from 'react-icons/lia';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaPlus } from 'react-icons/fa6';

interface IAccordionSubCategoryList {
  slug: Pages;
  totalWeight: number;
}

const AccordionSubCategoryList: React.FC<IAccordionSubCategoryList> = ({
  slug,
  totalWeight,
}) => {
  const { subCategoriesBySlug, materials, totalPrice, totalQuantity, title } =
    useMaterials(slug);

  const dispatch = useAppDispatch();

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

    const payload = { catInd, matInd, value, slug };
    dispatch(inputChangeQuantity(payload));
  };

  const handleButtonChangeQuantity = (
    catInd: number,
    matInd: number,
    value: number
  ) => {
    console.log(value);
    const payload = { catInd, matInd, value, slug };

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

  const data = [
    {
      id: 'add',
      categoryTitle: 'Додати матеріал',
      isCategoryOpen: true,
      materials: [],
    },
    {
      id: 'moving',
      categoryTitle: 'Розвантаження',
      isCategoryOpen: true,
      materials: [],
    },
    {
      id: 'delivery',
      categoryTitle: 'Доставка',
      isCategoryOpen: true,
      materials: [],
    },
  ];

  if (!subCategoriesBySlug) {
    return null;
  }

  return (
    <>
      <Accordion
        variant="splitted"
        className="mb-4 max-w-full w-full h-full md:w-[760px] xl:w-[1200px]"
        itemClasses={{ content: 'pb-4' }}
      >
        {subCategoriesBySlug.map((subCategory, catInd) => {
          return (
            <AccordionItem
              key={subCategory.id}
              classNames={{ title: 'text-sm md:text-base' }}
              aria-label="Accordion 1"
              startContent={
                <Avatar
                  icon={catInd + 1}
                  className="w-5 h-5 bg-accent text-xs md:size-6 md:text-sm xl:size-7 xl:text-base"
                  radius="sm"
                  color="primary"
                />
              }
              title={subCategory.categoryTitle}
            >
              {subCategory.materials.map((material, matInd) => {
                const { quantity, price } = material;
                const totalMaterialPrice = quantity * price;
                return slug !== 'gipsokarton' ? (
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
                ) : (
                  <>
                    <DisclosureGipsokartonPanel
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
                  </>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
      <h2 className="font-unbounded xl:text-2xl font-bold text-center mb-5  md:text-lg">
        Додаткові можливості
      </h2>
      <Accordion
        variant="splitted"
        className="mb-4 max-w-full w-full h-full md:w-[760px] xl:w-[1200px]"
        itemClasses={{ content: 'pb-4' }}
      >
        <AccordionItem
          key="add"
          title="Додати матеріал"
          startContent={
            <Avatar
              icon={<FaPlus />}
              className="w-5 h-5 bg-accent text-xs md:size-6 md:text-sm xl:size-7 xl:text-base"
              radius="sm"
              color="primary"
            />
          }
        >
          <DisclosureAddMaterialsPanel />
        </AccordionItem>
        <AccordionItem
          key="moving"
          title="Розвантаження"
          keepContentMounted
          startContent={
            <Avatar
              icon={<LiaLuggageCartSolid />}
              className="w-5 h-5 bg-accent text-base md:size-6 md:text-base xl:size-7 xl:text-xl"
              radius="sm"
              color="primary"
            />
          }
        >
          <DisclosureMovingPanel />
        </AccordionItem>
        <AccordionItem
          key="delivery"
          keepContentMounted
          title="Доставка"
          startContent={
            <Avatar
              icon={<TbTruckDelivery />}
              className="w-5 h-5 bg-accent text-base md:size-6 md:text-base xl:size-7 xl:text-xl"
              radius="sm"
              color="primary"
            />
          }
        >
          <DisclosureDeliveryPanel totalWeight={totalWeight} />
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AccordionSubCategoryList;
