import React from 'react';

const _404SectionSignIn1: React.FC = () => {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-rhino-50">
  <div className="absolute inset-0">
    <img className="w-full h-full object-cover opacity-20" src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80" alt="" />
  </div>
  <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-32 text-center">
    <p className="uppercase text-rhino-300 text-xs font-bold tracking-widest mb-2">ERROR 404</p>
    <h1 className="font-heading font-semibold text-6xl md:text-8xl text-rhino-700 mb-6">404</h1>
    <h2 className="font-heading font-semibold text-3xl md:text-4xl text-rhino-700 mb-4">Page not found</h2>
    <p className="text-rhino-300 text-base mb-10 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved. Let's get you back to great skin.</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"><a className="rounded-sm py-3 px-8 bg-purple-500 shadow-md text-white font-medium text-sm block text-center hover:bg-purple-600 transition duration-200 clef-button-primary" href="/">Back to homepage</a><a className="rounded-sm py-3 px-8 bg-pink-400 shadow-md text-white font-medium text-sm block text-center hover:bg-pink-500 transition duration-200 clef-button-primary" href="/shop/skincare">Shop skincare</a></div>
    <div className="max-w-md mx-auto">
      <div className="flex flex-col gap-1">
        <label className="text-coolGray-700 text-sm font-medium text-left">Search product</label>
        <div className="flex gap-2">
          <input className="py-3 px-4 rounded-sm border border-coolGray-200 bg-white w-full outline-none focus:ring-1 ring-indigo-400" type="text" placeholder="Search for a product..." />
          <button className="rounded-sm py-3 px-6 bg-rhino-700 text-white font-medium text-sm hover:bg-rhino-800 transition duration-200 clef-icon-button clef-button-primary">Search</button>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default _404SectionSignIn1;