'use client';

import {
  DisclosurePanel,
  Radio,
  RadioGroup,
  Input,
  Field,
  Label,
} from '@headlessui/react';
import clsx from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setMovingCost, toggleMovingPriceToOrder } from '@/redux/movingSlice';

import { calculateMovingFee } from '@/utils/calculateMovingFee';

interface IDisclosureMovingPanelProps {
  totalWeight: number;
}

const elevators = [
  {
    name: 'Пасажирський ліфт',
    label: 'passenger',
  },
  { name: 'Вантажний ліфт', label: 'cargo' },
  { name: 'Без ліфта', label: 'nolift' },
];

const buildings = [
  {
    name: 'Новий дім/Хрущевка',
    label: 'new',
  },
  { name: 'Сталінка/Царський', label: 'old' },
];

const DisclosureMovingPanel: React.FunctionComponent<
  IDisclosureMovingPanelProps
> = ({ totalWeight }) => {
  const [elevator, setElevator] = useState(elevators[1]);
  const [building, setBuilding] = useState(buildings[0]);
  const [floor, setFloor] = useState('1');
  const [distance, setDistance] = useState(20);

  const movingPrice = useAppSelector(state => state.moving.movingPrice);
  const isMovingPriceAddToOrderBar = useAppSelector(
    state => state.moving.isMovingPriceAddToOrder
  );
  const dispatch = useAppDispatch();

  const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && Number(value) <= 35) {
      setFloor(value);
    }
  };

  const onAddMovingToOrderBar = () => {
    dispatch(toggleMovingPriceToOrder());
  };

  useEffect(() => {
    if (elevator.label !== 'nolift') {
      setFloor('1');
      setBuilding(buildings[0]);
    }
    const floorNumber = Number(floor) || 0;
    const movingFee = calculateMovingFee(
      totalWeight,
      elevator.label,
      distance,
      building.label,
      floorNumber
    );

    dispatch(setMovingCost(Math.round(movingFee)));
  }, [totalWeight, dispatch, elevator.label, distance, floor, building.label]);

  return (
    <DisclosurePanel className="mt-2 text-sm/5 text-grey md:text-lg xl:text-xl xl:mt-6">
      <div className="mb-3 font-medium">
        Загальна вага: <span className="text-accent">{totalWeight} кг.</span>
      </div>
      <RadioGroup
        value={elevator}
        onChange={setElevator}
        aria-label="Server size"
        className="space-y-2 mb-2 md:flex md:items-center md:gap-5 md:space-y-0 md:mb-4"
      >
        {elevators.map(elevator => (
          <Radio
            key={elevator.name}
            value={elevator}
            className="group relative flex  cursor-pointer rounded-lg bg-gray-200 py-2 px-3 text-grey shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-grey data-[checked]:bg-lightAccent"
          >
            <div className="flex  w-full items-center justify-between md:gap-3">
              <div className="text-xs/6 md:text-sm xl:text-base">
                <p className="font-semibold text-grey">{elevator.name}</p>
              </div>
              <CheckCircleIcon className="size-6 fill-accent opacity-0 transition group-data-[checked]:opacity-100 xl:size-7" />
            </div>
          </Radio>
        ))}
      </RadioGroup>

      {elevator.label === 'nolift' && (
        <div className="md:flex md:gap-5 md:items-center md:mb-4">
          <RadioGroup
            value={building}
            onChange={setBuilding}
            aria-label="Server size"
            className="space-y-2 mb-3 md:flex md:space-y-0 md:gap-5 md:mb-0"
          >
            {buildings.map(building => (
              <Radio
                key={building.name}
                value={building}
                className="group relative flex cursor-pointer rounded-lg bg-gray-200  py-2 px-3 text-grey shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-lightAccent"
              >
                <div className="flex w-full items-center justify-between md:gap-3">
                  <div className="text-xs/6 md:text-sm xl:text-base">
                    <p className="font-semibold text-grey">{building.name}</p>
                  </div>
                  <CheckCircleIcon className="size-6 fill-accent opacity-0 transition group-data-[checked]:opacity-100 xl:size-7" />
                </div>
              </Radio>
            ))}
          </RadioGroup>
          <Field className="mb-3 md:mb-0 md:flex md:items-center md:gap-2">
            <Label className="text-sm/6 font-medium textgrey xl:text-base">
              Поверх
            </Label>

            <Input
              value={floor}
              type="number"
              min={1}
              onChange={handleFloorChange}
              className={clsx(
                'block w-full rounded-lg border-accent border-[1px] bg-white/5 py-1.5 px-3 text-sm/6 text-grey md:w-[75px] md:py-2 md:text-center xl:text-base',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            />
          </Field>
        </div>
      )}

      <div className="md:flex md:gap-5 md:items-center xl:flex-col xl:items-start mb-3 xl:mb-5">
        <Field className="mb-5 md:mb-0 md:flex-[50%] xl:w-[50%]">
          <Label className="text-sm/6 font-medium text-grey md:text-base xl:text-lg">
            Відстань заносу матеріалу -{' '}
            <span className="text-accent">{distance} м.</span>
          </Label>

          <Input
            type="range"
            min="0"
            max="100"
            value={distance}
            step="5"
            onChange={e => setDistance(Number(e.target.value))}
            className={clsx(
              'block w-full rounded-lg border-none bg-white/5 py-1.5  text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
        </Field>
        <div className="bg-white/5 text-center font-semibold rounded-lg border-[1px] border-accent p-2 md:flex-[50%] xl:w-[50%]">
          Ціна розвантаження: {movingPrice} грн.
        </div>
      </div>
      <div className="text-center">
        {' '}
        <button
          onClick={onAddMovingToOrderBar}
          className={clsx(
            'bg-green-800 font-unbounded text-center rounded-lg border-[1px] border-none text-white md:text-base p-2 md:flex-[50%] xl:w-[25%]',
            isMovingPriceAddToOrderBar && 'bg-red-800'
          )}
        >
          {isMovingPriceAddToOrderBar
            ? 'Прибрати з замовлення'
            : 'Додати до замовлення'}
        </button>
      </div>
    </DisclosurePanel>
  );
};

export default DisclosureMovingPanel;
