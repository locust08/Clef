import React from 'react';

const FragranceSectionProductBlocks4: React.FC = () => {
    return (
        <section className="py-12 md:py-24 lg:py-32">
  <div className="container px-4 mx-auto">
    <h2 className="text-4xl text-center font-heading font-semibold text-rhino-600 tracking-xs mb-14">Our products</h2>
    <div className="flex flex-wrap -mx-4 -mb-8 justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 px-4 pb-8">
        <a className="relative flex flex-col items-start h-72 py-6 px-6 bg-coolGray-100 rounded-xl border-2 border-transparent hover:border-purple-500 transition duration-150 clef-button-secondary" href="/shop/fragrance/rose-collection">
          <span className="relative z-10 inline-block py-1 px-3 text-2xs text-white font-bold bg-rhino-600 uppercase rounded-full">Floral</span>
          <img className="absolute top-0 left-1/2 mt-8 transform -translate-x-1/2 max-h-44 object-contain" src="/coleos-assets/product-list/product1.png" alt="Rose Collection fragrance" />
          <div className="relative z-10 w-full px-8 mt-auto text-center">
            <span className="block text-base text-rhino-500 mb-1">Rose Collection</span>
            <span className="block text-base text-rhino-300">A rose for every stage</span>
          </div>
        </a>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-4 pb-8">
        <a className="relative flex flex-col items-start h-72 py-6 px-6 bg-coolGray-100 rounded-xl border-2 border-transparent hover:border-purple-500 transition duration-150 clef-button-secondary" href="/shop/fragrance/little-delights-collection">
          <span className="relative z-10 inline-block py-1 px-3 text-2xs text-rhino-700 font-bold bg-white uppercase rounded-full">Everyday</span>
          <img className="absolute top-0 left-1/2 mt-8 transform -translate-x-1/2 max-h-44 object-contain" src="/coleos-assets/product-list/product4.png" alt="Little Delights Collection fragrance" />
          <div className="relative z-10 w-full px-8 mt-auto text-center">
            <span className="block text-base text-rhino-500 mb-1">Little Delights Collection</span>
            <span className="block text-base text-rhino-300">Live a little and your life will come alive</span>
          </div>
        </a>
      </div>
    </div>
    <div className="mt-12 text-center">
      <a className="inline-flex h-12 py-2 px-4 items-center justify-center text-sm font-medium text-purple-500 hover:text-white bg-white border border-purple-500 rounded-sm hover:bg-purple-500 transition duration-200 clef-button-secondary" href="/shop/fragrance/rose-collection">Explore fragrance collections</a>
    </div>
  </div>
</section>


    );
};

export default FragranceSectionProductBlocks4;
