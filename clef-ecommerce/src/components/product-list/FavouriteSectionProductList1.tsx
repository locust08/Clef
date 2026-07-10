import React from 'react';

const FavouriteSectionProductList1: React.FC = () => {
    return (
        <section className="pt-12 bg-white">
  <div className="container px-4 mx-auto">
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between flex-wrap mb-6">
      <div>
        <h1 className="font-heading text-rhino-700 text-2xl font-semibold">Your Favorites</h1>
        <p className="text-rhino-300">12 items saved</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <select className="rounded-sm border border-coolGray-200 py-3 px-4 text-coolGray-400 text-sm outline-none">
          <option value="newest">Sort by Newest</option>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
        <button className="rounded-sm border border-coolGray-200 py-3 px-4 text-coolGray-700 text-sm hover:bg-coolGray-100 transition duration-200 clef-button-secondary">Clear all</button>
      </div>
    </div>
    <div className="pb-8 w-full">
      <div className="flex flex-wrap -mx-4 favorites-grid">
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Nike Sport Shoes" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Nike Sport Shoes V2.04</p>
              <p className="text-rhino-300">$ 199.00</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <div className="absolute left-5 top-5 uppercase bg-rhino-600 py-1 px-3 rounded-full text-white text-xs font-bold text-center">Limited</div>
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="White Label Cap" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">White Label Cap</p>
              <p className="text-rhino-300">$ 48.99</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <div className="absolute left-5 top-5 uppercase bg-white py-1 px-3 rounded-full text-rhino-700 text-xs font-bold text-center">Sale</div>
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Nike Sport Shoes" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Nike Sport Shoes V2.04</p>
              <p className="text-rhino-300">$ 199.00</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Summer Slim Shorts" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Summer Slim Shorts</p>
              <p className="text-rhino-300">$ 79.00</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Nike Sport Shoes" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Nike Sport Shoes V2.04</p>
              <p className="text-rhino-300">$ 199.00</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Brown Original Jacket" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Brown Original 64's Jacket</p>
              <p className="text-rhino-300">$ 249.00</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Colorful t-shirts" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Set of colorful t-shirts</p>
              <p className="text-rhino-300">$ 98.00</p>
            </a>
          </div>
        </div>
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 px-4">
          <div className="relative block mb-10 group favorite-item">
            <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
              <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
              <button className="favorite-remove absolute right-5 top-5 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-50 transition duration-200 text-red-500 clef-icon-button" aria-label="Remove from favorites">
                <span className="text-lg leading-none">❤</span>
              </button>
              <img src="https://placehold.co/220x220" alt="Blue Hoodie" />
            </div>
            <a href="/product/sample-product">
              <p className="text-rhino-700">Blue High School Hoodie</p>
              <p className="text-rhino-300">$ 65.90</p>
            </a>
          </div>
        </div>
      </div>
      <div className="favorites-empty hidden text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-coolGray-100 rounded-full text-coolGray-400 text-3xl">♡</div>
        <h2 className="font-heading text-rhino-700 text-xl font-semibold mb-2">No favorites yet</h2>
        <p className="text-rhino-300 mb-6">Items you add to favorites will show up here.</p>
        <a href="#" className="inline-block py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-sm transition duration-200 clef-button-primary">Browse products</a>
      </div>
    </div>
  </div>
</section>


    );
};

export default FavouriteSectionProductList1;
