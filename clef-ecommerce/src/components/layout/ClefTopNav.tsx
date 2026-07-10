import React from 'react';
import {
  categoryConfig,
  getSubcategoryHref,
  type CategoryConfig,
} from '../../data/category-config';
import HeaderIconActions from './HeaderIconActions';

const LOGO_SRC =
  'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/CLEF-LOGO-FINAL-90be4a24-9d08-4222-ab18-073e39e89319-100x.avif';

const categoryNavItems = [
  categoryConfig.skincare,
  categoryConfig['personal-care'],
  categoryConfig.fragrance,
];

const simpleNavItems = [
  { label: 'CLEF Edit', href: '/clef-edit' },
];

const HamburgerIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 12H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 6H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 18L18 6M6 6L18 18"
      stroke="#252E4A"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DesktopCategoryItem: React.FC<{ item: CategoryConfig }> = ({ item }) => (
  <div className="group relative inline-block mr-10">
    <a
      className="inline-block font-base font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link"
      href={item.parentHref}
    >
      {item.displayName === 'Fragrance' ? 'Fragrances' : item.displayName}
    </a>
    <div className="invisible absolute left-1/2 top-full z-50 mt-2 min-w-[220px] -translate-x-1/2 rounded-md border border-coolGray-100 bg-white py-3 text-left opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
      {item.subcategories.map((subcategory) => (
        <a
          className="block px-4 py-2 text-sm font-medium text-rhino-700 hover:bg-purple-50 hover:text-rhino-500 focus:bg-purple-50 focus:text-rhino-500 focus:outline-none clef-link-highlight"
          href={getSubcategoryHref(item.slug, subcategory.slug)}
          key={subcategory.slug}
        >
          {subcategory.displayName}
        </a>
      ))}
    </div>
  </div>
);

const MobileCategoryLinks: React.FC<{ item: CategoryConfig }> = ({ item }) => (
  <div className="flex flex-col gap-3">
    <a
      className="font-base font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link"
      href={item.parentHref}
    >
      {item.displayName === 'Fragrance' ? 'Fragrances' : item.displayName}
    </a>
    <div className="ml-4 flex flex-col gap-2">
      {item.subcategories.map((subcategory) => (
        <a
          className="text-sm font-medium text-rhino-500 hover:text-rhino-700 clef-link-highlight"
          href={getSubcategoryHref(item.slug, subcategory.slug)}
          key={subcategory.slug}
        >
          {subcategory.displayName}
        </a>
      ))}
    </div>
  </div>
);

const ClefTopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <section className="relative z-40 overflow-visible">
      <nav className="relative flex items-center justify-between h-20 py-4 px-6 bg-white">
        <a className="inline-block clef-link-highlight" href="/">
          <img src={LOGO_SRC} alt="CLEF Logo" />
        </a>
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          {categoryNavItems.map((item) => (
            <DesktopCategoryItem item={item} key={item.slug} />
          ))}
          {simpleNavItems.map((item, index) => (
            <a
              className={`inline-block font-base font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link ${
                index < simpleNavItems.length - 1 ? 'mr-10' : ''
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex pl-6 items-center">
          <HeaderIconActions />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            className="lg:hidden text-coolGray-400 hover:text-coolGray-600 clef-icon-button"
            onClick={() => setIsMenuOpen(true)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 bg-purple-800 opacity-70"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="relative flex flex-col pt-12 pb-6 px-8 w-full h-full bg-white overflow-y-auto">
            <div className="flex mb-12 items-center">
              <a className="inline-block mr-auto clef-link-highlight" href="/">
                <img className="h-8" src={LOGO_SRC} alt="CLEF Logo" />
              </a>
              <button
                type="button"
                aria-label="Close menu"
                className="clef-icon-button"
                onClick={() => setIsMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {categoryNavItems.map((item) => (
                <MobileCategoryLinks item={item} key={item.slug} />
              ))}
              {simpleNavItems.map((item) => (
                <a
                  className="font-base font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </section>
  );
};

export default ClefTopNav;
