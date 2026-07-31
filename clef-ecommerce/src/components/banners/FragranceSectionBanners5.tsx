import React from 'react';
import type { AllProductsFragranceBanner } from '../../lib/cms';

type FragranceSectionBanners5Props = {
  content: AllProductsFragranceBanner;
};

const toEmbedUrl = (videoUrl: string) => {
  try {
    const url = new URL(videoUrl);

    if (url.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${url.pathname.replace(/^\//, '')}`;
    }

    if (url.hostname.endsWith('youtube.com') && url.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
    }
  } catch {
    return videoUrl;
  }

  return videoUrl;
};

const FragranceSectionBanners5: React.FC<FragranceSectionBanners5Props> = ({
  content,
}) => {
  const embedUrl = toEmbedUrl(content.videoUrl);

    return (
        <section className="relative overflow-hidden py-6">
  <div className="container px-4 mx-auto">
    <div className="w-full bg-coolPink-400 rounded-xl relative py-12 px-8 overflow-hidden">
      <img className="absolute bottom-0 left-0" src="/coleos-assets/banners/yellow-circle-part.png" alt="" />
      <img className="absolute right-12 top-12 hidden lg:block" src="/coleos-assets/banners/pink-star.png" alt="" />
      <div className="relative z-50">
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
          <div className="py-1 px-3 bg-white rounded-xl uppercase text-xs text-rhino-700 font-bold tracking-widest mb-6 mx-auto">{content.eyebrow}</div>
          <h1 className="text-rhino-800 font-heading text-4xl sm:text-5xl font-semibold mb-2 text-center">{content.title}</h1>
          <p className="text-rhino-700 mb-8 text-center">{content.description}</p>
          <div className="w-full relative rounded-xl overflow-hidden shadow-2xl video-wrapper bg-rhino-800" style={{aspectRatio: '16 / 9'}}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedUrl}
              title="CLEF Fragrance ritual video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    );
};

export default FragranceSectionBanners5;
