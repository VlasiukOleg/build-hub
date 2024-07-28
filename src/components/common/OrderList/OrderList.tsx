'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks';

import ButtonLink from '@/components/ui/ButtonLink';
import OrderForm from '../OrderForm';

import DeliveryIcon from '@/../public/icons/delivery-truck.svg';
import MovingIcon from '@/../public/icons/moving.svg';

interface IOrderListProps {}

const OrderList: React.FC<IOrderListProps> = ({}) => {
  const router = useRouter();
  const categories = useAppSelector(state => state.categories);
  const materials = categories.flatMap(material => material.materials);
  const filteredMaterialsByQuantity = materials.filter(
    material => material.quantity > 0
  );

  const deliveryPrice = useAppSelector(state => state.delivery.deliveryPrice);
  const deliveryType = useAppSelector(state => state.delivery.deliveryType);
  const deliveryStorage = useAppSelector(
    state => state.delivery.deliveryStorage
  );
  const movingPrice = useAppSelector(state => state.moving.movingPrice);
  const isMovingAddToOrder = useAppSelector(
    state => state.moving.isMovingPriceAddToOrder
  );

  const isAdditionalMaterialAddToOrder = useAppSelector(
    state => state.additionalMaterial.isAdditionalMaterialAddToOrder
  );
  const additionalMaterial = useAppSelector(
    state => state.additionalMaterial.additionalMaterial
  );

  const totalPrice = materials.reduce((acc, value) => {
    return acc + value.price * value.quantity;
  }, 0);

  const totalWeight = materials.reduce((acc, value) => {
    return acc + value.weight * value.quantity;
  }, 0);

  const totalQuantity = materials.reduce((acc, value) => {
    return acc + value.quantity;
  }, 0);

  return (
    <>
      {totalQuantity > 0 ? (
        <div className="xl:flex xl:justify-between">
          <div className="xl:w-[48%]">
            <div className=" bg-bgWhite border-[1px] border-grey rounded-xl py-2 mb-2 md:py-3">
              <ul className="divide-y divide-grey">
                {filteredMaterialsByQuantity.map(material => (
                  <li
                    key={material.id}
                    className="p-2 font-semibold flex items-center text-grey md:p-4"
                  >
                    <div className="mr-2 text-center inline-block md:size-[75px] md:mr-4">
                      <Image
                        src={material.image}
                        alt={material.title}
                        width={50}
                        height={50}
                        className="md:size-[75px]"
                      />
                    </div>

                    <p className="text-xs text-semibold w-[50%] md:text-base ">
                      {' '}
                      {material.title}
                    </p>
                    <p className="text-sm font-normal text-center w-[15%] md:text-lg">
                      {material.quantity}
                    </p>
                    <div className="w-[25%] text-right">
                      <p className="text-xs font-normal md:text-base">
                        {material.price} грн.
                      </p>
                      <p className="text-sm text-accent md:text-lg">
                        {(material.quantity * material.price).toFixed(2)} грн.
                      </p>
                    </div>
                  </li>
                ))}
                {isMovingAddToOrder && (
                  <li className="p-2 font-semibold flex items-center text-grey md:p-4">
                    <div className="mr-2 p-1 text-center inline-block md:size-[75px] md:mr-4">
                      <MovingIcon
                        width={40}
                        height={40}
                        className="md:size-[75px]"
                      />
                    </div>

                    <p className="text-xs text-semibold w-[50%] md:text-base ">
                      {' '}
                      Розвантаження
                    </p>
                    <p className="text-sm font-normal text-center w-[15%] md:text-lg">
                      1
                    </p>
                    <div className="w-[25%] text-right">
                      <p className="text-xs font-normal md:text-base">
                        {movingPrice} грн.
                      </p>
                      <p className="text-sm text-accent md:text-lg">
                        {movingPrice} грн.
                      </p>
                    </div>
                  </li>
                )}
                {deliveryType === 'delivery' && (
                  <li className="p-2 font-semibold flex items-center text-grey md:p-4">
                    <div className="mr-2 p-1 text-center inline-block md:size-[75px] md:mr-4">
                      <DeliveryIcon
                        width={40}
                        height={40}
                        className="md:size-[75px]"
                      />
                    </div>

                    <p className="text-xs text-semibold w-[50%] md:text-base ">
                      {' '}
                      Доставка
                    </p>
                    <p className="text-sm font-normal text-center w-[15%] md:text-lg">
                      1
                    </p>
                    <div className="w-[25%] text-right">
                      <p className="text-xs font-normal md:text-base">
                        {deliveryPrice} грн.
                      </p>
                      <p className="text-sm text-accent md:text-lg">
                        {deliveryPrice} грн.
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div className="text-grey text-xs/5 md:text-base">
              Вага: {totalWeight} кг.
            </div>
            <div className="text-grey text-xs/5 md:text-base">
              Склад: {deliveryStorage ? deliveryStorage : 'Не вибрано'}{' '}
            </div>

            <div className="text-grey text-xs/5 md:text-base">
              Тип доставки:{' '}
              {deliveryType
                ? deliveryType === 'delivery'
                  ? 'Доставка автотранспотром'
                  : 'Самовивіз зі складу'
                : 'Не вибрано'}
            </div>

            <div className="text-grey text-sm font-bold md:text-lg mb-4">
              Всього до оплати:{' '}
              <span className="text-accent">
                {(
                  (isMovingAddToOrder ? movingPrice : 0) +
                  (deliveryType === 'pickup' || deliveryType === ''
                    ? 0
                    : deliveryPrice) +
                  totalPrice
                ).toFixed(2)}{' '}
                грн.{' '}
              </span>
            </div>
            {isAdditionalMaterialAddToOrder && (
              <div className="mt-4 mb-4 md:mb-6">
                <h3 className="font-bold mb-2 text-sm md:text-lg">
                  Додані матеріали:
                </h3>
                <table className="min-w-full border-collapse border border-grey">
                  <thead>
                    <tr>
                      <th className="border border-grey px-4 py-2 text-left text-xs md:text-base">
                        Матеріал
                      </th>
                      <th className="border border-grey px-4 py-2 text-left text-xs md:text-base">
                        К-ть
                      </th>
                      <th className="border border-grey px-4 py-2 text-left text-xs md:text-base">
                        Ціна
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalMaterial?.map((material, index) => (
                      <tr key={index}>
                        <td className="border border-grey px-4 py-2 text-xs md:text-base">
                          {material.title}
                        </td>
                        <td className="border border-grey px-4 py-2 text-xs md:text-base">
                          {material.quantity}
                        </td>
                        <td className="border border-grey px-4 py-2 text-xs md:text-base">
                          {material.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <OrderForm />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 ">
          Не вибрано жодного товару{' '}
          <ButtonLink
            variant="main"
            className="max-w-[200px] md:max-w-[280px] xl:max-w-[350px]"
            onClick={() => router.push('/catalog/shtukaturka')}
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </ButtonLink>
        </div>
      )}
    </>
  );
};

export default OrderList;
