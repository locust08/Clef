import React from 'react';

const ClefEditSectionBanners3: React.FC = () => {
    return (
        <section className="relative overflow-hidden">
  <div className="w-full bg-coolBlue-200 rounded-xl relative overflow-hidden">
    <img className="absolute top-0 right-0 w-full h-full object-cover hidden xs:block" src="https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/pexels-shiny-diamond-3762563-1.webp" alt="" />
    <img className="absolute bottom-0 left-0" src="/coleos-assets/banners/dark-circle-part.png" alt="" />
    <img className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden lg:block" src="/coleos-assets/banners/arrow-icon.png" alt="" />
    <img className="absolute right-12 top-48 hidden lg:block" src="/coleos-assets/banners/pink-star.png" alt="" />
    <div className="container px-4 mx-auto">
      <div className="relative py-24 md:py-32 lg:py-48 xs:px-8 z-50">
        <div className="flex flex-col items-start">
          <p className="text-rhino-700 mb-6">March 13, 2026 | Macky Clyde</p>
          <a className="px-6 py-3 bg-purple-500 rounded-sm text-sm font-bold text-white hover:bg-purple-600 transition duration-200 clef-button-primary" href="/shop/skincare">Start Buying</a>
          <p className="mt-8 text-rhino-800 font-heading text-2xl md:text-3xl font-semibold">Dehydrated vs Dry Skin: How to Tell the Difference</p>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default ClefEditSectionBanners3;