import PhoneIcon from '@/../../public/icons/phone.svg';

const Phone: React.FC = () => {
  return (
    <div className="flex gap-1 items-center">
      <PhoneIcon width={14} height={14} fill="white" />
      <a className="text-sm font-medium">063-279-04-37</a>
    </div>
  );
};

export default Phone;
