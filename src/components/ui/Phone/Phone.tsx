import PhoneIcon from '@/../../public/icons/phone.svg';

const Phone: React.FC = () => {
  return (
    <div className="flex gap-1 items-center">
      <PhoneIcon width={18} height={18} fill="white" />
      <a className="text-base font-medium">063-279-04-37</a>
    </div>
  );
};

export default Phone;
