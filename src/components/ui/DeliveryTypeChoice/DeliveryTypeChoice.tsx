import DeliveryIcon from '/public/icons/delivery-truck.svg';
import PickUpIcon from '/public/icons/pickup.svg';

interface IDeliveryTypeChoiceProps {
  selectedStore: string;
  handleDeliveryType: (delivetyType: string) => void;
}

const DeliveryTypeChoice: React.FC<IDeliveryTypeChoiceProps> = ({
  selectedStore,
  handleDeliveryType,
}) => {
  return (
    <div className="bg-white p-5 rounded-md">
      <p className="text-black text-sm mb-3 md:text-base xl:text-xl md:mb-4 xl:mb-6">
        {selectedStore}
      </p>
      <p className="text-gray-600 font-semibold mb-2 md:text-lg xl:text-2xl md:mb-3 xl:mb-5">
        Виберіть тип доставки:
      </p>
      <ul className="text-black flex flex-col gap-4 text-sm md:text-base xl:text-xl md:gap-5">
        <li>
          <button
            type="button"
            onClick={() => handleDeliveryType('delivery')}
            className="flex items-center  gap-2"
          >
            <DeliveryIcon width={24} height={24} className="xl:size-8" />
            Доставка автотранспортом
          </button>
        </li>
        <button
          type="button"
          onClick={() => handleDeliveryType('pickup')}
          className="flex items-center gap-2"
        >
          <PickUpIcon width={22} height={22} className="xl:size-7" />
          Самовивіз зі складу
        </button>
      </ul>
    </div>
  );
};

export default DeliveryTypeChoice;
