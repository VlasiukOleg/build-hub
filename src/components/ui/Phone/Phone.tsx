import PhoneIcon from '@/../../public/icons/phone-color.svg';

const Phone: React.FC = () => {
  return (
    <div className="flex gap-1 items-center">
      <PhoneIcon width={18} height={18} fill="white" className="md:size-5" />
      <a href="tel:+380632790437" className="text-sm font-semibold md:text-lg">
        (063) 279 04 37
      </a>
    </div>
  );
};

export default Phone;
