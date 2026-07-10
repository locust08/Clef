import Link from 'next/link';
import React from 'react';
import { useMockCart } from '../../context/MockCartContext';

const IS_MOCK_LOGGED_IN = false;

const HeaderIconActions: React.FC = () => {
  const { itemCount, openCart } = useMockCart();
  const accountHref = IS_MOCK_LOGGED_IN ? '/account' : '/login';
  const accountLabel = IS_MOCK_LOGGED_IN ? 'My account' : 'Login';

  return (
    <>
      <Link
        aria-label="View favourites"
        className="inline-block mr-6 text-coolGray-400 hover:text-coolGray-600 clef-link-highlight"
        href="/account/favourite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M21.2913 4.61183C20.7805 4.10083 20.1741 3.69547 19.5066 3.41891C18.8392 3.14235 18.1238 3 17.4013 3C16.6788 3 15.9634 3.14235 15.2959 3.41891C14.6285 3.69547 14.022 4.10083 13.5113 4.61183L12.4513 5.67183L11.3913 4.61183C10.3596 3.58013 8.96032 3.00053 7.50129 3.00053C6.04226 3.00053 4.64298 3.58013 3.61129 4.61183C2.5796 5.64352 2 7.04279 2 8.50183C2 9.96086 2.5796 11.3601 3.61129 12.3918L4.67129 13.4518L12.4513 21.2318L20.2313 13.4518L21.2913 12.3918C21.8023 11.8811 22.2076 11.2746 22.4842 10.6072C22.7608 9.93972 22.9031 9.22431 22.9031 8.50183C22.9031 7.77934 22.7608 7.06393 22.4842 6.39647C22.2076 5.72901 21.8023 5.12258 21.2913 4.61183V4.61183Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <button
        aria-label="Open cart"
        className="group relative inline-block mr-6 clef-icon-button"
        onClick={openCart}
        type="button"
      >
        <div className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
          {itemCount}
        </div>
        <div className="text-coolGray-400 group-hover:text-coolGray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M9 23C9.55228 23 10 22.5523 10 22C10 21.4477 9.55228 21 9 21C8.44772 21 8 21.4477 8 22C8 22.5523 8.44772 23 9 23Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 23C20.5523 23 21 22.5523 21 22C21 21.4477 20.5523 21 20 21C19.4477 21 19 21.4477 19 22C19 22.5523 19.4477 23 20 23Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 2H5L7.68 15.39C7.77144 15.8504 8.02191 16.264 8.38755 16.5583C8.75318 16.8526 9.2107 17.009 9.68 17H19.4C19.8693 17.009 20.3268 16.8526 20.6925 16.5583C21.0581 16.264 21.3086 15.8504 21.4 15.39L23 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      <Link
        aria-label="Search products"
        className="inline-block mr-6 text-coolGray-400 hover:text-coolGray-600 clef-link-highlight"
        href="/search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <Link
        aria-label={accountLabel}
        className="inline-block mr-10 text-coolGray-400 hover:text-coolGray-600 clef-link-highlight"
        href={accountHref}
      >
        <AccountIcon />
      </Link>
    </>
  );
};

const AccountIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M20 20V18C20 16.9391 19.5786 15.9217 18.8284 15.1716C18.0783 14.4214 17.0609 14 16 14H8C6.93913 14 5.92172 14.4214 5.17157 15.1716C4.42143 15.9217 4 16.9391 4 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default HeaderIconActions;
