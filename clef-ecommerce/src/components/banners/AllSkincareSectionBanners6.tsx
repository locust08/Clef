import React from 'react';

const AllSkincareSectionBanners6: React.FC = () => {
    return (
        <section className="relative overflow-hidden py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 px-4 pb-4 lg:pb-0">
              <a className="relative block clef-link-highlight" href="/shop/skincare/anti-aging" aria-label="Shop Anti Aging">
                <img className="rounded-xl object-cover w-full" src="/coleos-assets/banners/image7.png" alt="" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="font-heading text-3xl font-semibold text-center text-white">Anti Aging </h2>
                </div>
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <a className="relative block clef-link-highlight" href="/shop/skincare/ocean-elixir" aria-label="Shop Ocean Elixir">
                <img className="rounded-xl object-cover w-full" src="/coleos-assets/banners/image6-small.png" alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h2 className="font-heading text-3xl font-semibold text-center text-white">Ocean Elixir</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="w-full px-4 pt-4">
            <a className="relative block clef-link-highlight" href="/shop/skincare/sheet-mask" aria-label="Shop Sheet Mask">
              <img className="rounded-xl w-full object-cover" src="/coleos-assets/banners/image5-large.png" alt="" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="font-heading text-3xl font-semibold text-center text-white">Sheet Mask</h2>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-4 pt-4 lg:pt-0">
        <a className="relative block h-full clef-link-highlight" href="/shop/skincare/facial-mask" aria-label="Shop Facial Mask">
          <img className="rounded-xl w-full h-full object-cover" src="/coleos-assets/banners/image4-large.png" alt="" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="font-heading text-3xl font-semibold text-center text-white">Facial Mask</h2>
          </div>
        </a>
      </div>
    </div>
  </div>
</section>


    );
};

export default AllSkincareSectionBanners6;
