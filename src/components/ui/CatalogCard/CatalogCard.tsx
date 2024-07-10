import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface ICatalogCardProps {
  img: StaticImageData;
  text: string;
}

const CataogCard: React.FunctionComponent<ICatalogCardProps> = ({
  img,
  text,
}) => {
  return (
    <li>
      <Link href="catalog/shtukaturka">
        <div className="rounded-lg border-2 border-accent overflow-hidden relative md:w-[340px]">
          <Image src={img} alt={text} width={450} height={300} />
          <div className="bg-black/70 absolute left-0 bottom-0 w-full  text-center p-5 text-sm">
            {text}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CataogCard;
