'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks';

import ButtonLink from '@/components/ui/ButtonLink';
import OrderForm from '../OrderForm';

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
            <div className=" bg-white/10 rounded-xl py-2 mb-2 md:py-3">
              <ul className="divide-y divide-white/20">
                {filteredMaterialsByQuantity.map(material => (
                  <li
                    key={material.id}
                    className="p-2 flex items-center text-white/50 md:p-4"
                  >
                    <div className="rounded-xl border-[1px] border-accent overflow-hidden mr-2 text-center inline-block md:size-[75px] md:mr-4">
                      <Image
                        src={material.image}
                        alt={material.title}
                        width={50}
                        height={50}
                        className="md:size-[75px]"
                      />
                    </div>

                    <p className="text-xs w-[50%] md:text-base ">
                      {' '}
                      {material.title}
                    </p>
                    <p className="text-sm text-center w-[15%] md:text-lg">
                      {material.quantity}
                    </p>
                    <div className="w-[25%] text-right">
                      <p className="text-xs md:text-base">
                        {material.price} грн.
                      </p>
                      <p className="text-sm text-accent md:text-lg">
                        {(material.quantity * material.price).toFixed(2)} грн.
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-white/50 text-xs/5 md:text-base">
              Вага: {totalWeight} кг.
            </div>
            <div className="text-white/50 text-xs/5 md:text-base">
              Склад: {deliveryStorage ? deliveryStorage : 'Не вибрано'}{' '}
            </div>

            <div className="text-white/50 text-xs/5 md:text-base">
              Тип доставки:{' '}
              {deliveryType
                ? deliveryType === 'delivery'
                  ? 'Доставка автотранспотром'
                  : 'Самовивіз зі складу'
                : 'Не вибрано'}
            </div>
            {deliveryType === 'delivery' && (
              <div className="text-white/50 text-xs/5 md:text-base">
                Доставка: {deliveryPrice} грн.
              </div>
            )}

            {isMovingAddToOrder && (
              <div className="text-white/50 text-xs/5 md:text-base">
                Розвантаження: {movingPrice} грн.
              </div>
            )}

            <div className="text-white/50 text-sm font-bold md:text-lg mb-4">
              Всього до оплати:{' '}
              <span className="text-accent">
                {(movingPrice + deliveryPrice + totalPrice).toFixed(2)} грн.{' '}
              </span>
            </div>
          </div>
          <OrderForm />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 ">
          Не вибрано жодного товару{' '}
          <ButtonLink
            variant="main"
            className="max-w-[200px] md:max-w-[280px]"
            onClick={() => router.push('/catalog')}
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </ButtonLink>
        </div>
      )}
    </>
  );
};

export default OrderList;
