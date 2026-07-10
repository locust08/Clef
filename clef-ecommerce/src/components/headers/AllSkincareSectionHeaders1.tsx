import React from 'react';
import type { StorefrontProduct } from '../../lib/medusa-products';

const HERO_TEXT_COLOR = '#8f5a00';

type AllSkincareSectionHeaders1Props = {
  backgroundImage?: string;
  products?: StorefrontProduct[];
};

const AllSkincareSectionHeaders1: React.FC<AllSkincareSectionHeaders1Props> = ({
  backgroundImage = 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/5cb097d9-0f1d-4b51-9ad3-3cfab9fcfeec.png',
  products = [],
}) => {
  return (
    <section className="relative bg-black overflow-hidden">
      <nav className="relative border-b border-coolGray-200" />
      <div className="relative">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={backgroundImage}
          alt=""
        />
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="pt-24 pb-20 text-left max-w-full md:max-w-[520px] lg:max-w-[560px] xl:max-w-[620px]">
              <div className="max-w-[460px] lg:max-w-[500px]">
                <h1
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-heading font-semibold mb-8"
                  style={{ color: HERO_TEXT_COLOR }}
                >
                  Take care of your performance every day.
                </h1>
                <div className="flex items-center justify-start flex-wrap gap-6 mb-14">
                  <a
                    className="inline-flex h-12 py-1 px-6 items-center text-center text-sm font-medium text-white rounded-sm bg-purple-500 hover:bg-purple-600 transition duration-200 clef-button-primary"
                    href="/shop/skincare"
                  >
                    Start Buying
                  </a>
                  <a
                    className="flex items-center gap-2 group clef-link-highlight"
                    href="#"
                    style={{ color: HERO_TEXT_COLOR }}
                  >
                    <div
                      className="group-hover:text-opacity-80 transition duration-200"
                      style={{ color: HERO_TEXT_COLOR }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="svg_793df37af97c7f82a4102e5372b45462"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                      />
                    </div>
                    <span
                      className="text-sm font-medium group-hover:text-opacity-80 transition duration-200"
                      style={{ color: HERO_TEXT_COLOR }}
                    >
                      Check our Catalog
                    </span>
                  </a>
                </div>
              </div>
              <p
                className="text-left text-sm font-medium mb-4"
                style={{ color: HERO_TEXT_COLOR }}
              >
                Top Products
              </p>
              <div className="flex -mx-2 flex-wrap justify-start">
                {products.map((product) => (
                  <div className="w-1/3 p-2" key={product.id}>
                    <a
                      className="bg-white rounded-xl p-2 flex items-center justify-center clef-link-highlight"
                      href={
                        product.handle === '#' ? '#' : `/product/${product.handle}`
                      }
                      aria-label={product.name || 'Top product placeholder'}
                    >
                      <div className="rounded-md aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            className="max-w-full max-h-full object-contain"
                            src={product.image}
                            alt={product.name}
                          />
                        ) : null}
                      </div>
                    </a>
                  </div>
                ))}
                <div className="w-1/3 p-2" />
                <div className="w-1/3 p-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
        <div className="fixed inset-0 bg-purple-800 opacity-70" />
        <nav className="relative flex flex-col pt-12 pb-6 px-8 w-full h-full bg-white overflow-y-auto">
          <div className="flex mb-12 items-center">
            <a className="inline-block mr-auto clef-link-highlight" href="/">
              <img
                className="h-8"
                src="/coleos-assets/logos/logo-coleos-2.svg"
                alt=""
              />
            </a>
            <button className="clef-icon-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="svg_3ddd1d818755a7037cf896434eebf83c"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              />
            </button>
          </div>
          <div className="flex w-full max-w-xs items-center px-6 border border-coolGray-200 rounded-full">
            <input
              className="h-12 w-full bg-transparent border-0 text-sm text-coolGray-500 placeholder-coolGray-500 outline-none"
              type="search"
              placeholder="Search..."
            />
            <button
              className="inline-block ml-auto text-coolGray-400 hover:text-rhino-500 clef-icon-button"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="svg_bbf318077f70ea840119eb16035dbcc2"
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
              />
            </button>
          </div>
          <div className="py-12 mb-auto">
            <ul className="flex-col">
              <li className="mb-3">
                <a
                  className="group mr-6 inline-flex items-center text-base clef-link-highlight"
                  href="#"
                >
                  <span className="mr-2 text-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="svg_7153d439647c30729c8ca9ac10f27afe"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                    />
                  </span>
                  <span className="font-semibold text-rhino-700">Login</span>
                </a>
              </li>
              <li className="mb-3">
                <a
                  className="group mr-6 inline-flex items-center text-base clef-link-highlight"
                  href="#"
                >
                  <span className="mr-2 text-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="svg_fdd8e11ea82ef0f6708c7eaed6406bbe"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                    />
                  </span>
                  <span className="font-semibold text-rhino-700">Favorite</span>
                </a>
              </li>
              <li className="mb-12">
                <a
                  className="inline-flex items-center text-base text-purple-400 hover:text-purple-200 clef-link-highlight"
                  href="#"
                >
                  <span className="mr-2 text-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="svg_e17ebed2719e6172144e22eed2b983f9"
                      width={18}
                      height={17}
                      viewBox="0 0 18 17"
                      fill="none"
                    />
                  </span>
                  <span className="font-semibold text-rhino-700">Cart</span>
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight"
                  href="#"
                >
                  <span className="mr-2">Sport shoes</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg_7c8b93e4d600179854b84d406946abad"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                  />
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight"
                  href="#"
                >
                  <span className="mr-2">Summer Collection</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg_7c8b93e4d600179854b84d406946abad"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                  />
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight"
                  href="/shop/skincare"
                >
                  Products
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight"
                  href="#"
                >
                  Blog
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight"
                  href="/shop/skincare"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  className="flex items-center text-base font-bold text-rhino-700 hover:text-rhino-400 clef-link-highlight"
                  href="#"
                >
                  Our Bestsellers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-center text-sm text-coolGray-400">
              Coleos Shuffle 2026
            </p>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default AllSkincareSectionHeaders1;
