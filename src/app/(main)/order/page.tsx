import OrderList from '@/components/common/OrderList';

interface IOrderPageProps {}

const OrderPage: React.FC<IOrderPageProps> = () => {
  return (
    <section className="py-5 md:py-10">
      <div className="container">
        <OrderList />
      </div>
    </section>
  );
};

export default OrderPage;
