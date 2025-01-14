interface IMovingTotalPrice {}

import { useAppSelector } from '../../../redux/hooks';

const MovingTotalPrice: React.FunctionComponent<IMovingTotalPrice> = () => {
  const movingPrice = useAppSelector(state => state.moving.movingPrice);
  return (
    <div className="bg-white/5 text-center font-semibold rounded-lg border-[1px] border-accent p-2">
      Ціна розвантаження: {movingPrice} грн.
    </div>
  );
};

export default MovingTotalPrice;
