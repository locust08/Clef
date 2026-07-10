import React from 'react';

const categoryCards = [
  {
    label: 'Skincare',
    href: '/all-skincare',
    ariaLabel: 'Shop all skincare',
    image: '/coleos-assets/banners/homepage-category-skincare.png',
  },
  {
    label: 'Personal Care',
    href: '/all-personal-care',
    ariaLabel: 'Shop all personal care',
    image: '/coleos-assets/banners/homepage-category-personal-care.png',
  },
  {
    label: 'Fragrance',
    href: '/fragrance',
    ariaLabel: 'Shop fragrance',
    image: '/coleos-assets/banners/homepage-category-fragrance.png',
  },
];

const IndexSectionBanners2: React.FC = () => {
    return (
        <section className="relative overflow-hidden p-6">
  <div className="flex flex-wrap">
    {categoryCards.map((card) => (
      <div className="w-full lg:w-1/3 p-4" key={card.label}>
        <a className="relative block group overflow-hidden rounded-xl clef-link-highlight" href={card.href} aria-label={card.ariaLabel}>
          <div className="relative h-72 sm:h-80 lg:h-[316px] overflow-hidden rounded-xl bg-rhino-100">
            <img className="h-full w-full rounded-xl object-cover scale-105 blur-[2px] brightness-75 saturate-90 transition duration-700 ease-out group-hover:scale-110 group-hover:blur-0 group-hover:brightness-110 group-hover:saturate-110 group-focus-visible:scale-110 group-focus-visible:blur-0 group-focus-visible:brightness-110 group-focus-visible:saturate-110" src={card.image} alt="" />
            <div className="absolute inset-0 rounded-xl bg-rhino-900/35 transition duration-700 ease-out group-hover:bg-rhino-900/10 group-focus-visible:bg-rhino-900/10" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 transition duration-700 ease-out group-hover:ring-white/45 group-focus-visible:ring-white/45" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center text-white drop-shadow-lg transition duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105">{card.label}</h2>
          </div>
        </a>
      </div>
    ))}
  </div>
</section>


    );
};

export default IndexSectionBanners2;
