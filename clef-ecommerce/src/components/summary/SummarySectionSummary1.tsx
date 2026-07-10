import React from 'react';

const SummarySectionSummary1: React.FC = () => {
    return (
        <section className="py-12">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap -mx-4 justify-between">
      <div className="w-full lg:w-1/2 px-4">
        <img className="mb-8" src="/coleos-assets/summary/image1.png" alt="" />
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="px-5 py-4">
            <p className="uppercase text-rhino-300 text-xs font-bold tracking-widest">Watch overview</p>
            <h2 className="font-heading text-rhino-800 text-2xl font-semibold">Order setup video</h2>
            <p className="text-rhino-400 text-sm mt-1">Learn more about your products and how to get started.</p>
          </div>
          <video className="w-full aspect-video bg-gray-100" controls poster="https://placehold.co/800x450">
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-4">
        <p className="uppercase text-rhino-300 text-xs font-bold tracking-widest">Your payment went through</p>
        <h1 className="font-heading text-rhino-700 text-4xl font-semibold mb-6">Thanks for ordering</h1>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="font-heading text-2xl font-semibold text-rhino-800">ID number: A645-002/2023</h2>
          <a className="py-1 px-4 rounded-sm border border-gray-200 shadow-md flex items-center gap-2 text-purple-500 text-sm font-medium hover:text-white hover:bg-purple-500 transition duration-200 clef-button-secondary" href="#">
            <span>Your invoice</span>
            <svg xmlns="http://www.w3.org/2000/svg" id="svg_da82e7d2307418d58fb3fbeb927af3f9" width={20} height={20} viewBox="0 0 20 20" fill="none" />
          </a>
        </div>
        <div className="flex items-center gap-6 flex-wrap mb-6">
          <p className="text-rhino-400 text-sm">
            <span>Order date:</span>
            <span />
            <span className="text-rhino-700">May 17, 2026</span>
          </p>
          <div className="h-full w-px bg-rhino-200" />
          <div className="flex flex-wrap items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" id="svg_0deeba168b0a389a7d2c6f181e5367a3" width={12} height={12} viewBox="0 0 12 12" fill="none" />
            <span className="text-green-500 text-sm font-medium">Planned delivery: May 22, 2026</span>
          </div>
        </div>
        <div className="py-6 border-t border-b border-gray-100">
          <div className="flex flex-wrap gap-6">
            <div className="bg-gray-100 rounded-lg w-40 h-40 flex items-center justify-center">
              <img src="/coleos-assets/summary/product1.png" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-rhino-800 text-lg font-semibold">GrayBlack SportLock</h2>
                <p className="text-rhino-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <p className="text-rhino-800 text-2xl font-bold">$132.00</p>
              <p className="text-rhino-800 text-sm">Qty: 1</p>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-b border-gray-100">
          <div className="flex flex-wrap gap-6">
            <div className="bg-gray-100 rounded-lg w-40 h-40 flex items-center justify-center">
              <img src="/coleos-assets/summary/product2.png" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-rhino-800 text-lg font-semibold">GrayBlack SportLock</h2>
                <p className="text-rhino-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <p className="text-rhino-800 text-2xl font-bold">$209.00</p>
              <p className="text-rhino-800 text-sm">Qty: 1</p>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-b border-gray-100 mb-6">
          <div className="flex flex-wrap gap-6">
            <div className="bg-gray-100 rounded-lg w-40 h-40 flex items-center justify-center">
              <img src="/coleos-assets/summary/product3.png" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-rhino-800 text-lg font-semibold">GrayBlack SportLock</h2>
                <p className="text-rhino-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <p className="text-rhino-800 text-2xl font-bold">$65.00</p>
              <p className="text-rhino-800 text-sm">Qty: 1</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-100 rounded-xl py-4 px-6 flex items-center justify-between flex-wrap">
          <p className="text-rhino-800">Subtotal</p>
          <p className="text-rhino-400 font-heading text-xl font-semibold">$132.00</p>
        </div>
        <div className="py-4 px-6 flex items-center justify-between flex-wrap">
          <p className="text-rhino-800">Shipping</p>
          <p className="text-rhino-400 font-heading text-xl font-semibold">$5.00</p>
        </div>
        <div className="bg-purple-100 rounded-xl py-4 px-6 flex items-center justify-between flex-wrap">
          <p className="text-rhino-800">Taxes</p>
          <p className="text-rhino-400 font-heading text-xl font-semibold">$23.00</p>
        </div>
        <div className="py-4 px-6 flex items-center justify-between flex-wrap mb-6 border-b border-gray-100">
          <p className="text-rhino-800">Order total</p>
          <p className="text-rhino-800 font-heading text-xl font-semibold">$160.00</p>
        </div>
        <div className="flex flex-wrap flex-col xs:flex-row justify-between items-start gap-2 px-6 mb-6">
          <ul className="text-sm">
            <li className="text-rhino-700">Delivery address</li>
            <li className="text-rhino-400">Morgan S Hembree</li>
            <li className="text-rhino-400">4767 Woodland Terrace</li>
            <li className="text-rhino-400">California, CA 95821</li>
          </ul>
          <ul className="text-sm">
            <li className="text-rhino-700">Shipping information</li>
            <li className="text-rhino-400">morgan@shuffleux.com</li>
            <li className="text-rhino-400">916-971-2145</li>
          </ul>
          <ul className="text-sm">
            <li className="text-rhino-700">Payment information</li>
            <li className="text-rhino-400">VISA card</li>
            <li className="text-rhino-400">Ending with 4242</li>
            <li className="text-rhino-400">Expires 02 / 28</li>
          </ul>
        </div>
        <div className="border-b border-gray-100 pb-6 px-6 mb-6"><a className="py-1 px-4 rounded-sm border border-gray-200 shadow-md text-sm font-medium text-purple-500 mb-6 hover:text-white hover:bg-purple-500 transition duration-200 clef-button-secondary" href="/clef-edit">Edit</a></div>
        <div className="flex justify-end"><a className="px-4 py-3 rounded-sm text-center text-white text-sm font-medium bg-purple-500 hover:bg-purple-600 transition duration-200 clef-button-primary" href="/shop/skincare">Go back to shop</a></div>
      </div>
    </div>
  </div>
</section>


    );
};

export default SummarySectionSummary1;