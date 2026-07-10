import React from 'react';

const SearchSectionProductList2: React.FC = () => {
    return (
        <section className="pt-12">
  <div className="container px-4 mx-auto">
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between flex-wrap mb-6">
      <div>
        <h1 className="font-heading text-slate-800 text-2xl font-semibold">Found 420 results for</h1>
        <p className="text-slate-400">Skincare, personal care &amp; fragrances</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <select className="rounded-sm border border-gray-200 py-3 px-4 text-gray-500 text-sm outline-none bg-white">
          <option value="newest">Sort by Newest</option>
          <option value="best-sellers">Sort by Best Sellers</option>
          <option value="price-low-high">Sort by Price: Low to High</option>
          <option value="price-high-low">Sort by Price: High to Low</option>
        </select>
        <div className="border border-gray-200 rounded-sm flex">
          <a className="flex-1 py-1 px-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200 clef-link-highlight" href="#">
            <div className="text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_2163d822bac4226a8e712bf6434c7db8" width={14} height={14} viewBox="0 0 14 14" fill="none" />
            </div>
          </a>
          <a className="flex-1 py-1 px-4 flex items-center justify-center group hover:bg-gray-100 transition duration-200 clef-link-highlight" href="#">
            <div className="text-gray-400 group-hover:text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_bc8828dd16287bc0898693b118c0b92a" width={14} height={14} viewBox="0 0 14 14" fill="none" />
            </div>
          </a>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap -mx-4">
      <div className="pb-8 w-full md:w-2/3 lg:w-3/4 px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-rose-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/fdf2f8/7e22ce?text=Vitamin+C+Serum" alt="Vitamin C Glow Serum" />
              </div>
              <p className="text-slate-800">Vitamin C Glow Serum</p>
              <p className="text-slate-400">$ 36.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-purple-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-slate-700 py-1 px-3 rounded-full text-white text-xs font-bold text-center">Limited</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/f5f3ff/7e22ce?text=Hydrating+Cream" alt="Hyaluronic Hydrating Cream" />
              </div>
              <p className="text-slate-800">Hyaluronic Hydrating Cream</p>
              <p className="text-slate-400">$ 42.99</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-pink-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-white py-1 px-3 rounded-full text-slate-800 text-xs font-bold text-center">Sale</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/fce7f3/9d174d?text=Rose+Toner" alt="Rose Water Balancing Toner" />
              </div>
              <p className="text-slate-800">Rose Water Balancing Toner</p>
              <p className="text-slate-400">$ 24.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-amber-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/fff7ed/9a3412?text=Cleanser" alt="Gentle Daily Gel Cleanser" />
              </div>
              <p className="text-slate-800">Gentle Daily Gel Cleanser</p>
              <p className="text-slate-400">$ 19.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-sky-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/e0f2fe/0369a1?text=Mineral+SPF" alt="Mineral SPF 50 Face Sunscreen" />
              </div>
              <p className="text-slate-800">Mineral SPF 50 Face Sunscreen</p>
              <p className="text-slate-400">$ 28.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-emerald-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/ecfdf5/047857?text=Body+Lotion" alt="Shea Butter Body Lotion" />
              </div>
              <p className="text-slate-800">Shea Butter Body Lotion</p>
              <p className="text-slate-400">$ 22.50</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-violet-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/ede9fe/6d28d9?text=Lavender+Mist" alt="Lavender Pillow & Body Mist" />
              </div>
              <p className="text-slate-800">Lavender Pillow &amp; Body Mist</p>
              <p className="text-slate-400">$ 18.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-fuchsia-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/fae8ff/a21caf?text=Floral+Perfume" alt="Bloom Eau de Parfum" />
              </div>
              <p className="text-slate-800">Bloom Eau de Parfum</p>
              <p className="text-slate-400">$ 89.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-stone-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-white py-1 px-3 rounded-full text-slate-800 text-xs font-bold text-center">Sale</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/f5f5f4/44403c?text=Oud+Cologne" alt="Warm Oud Cologne" />
              </div>
              <p className="text-slate-800">Warm Oud Cologne</p>
              <p className="text-slate-400">$ 76.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-lime-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/ecfccb/4d7c0f?text=Hand+Wash" alt="Botanical Hand Wash" />
              </div>
              <p className="text-slate-800">Botanical Hand Wash</p>
              <p className="text-slate-400">$ 14.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-cyan-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/cffafe/0e7490?text=Shampoo" alt="Nourishing Repair Shampoo" />
              </div>
              <p className="text-slate-800">Nourishing Repair Shampoo</p>
              <p className="text-slate-400">$ 21.00</p>
            </a>
          </div>
          <div className="w-full xs:w-1/2 lg:w-1/3 px-4">
            <a className="block mb-10 group clef-link-highlight" href="/product/sample-product">
              <div className="w-full h-64 bg-red-50 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                <div className="absolute left-5 top-5 uppercase bg-orange-500 py-1 px-3 rounded-full text-white text-xs font-bold text-center">New</div>
                <img className="max-h-full object-contain rounded-lg" src="https://placehold.co/420x420/fee2e2/b91c1c?text=Lip+Treatment" alt="Peptide Lip Treatment" />
              </div>
              <p className="text-slate-800">Peptide Lip Treatment</p>
              <p className="text-slate-400">$ 16.00</p>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 order-first md:order-last px-4">
        <div className="py-6 border-b border-t border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Category</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <ul className="text-gray-600 flex flex-col gap-2 mt-4">
              <li className="hover:text-slate-800 transition duration-200"><a href="/shop/skincare">Skincare</a></li>
              <li className="hover:text-slate-800 transition duration-200"><a href="/shop/personal-care">Personal Care</a></li>
              <li className="hover:text-slate-800 transition duration-200"><a href="/shop/fragrance">Fragrances</a></li>
              <li className="hover:text-slate-800 transition duration-200">
              </li><li className="hover:text-slate-800 transition duration-200">
              </li></ul>
          </div>
        </div>
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Scent family</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <ul className="text-gray-600 flex flex-col gap-3 mt-4">
              <li><a className="hover:text-slate-800 transition duration-200 clef-link-highlight" href="#">Floral</a></li>
              <li><a className="hover:text-slate-800 transition duration-200 clef-link-highlight" href="#">Fresh &amp; citrus</a></li>
              <li><a className="hover:text-slate-800 transition duration-200 clef-link-highlight" href="#">Woody</a></li>
              <li><a className="hover:text-slate-800 transition duration-200 clef-link-highlight" href="#">Warm &amp; spicy</a></li>
              <li><a className="hover:text-slate-800 transition duration-200 clef-link-highlight" href="#">Clean musk</a></li>
            </ul>
            <a href="#">
              <div className="flex items-center gap-2 group mt-4">
                <span className="text-purple-500 text-sm font-medium group-hover:text-purple-600 transition duration-200">Show more scent notes</span>
                <div className="text-purple-500 group-hover:text-purple-600 transition duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" id="svg_0ae01b21b9b542b4c5619394db0e52db" width={20} height={20} viewBox="0 0 20 20" fill="none" />
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Benefits</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <ul className="text-gray-600 flex flex-col gap-3 mt-4">
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Hydrating</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Brightening</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Anti-aging</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Sensitive skin friendly</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Long-lasting scent</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Skin type</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <div className="flex flex-wrap mt-4">
              <div className="w-1/2 p-2">
                <div className="flex items-center justify-center border py-3 px-4 rounded-sm text-center text-sm cursor-pointer transition duration-200 border-purple-500 text-purple-700">All</div>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex items-center justify-center border py-3 px-4 rounded-sm text-center text-sm cursor-pointer transition duration-200 border-gray-200 hover:border-purple-500 hover:text-purple-700 text-gray-600">Dry</div>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex items-center justify-center border py-3 px-4 rounded-sm text-center text-sm cursor-pointer transition duration-200 border-gray-200 hover:border-purple-500 hover:text-purple-700 text-gray-600">Oily</div>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex items-center justify-center border py-3 px-4 rounded-sm text-center text-sm cursor-pointer transition duration-200 border-gray-200 hover:border-purple-500 hover:text-purple-700 text-gray-600">Combination</div>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex items-center justify-center border py-3 px-4 rounded-sm text-center text-sm cursor-pointer transition duration-200 border-gray-200 hover:border-purple-500 hover:text-purple-700 text-gray-600">Sensitive</div>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex items-center justify-center border py-3 px-4 rounded-sm text-center text-sm cursor-pointer transition duration-200 border-gray-200 hover:border-purple-500 hover:text-purple-700 text-gray-600">Mature</div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Product preferences</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <ul className="text-gray-600 flex flex-col gap-3 mt-4">
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Vegan</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Cruelty-free</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Fragrance-free skincare</span>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="h-5 w-5 rounded-sm border-gray-200 accent-purple-600" type="checkbox" />
                  <span>Dermatologist tested</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Availability</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-medium mb-2">Store or city</label>
              <input className="w-full py-3 px-4 rounded-sm border border-gray-200 outline-none focus:border-purple-500" type="text" placeholder="Enter your city" />
            </div>
            <label className="block text-gray-600 text-sm font-medium mb-2">Fulfillment</label>
            <select className="w-full rounded-sm border border-gray-200 py-3 px-4 text-gray-600 text-sm outline-none bg-white focus:border-purple-500">
              <option value="in-stock-online">In stock online</option>
              <option value="pickup-today">Pickup today</option>
              <option value="same-day-delivery">Same-day delivery</option>
            </select>
          </div>
        </div>
        <div className="py-6">
          <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
            <p className="text-slate-800 font-semibold">Price</p>
            <span className="inline-block transform rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_9123ca839068ce4ed4c683acb43cdd44" width={24} height={25} viewBox="0 0 24 25" fill="none" />
            </span>
          </div>
          <div className="overflow-hidden duration-500">
            <input className="w-full mt-8 accent-purple-600" type="range" max={150} min={0} defaultValue={75} />
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-gray-600 text-sm font-medium">$0</p>
              <p className="text-gray-600 text-sm font-medium">$150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default SearchSectionProductList2;
