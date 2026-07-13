import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type {
  CmsImage,
  HomepageContent,
  HomepagePromotionBanner,
} from '../../lib/cms';

const AUTO_CHANGE_MS = 4500;
const TRANSITION_MS = 700;

type PromoSlide = {
  image: string;
  alt: string;
};

const leftPromoSlides: PromoSlide[] = [
  {
    image: '/coleos-assets/banners/home-promo-facial-serums.png',
    alt: 'Facial Serums promotion',
  },
  {
    image: '/coleos-assets/banners/home-promo-hydrating-masks.png',
    alt: 'Hydrating Masks promotion',
  },
];

const rightPromoSlides: PromoSlide[] = [
  {
    image: '/coleos-assets/banners/home-promo-mega-saver.png',
    alt: 'Mega Saver promotion',
  },
  {
    image: '/coleos-assets/banners/home-promo-daily-essentials.png',
    alt: 'Daily Essentials promotion',
  },
];

type PromoCarouselCardProps = {
  slides: PromoSlide[];
};

const PromoCarouselCard: React.FC<PromoCarouselCardProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_CHANGE_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length]);

  return (
    <div
      className="relative h-[236px] overflow-hidden rounded-xl bg-[#F7F1EA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <img
            key={slide.image}
            className={`absolute inset-0 w-full h-full rounded-xl object-cover transition-all ease-out ${
              isActive
                ? 'opacity-100 translate-x-0 scale-105'
                : 'opacity-0 translate-x-6 scale-100'
            }`}
            src={slide.image}
            alt={slide.alt}
            style={{
              transitionDuration: `${TRANSITION_MS}ms`,
              animation: isActive && !isPaused
                ? `promoSlowZoom ${AUTO_CHANGE_MS}ms ease-out forwards`
                : undefined,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes promoSlowZoom {
          from {
            transform: translateX(0) scale(1);
          }
          to {
            transform: translateX(0) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

type CmsPromotionBannerCardProps = {
  banner: HomepagePromotionBanner;
};

const CmsPromotionBannerCard: React.FC<CmsPromotionBannerCardProps> = ({
  banner,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = banner.images;

  useEffect(() => {
    if (images.length < 2 || isPaused) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTO_CHANGE_MS);

    return () => window.clearInterval(intervalId);
  }, [images.length, isPaused]);

  useEffect(() => {
    if (activeIndex >= images.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, images.length]);

  const activeImage = images[activeIndex] ?? images[0];
  const aspectRatio = activeImage
    ? `${activeImage.width ?? 632} / ${activeImage.height ?? 316}`
    : '2 / 1';

  return (
    <a
      aria-label={banner.title || 'Promotion'}
      className="relative block w-full overflow-hidden rounded-xl bg-[#F7F1EA] clef-link-highlight group transition-[aspect-ratio] duration-700"
      href={banner.href}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ aspectRatio }}
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <Image
            key={image.src}
            alt={isActive ? image.alt || banner.title : ''}
            className={`absolute inset-0 h-full w-full object-contain transition-all ease-out ${
              isActive
                ? 'opacity-100 scale-100'
                : 'pointer-events-none opacity-0 scale-[1.02]'
            }`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            src={image.src}
            style={{ transitionDuration: `${TRANSITION_MS}ms` }}
          />
        );
      })}
    </a>
  );
};

type IndexSectionHeaders1Props = {
  content: HomepageContent;
};

const imageSize = (image: CmsImage | null, fallback: number) =>
  image ? image.width ?? fallback : fallback;

const IndexSectionHeaders1: React.FC<IndexSectionHeaders1Props> = ({
  content,
}) => {
  const activePromotionBanners = content.promotionBanners.filter(
    (banner) => banner.isActive,
  );

  return (
        <section className="relative overflow-hidden">
  <div className="hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
    <div className="fixed inset-0 bg-purple-800 opacity-70" />
    <nav className="relative flex flex-col pt-12 pb-6 px-8 w-full h-full bg-white overflow-y-auto">
      <div className="flex mb-12 items-center">
        <a className="inline-block mr-auto clef-link-highlight" href="/">
          <img className="h-8" src="/coleos-assets/logos/logo-coleos-2.svg" alt="" />
        </a>
        <button className="clef-icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" id="svg_3ddd1d818755a7037cf896434eebf83c" width={24} height={24} viewBox="0 0 24 24" fill="none" />
        </button>
      </div>
      <div className="flex w-full max-w-xs items-center px-6 border border-coolGray-200 rounded-full">
        <input className="h-12 w-full bg-transparent border-0 text-sm text-coolGray-500 placeholder-coolGray-500 outline-none" type="search" placeholder="Search..." />
        <button className="inline-block ml-auto text-coolGray-400 hover:text-rhino-500 clef-icon-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" id="svg_bbf318077f70ea840119eb16035dbcc2" width={14} height={14} viewBox="0 0 14 14" fill="none" />
        </button>
      </div>
      <div className="py-12 mb-auto">
        <ul className="flex-col">
          <li className="mb-3">
            <a className="group mr-6 inline-flex items-center text-base clef-link-highlight" href="#">
              <span className="mr-2 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" id="svg_7153d439647c30729c8ca9ac10f27afe" width={16} height={16} viewBox="0 0 16 16" fill="none" />
              </span>
              <span className="font-semibold text-rhino-700">Login</span>
            </a>
          </li>
          <li className="mb-3">
            <a className="group mr-6 inline-flex items-center text-base clef-link-highlight" href="#">
              <span className="mr-2 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" id="svg_fdd8e11ea82ef0f6708c7eaed6406bbe" width={16} height={16} viewBox="0 0 16 16" fill="none" />
              </span>
              <span className="font-semibold text-rhino-700">Favorite</span>
            </a>
          </li>
          <li className="mb-12">
            <a className="inline-flex items-center text-base text-purple-400 hover:text-purple-200 clef-link-highlight" href="#">
              <span className="mr-2 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" id="svg_e17ebed2719e6172144e22eed2b983f9" width={18} height={17} viewBox="0 0 18 17" fill="none" />
              </span>
              <span className="font-semibold text-rhino-700">Cart</span>
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="/">
              <span className="mr-2">Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_7c8b93e4d600179854b84d406946abad" width={16} height={16} viewBox="0 0 16 16" fill="none" />
            </a>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="#">
              <span className="mr-2">Pages</span>
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_7c8b93e4d600179854b84d406946abad" width={16} height={16} viewBox="0 0 16 16" fill="none" />
            </a>
          </li>
          <li className="mb-4"><a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="/shop/skincare">Products</a></li>
          <li className="mb-4"><a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="#">Blog</a></li>
          <li className="mb-4"><a className="flex items-center text-base font-bold text-rhino-700 clef-link-highlight" href="/shop/skincare">Shop</a></li>
          <li><a className="flex items-center text-base font-bold text-rhino-700 hover:text-rhino-400 clef-link-highlight" href="#">Contact</a></li>
        </ul>
      </div>
      <div>
        <p className="text-center text-sm text-coolGray-400">Coleos Shuffle 2026</p>
      </div>
    </nav>
  </div>
  <div className="relative overflow-hidden bg-[#F7F1EA]">
    <div className="relative container mx-auto px-4">
      <button className="hidden md:inline-block absolute top-1/2 left-0 transform -translate-y-1/2 text-rhino-500 hover:text-rhino-900 transition duration-200 z-50 clef-icon-button">
        <svg xmlns="http://www.w3.org/2000/svg" id="svg_786c8803d69ba7bc2dc4dccf7ad9e863" width={48} height={48} viewBox="0 0 48 48" fill="none" />
      </button>
      <button className="hidden md:inline-block absolute top-1/2 right-0 transform -translate-y-1/2 text-rhino-500 hover:text-rhino-900 transition duration-200 z-50 clef-icon-button">
        <svg xmlns="http://www.w3.org/2000/svg" id="svg_5de9969d7ae2ef73bad49dec76734248" width={48} height={48} viewBox="0 0 48 48" fill="none" />
      </button>
      <div className="relative md:px-8 lg:px-10 xl:px-12">
        {content.heroImage ? (
          <Image
            className="absolute bottom-0 right-0 -mr-16 md:-mr-12 lg:-mr-8 w-80 md:w-[450px] lg:w-[590px] xl:w-[700px] max-w-none object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.015]"
            src={content.heroImage.src}
            alt={content.heroImage.alt}
            width={imageSize(content.heroImage, 700)}
            height={content.heroImage.height ?? imageSize(content.heroImage, 700)}
            priority
          />
        ) : null}
        <div className="max-w-sm md:max-w-2xl lg:max-w-7xl mx-auto pt-20 pb-32 md:pb-44 lg:pb-48 relative z-20">
          <div className="max-w-xl lg:max-w-2xl hero-copy">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out -m-5" style={{transform: 'translateX(-0px)'}}>
                <div className="flex-shrink-0 w-full p-5">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-rhino-500 font-semibold text-left leading-tight mb-3">{content.heroTitle}</h1>
                  <p className="text-rhino-400 text-left text-base md:text-lg mb-6">{content.heroSubtitle}</p>
                </div>
                <div className="flex-shrink-0 w-full p-5">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-rhino-500 font-semibold text-left leading-tight mb-3">Nourish Your Skin Daily.</h1>
                  <p className="text-rhino-400 text-left text-base md:text-lg mb-6">Explore Limitless Products for Radiant Beauty.</p>
                </div>
                <div className="flex-shrink-0 w-full p-5">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-rhino-500 font-semibold text-left leading-tight mb-3">Reveal Your Natural Glow.</h1>
                  <p className="text-rhino-400 text-left text-base md:text-lg mb-6">Discover an Array of Serums, Creams &amp; Cleansers.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-8">
              <a className="inline-flex h-12 py-1 px-6 items-center text-center text-sm font-medium text-white rounded-sm bg-purple-500 hover:bg-purple-600 transition duration-200 clef-button-primary" href={content.heroButtonHref}>{content.heroButtonLabel}</a>
              <a className="flex items-center gap-2 group clef-link-highlight" href="#">
                <span className="text-sm text-rhino-500 font-medium group-hover:text-rhino-600 transition duration-200">Learn more</span>
                <div className="text-rhino-500 group-hover:text-rhino-600 transition duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" id="svg_7d98256604a55c4e271128df9b93fe2f" width={24} height={24} viewBox="0 0 24 24" fill="none" />
                </div>
              </a>
            </div>
          </div>
          <div className="relative md:hidden mt-10">
            <button className="inline-block text-rhino-500 hover:text-rhino-900 transition duration-200 clef-icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_786c8803d69ba7bc2dc4dccf7ad9e863" width={48} height={48} viewBox="0 0 48 48" fill="none" />
            </button>
            <button className="inline-block text-rhino-500 hover:text-rhino-900 transition duration-200 clef-icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" id="svg_5de9969d7ae2ef73bad49dec76734248" width={48} height={48} viewBox="0 0 48 48" fill="none" />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero-copy {
          animation: heroCopyIn 680ms ease-out both;
        }

        @keyframes heroCopyIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-copy {
            animation: none;
          }
        }
      `}</style>
    </div>
  </div>
  <div className="pt-8 pb-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        {activePromotionBanners.length ? (
          activePromotionBanners.map((banner) => (
            <div className="w-full sm:w-1/2 p-4" key={`${banner.title}-${banner.href}`}>
              <CmsPromotionBannerCard banner={banner} />
            </div>
          ))
        ) : (
          <>
            <div className="w-full sm:w-1/2 p-4">
              <PromoCarouselCard slides={leftPromoSlides} />
            </div>
            <div className="w-full sm:w-1/2 p-4">
              <PromoCarouselCard slides={rightPromoSlides} />
            </div>
          </>
        )}
      </div>
    </div>
  </div>
</section>


    );
};

export default IndexSectionHeaders1;

