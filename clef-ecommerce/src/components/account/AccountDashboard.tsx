import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useCustomer } from '../../context/CustomerContext';

const AccountDashboard: React.FC = () => {
  const router = useRouter();
  const { customer, isCustomerLoading, logout } = useCustomer();

  React.useEffect(() => {
    if (!isCustomerLoading && !customer) {
      void router.replace(`/login?returnUrl=${encodeURIComponent('/account')}`);
    }
  }, [customer, isCustomerLoading, router]);

  if (isCustomerLoading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center text-rhino-400">
          Loading account...
        </div>
      </section>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="mb-2 font-heading text-3xl font-semibold text-rhino-700">
            My Account
          </h1>
          <p className="text-rhino-500">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="text-rhino-400">{customer.email}</p>
          {customer.phone && <p className="text-rhino-400">{customer.phone}</p>}
        </div>
        <button
          className="rounded-sm border border-coolGray-200 px-4 py-3 text-sm font-medium text-rhino-700 transition duration-200 hover:bg-coolGray-100 clef-button-secondary"
          onClick={logout}
          type="button"
        >
          Logout
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link className="rounded-xl border border-coolGray-200 bg-white p-6 hover:border-purple-500 clef-button-secondary" href="/account/history">Order History</Link>
        <Link className="rounded-xl border border-coolGray-200 bg-white p-6 hover:border-purple-500 clef-button-secondary" href="/account/favourite">Favourites</Link>
        <Link className="rounded-xl border border-coolGray-200 bg-white p-6 hover:border-purple-500 clef-button-secondary" href="/clef-edit">CLEF Edit</Link>
      </div>
    </section>
  );
};

export default AccountDashboard;
