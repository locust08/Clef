import Link from 'next/link';

const AccountDashboard: React.FC = () => (
  <section className="container mx-auto px-4 py-12">
    <h1 className="font-heading text-3xl font-semibold text-rhino-700 mb-6">My Account</h1>
    <div className="grid gap-4 md:grid-cols-3">
      <Link className="rounded-xl border border-coolGray-200 bg-white p-6 hover:border-purple-500 clef-button-secondary" href="/account/history">Order History</Link>
      <Link className="rounded-xl border border-coolGray-200 bg-white p-6 hover:border-purple-500 clef-button-secondary" href="/account/favourite">Favourites</Link>
      <Link className="rounded-xl border border-coolGray-200 bg-white p-6 hover:border-purple-500 clef-button-secondary" href="/clef-edit">CLEF Edit</Link>
    </div>
  </section>
);

export default AccountDashboard;
