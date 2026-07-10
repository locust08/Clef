import Image from 'next/image';
import React from 'react';
import type { CategoryPageContent } from '../../lib/cms';

type CategoryVideoSectionProps = {
  content?: CategoryPageContent;
};

const CategoryVideoSection: React.FC<CategoryVideoSectionProps> = ({
  content,
}) => {
  if (!content?.videoUrl) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <a
          className="group relative block overflow-hidden rounded-xl bg-rhino-100 clef-link-highlight"
          href={content.videoUrl}
          rel="noreferrer"
          target="_blank"
        >
          <div className="relative min-h-[320px] md:min-h-[420px]">
            {content.videoThumbnail ? (
              <Image
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                src={content.videoThumbnail.src}
                alt={content.videoThumbnail.alt || content.videoTitle}
                fill
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center text-rhino-300">
                Add a video thumbnail in Payload
              </div>
            )}
            <div className="absolute inset-0 bg-rhino-900/35 transition duration-500 group-hover:bg-rhino-900/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="mb-4 inline-flex rounded-full bg-white/90 px-4 py-1 text-xs font-bold uppercase tracking-widest text-purple-500">
                Watch
              </span>
              <h2 className="max-w-2xl font-heading text-3xl md:text-5xl font-semibold text-white drop-shadow">
                {content.videoTitle || content.title}
              </h2>
              <span className="mt-6 inline-flex h-12 items-center justify-center rounded-sm bg-purple-500 px-6 text-sm font-medium text-white transition duration-200 group-hover:bg-purple-600 clef-button-primary">
                Open video
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default CategoryVideoSection;

