type OrderHistoryProps = {
  orders?: Array<{ id: string; total: string; status: string }>;
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders = [] }) => {
  if (orders.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-2">No order history yet</h1>
          <p className="text-rhino-400">Orders will appear here after your first checkout.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      {orders.map((order) => (
        <div className="rounded-xl border border-coolGray-200 bg-white p-6" key={order.id}>
          <h2 className="font-semibold text-rhino-700">{order.id}</h2>
          <p className="text-rhino-400">{order.status} - {order.total}</p>
        </div>
      ))}
    </section>
  );
};

export default OrderHistory;
