import React from 'react';
import Head from 'next/head';
import AccountSectionCustomComponents1 from '../../components/custom-components/AccountSectionCustomComponents1';
import AccountDashboard from '../../components/account/AccountDashboard';
import AccountSectionFooters3 from '../../components/footers/AccountSectionFooters3';

const Account: React.FC = () => (
  <>
    <Head>
      <title>Account | CLEF</title>
      <link rel="icon" type="image/png" sizes="32x32" href="/shuffle-for-tailwind.png" />
    </Head>
    <AccountSectionCustomComponents1 />
    <AccountDashboard />
    <AccountSectionFooters3 />
  </>
);

export default Account;
