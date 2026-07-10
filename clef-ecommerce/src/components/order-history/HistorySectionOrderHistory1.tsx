import React from 'react';

const HistorySectionOrderHistory1: React.FC = () => {
    return (
        <section className="py-12 bg-coolGray-800">
  <div className="container px-4 mx-auto">
    <p className="text-rhino-300 text-center text-xs font-bold tracking-widest uppercase">Recent orders</p>
    <h1 className="font-heading text-white text-center text-4xl font-semibold mb-12">Order History</h1>
    <div className="bg-white rounded-xl shadow-md mb-6">
      <div className="p-6 border-b border-gray-100">
        <div className="mb-4 inline-block py-1 px-3 rounded-xl bg-orange-100 uppercase text-orange-500 text-xs font-bold tracking-widest">pending</div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="font-heading text-rhino-800 text-2xl font-semibold">ID number: A645-002/2023</h2>
          <div className="flex flex-wrap gap-2">
            <a className="py-2 px-4 text-purple-500 border border-gray-200 rounded-sm text-center text-sm font-medium shadow-md hover:bg-purple-500 hover:text-white transition duration-200 clef-button-secondary" href="#">Your invoice</a>
            <a className="py-2 px-4 bg-purple-500 rounded-sm text-center text-sm text-white font-medium hover:bg-purple-600 transition duration-200 clef-button-primary" href="#">Track order</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <p className="text-rhino-400 text-sm">
            <span>Order number:</span>
            <span />
            <span className="text-rhino-700">A654W-4QR</span>
          </p>
          <div className="h-3 w-px bg-rhino-200" />
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 8.625V7.5L7.125 4.5V1.125C7.125 0.503657 6.62134 0 6 0C5.37866 0 4.875 0.503657 4.875 1.125V4.5L0 7.5V8.625L4.875 7.125V10.125L3.75 10.875V12L6 11.25L8.25 12V10.875L7.125 10.125V7.125L12 8.625Z" fill="#06B83A" />
            </svg>
            <span className="text-green-500 text-sm font-medium">Planned delivery: May 22, 2026</span>
          </div>
        </div>
      </div>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center flex-wrap -mx-6">
          <div className="w-full md:w-auto px-4 mb-6 md:mb-0">
            <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
              <img src="/coleos-assets/order-history/product1.png" alt="" />
            </div>
          </div>
          <div className="w-full md:w-2/3 xl:w-5/6 px-4 flex-grow">
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4 mb-2">
              <h2 className="text-rhino-800 font-semibold">GrayBlack SportLock</h2>
              <p className="text-rhino-500 font-semibold">$132.00</p>
            </div>
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-rhino-300 text-sm">Black</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">43</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">Individual</p>
              </div>
              <p className="text-sm text-rhino-300">Qty: 1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center flex-wrap -mx-6">
          <div className="w-full md:w-auto px-4 mb-6 md:mb-0">
            <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
              <img src="/coleos-assets/order-history/product2.png" alt="" />
            </div>
          </div>
          <div className="w-full md:w-2/3 xl:w-5/6 px-4 flex-grow">
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4 mb-2">
              <h2 className="text-rhino-800 font-semibold">GrayBlack SportLock</h2>
              <p className="text-rhino-500 font-semibold">$132.00</p>
            </div>
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-rhino-300 text-sm">Black</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">43</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">Individual</p>
              </div>
              <p className="text-sm text-rhino-300">Qty: 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md mb-6">
      <div className="p-6 border-b border-gray-100">
        <div className="mb-4 inline-block py-1 px-3 rounded-xl bg-green-100 uppercase text-green-500 text-xs font-bold tracking-widest">Completed</div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="font-heading text-rhino-800 text-2xl font-semibold">ID number: D641-027/2023</h2>
          <div className="flex flex-wrap gap-2">
            <a className="py-2 px-4 text-purple-500 border border-gray-200 rounded-sm text-center text-sm font-medium shadow-md hover:bg-purple-500 hover:text-white transition duration-200 clef-button-secondary" href="#">Your invoice</a>
            <a className="py-2 px-4 bg-purple-500 rounded-sm text-center text-sm text-white font-medium hover:bg-purple-600 transition duration-200 clef-button-primary" href="#">Track order</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <p className="text-rhino-400 text-sm">
            <span>Order number:</span>
            <span />
            <span className="text-rhino-700">A654W-4QR</span>
          </p>
          <div className="h-3 w-px bg-rhino-200" />
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 8.625V7.5L7.125 4.5V1.125C7.125 0.503657 6.62134 0 6 0C5.37866 0 4.875 0.503657 4.875 1.125V4.5L0 7.5V8.625L4.875 7.125V10.125L3.75 10.875V12L6 11.25L8.25 12V10.875L7.125 10.125V7.125L12 8.625Z" fill="#06B83A" />
            </svg>
            <span className="text-green-500 text-sm font-medium">Planned delivery: April 29, 2026</span>
          </div>
        </div>
      </div>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center flex-wrap -mx-6">
          <div className="w-full md:w-auto px-4 mb-6 md:mb-0">
            <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
              <img src="/coleos-assets/order-history/product3.png" alt="" />
            </div>
          </div>
          <div className="w-full md:w-2/3 xl:w-5/6 px-4 flex-grow">
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4 mb-2">
              <h2 className="text-rhino-800 font-semibold">GrayBlack SportLock</h2>
              <p className="text-rhino-500 font-semibold">$132.00</p>
            </div>
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-rhino-300 text-sm">Black</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">43</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">Individual</p>
              </div>
              <p className="text-sm text-rhino-300">Qty: 1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center flex-wrap -mx-6">
          <div className="w-full md:w-auto px-4 mb-6 md:mb-0">
            <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
              <img src="/coleos-assets/order-history/product4.png" alt="" />
            </div>
          </div>
          <div className="w-full md:w-2/3 xl:w-5/6 px-4 flex-grow">
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4 mb-2">
              <h2 className="text-rhino-800 font-semibold">GrayBlack SportLock</h2>
              <p className="text-rhino-500 font-semibold">$132.00</p>
            </div>
            <div className="flex flex-col xs:flex-row flex-wrap xs:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-rhino-300 text-sm">Black</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">43</p>
                <div className="w-px h-3 bg-rhino-200" />
                <p className="text-rhino-300 text-sm">Individual</p>
              </div>
              <p className="text-sm text-rhino-300">Qty: 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default HistorySectionOrderHistory1;