import PhoneIcon from '@/../../public/icons/phone.svg';

const Phone: React.FC = () => {
  return (
    <div className="flex gap-1 items-center">
      <PhoneIcon width={12} height={12} fill="white" className="md:size-4" />
      <a href="tel:+380632790437" className="text-sm font-medium md:text-lg">
        063-279-04-37
      </a>
    </div>
  );
};

export default Phone;
