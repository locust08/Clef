import Link from 'next/link';
import { useRouter } from 'next/router';

const SummarySectionSummary1: React.FC = () => {
  const router = useRouter();
  const orderId = typeof router.query.order_id === 'string' ? router.query.order_id : '';

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-xl border border-coolGray-200 bg-white p-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-rhino-300">
            Order confirmation
          </p>
          <h1 className="mb-4 font-heading text-4xl font-semibold text-rhino-700">
            Confirmation is waiting for a verified order
          </h1>
          <p className="mb-6 text-sm leading-7 text-rhino-400">
            CLEF will show order details here only after Medusa returns a real
            completed order. This page does not trust a success query parameter
            and will not display fake payment or invoice details.
          </p>
          {orderId ? (
            <div className="mb-6 rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-rhino-600">
              Received order reference: {orderId}. Add a server-side order
              lookup before showing customer order details.
            </div>
          ) : null}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white transition duration-200 hover:bg-purple-600 clef-button-primary"
              href="/shop/skincare"
            >
              Go back to shop
            </Link>
            <Link
              className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm font-medium text-rhino-700 transition duration-200 hover:bg-coolGray-100 clef-button-secondary"
              href="/account/history"
            >
              View order history
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummarySectionSummary1;
