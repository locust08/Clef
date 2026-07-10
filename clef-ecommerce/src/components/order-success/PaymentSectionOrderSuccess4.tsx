import React from 'react';

const PaymentSectionOrderSuccess4: React.FC = () => {
    return (
        <section className="z-50 fixed inset-0 h-full w-full bg-gray-800 bg-opacity-80 overflow-hidden">
  <div className="absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 md:p-8 w-full h-full overflow-y-auto">
    <div className="bg-white w-full max-w-2xl rounded-xl mx-auto">
      <div className="py-12 border-b border-gray-100">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" fill="none">
              <circle opacity="0.3" cx={32} cy={32} r={32} fill="#C8C7FD" />
              <circle cx={32} cy={32} r={24} fill="#C8C7FD" />
              <path d="M41.28 24.4655C41.0779 24.2969 40.8447 24.1695 40.5933 24.0911C40.3419 24.0127 40.0775 23.9842 39.8154 24.0083C39.5534 24.0321 39.2983 24.1072 39.0654 24.2299C38.8321 24.3522 38.6257 24.5194 38.4575 24.7218L29.8487 35.0499L25.3927 30.5939C25.015 30.2292 24.5093 30.0271 23.9844 30.0318C23.4596 30.0365 22.9576 30.247 22.5862 30.6183C22.2152 30.9893 22.0044 31.4914 22.0001 32.0165C21.9954 32.5414 22.1971 33.0471 22.5618 33.4244L28.5675 39.4301C28.7538 39.6165 28.975 39.7642 29.2186 39.8651C29.4623 39.9657 29.7234 40.0173 29.9868 40.0166H30.0769C30.3551 40.0042 30.6279 39.9342 30.8776 39.8102C31.1269 39.6865 31.3481 39.5119 31.5264 39.2981L41.5353 27.2867C41.7039 27.0846 41.8309 26.8514 41.9093 26.6003C41.9877 26.3493 42.0156 26.0852 41.9918 25.8231C41.968 25.5611 41.8929 25.3067 41.7706 25.0738C41.6482 24.8409 41.4813 24.6344 41.2793 24.4658L41.28 24.4655Z" fill="#7573F9" />
            </svg>
          </div>
          <p className="uppercase text-rhino-300 font-bold text-xs tracking-widest text-center mb-1">SUCCESS</p>
          <h1 className="font-heading text-center text-3xl md:text-4xl text-rhino-700 font-semibold mb-6">Your order has been placed</h1>
          <p className="text-center mb-8 text-rhino-300 text-sm lg:text-lg max-w-md mx-auto">Build a well-presented brand that everyone will love. Take care to develop resources continually and integrity them with previous projects.</p>
          <div className="flex justify-center">
            <a className="py-3 px-4 bg-purple-500 rounded-sm text-center text-sm font-medium text-white hover:bg-purple-600 transition duration-200 clef-button-primary" href="/shop/skincare">Continue Shopping</a>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="container px-4 mx-auto">
          <h2 className="text-lg text-rhino-500 font-semibold mb-6 px-4">Related Products</h2>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-4">
              <div className="bg-gray-100 px-6 flex items-center justify-center mb-4 rounded-sm">
                <img src="/coleos-assets/order-success/product.png" alt="" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-rhino-500">Gray sport bag</p>
                  <p className="text-rhino-300 text-sm">$ 65.90</p>
                </div>
                <a className="px-4 py-1 rounded-sm border border-purple-500 text-purple-500 text-sm font-medium hover:bg-purple-500 hover:text-white transition duration-200 clef-button-secondary" href="/product/sample-product">Buy Now</a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <div className="bg-gray-100 px-6 flex items-center justify-center mb-4 rounded-sm">
                <img src="/coleos-assets/order-success/product.png" alt="" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-rhino-500">Gray sport bag</p>
                  <p className="text-rhino-300 text-sm">$ 65.90</p>
                </div>
                <a className="px-4 py-1 rounded-sm border border-purple-500 text-purple-500 text-sm font-medium hover:bg-purple-500 hover:text-white transition duration-200 clef-button-secondary" href="/product/sample-product">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default PaymentSectionOrderSuccess4;