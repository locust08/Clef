import Image from 'next/image';
import React from 'react';
import type { VideoSectionContent } from '../../lib/cms';

type IndexSectionInstagramPhotos5Props = {
  content: VideoSectionContent;
};

const IndexSectionInstagramPhotos5: React.FC<IndexSectionInstagramPhotos5Props> = ({
  content,
}) => {
  if (!content.videos.length) {
    return (
      <section className="relative bg-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto lg:max-w-none py-12 text-center">
            <h1 className="text-rhino-500 text-2xl font-semibold uppercase mb-2 font-heading">
              <span className="text-pink-300">#</span>
              <span>{content.sectionTitle}</span>
            </h1>
            <p className="text-rhino-400 text-sm">
              Manual CLEF videos can be added from Payload CMS.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-sm mx-auto lg:max-w-none py-12">
          <h1 className="text-rhino-500 text-2xl font-semibold uppercase mb-2 text-center font-heading">
            <span className="text-pink-300">#</span>
            <span>{content.sectionTitle}</span>
          </h1>
          <p className="text-center text-rhino-400 text-sm mb-12">
            Latest manually curated CLEF videos
          </p>
          <div className="flex flex-wrap -mx-2 lg:-mx-4 -mb-8">
            {content.videos.map((video) => (
              <div
                className="w-full sm:w-1/2 lg:w-1/3 px-2 lg:px-4 mb-8"
                key={video.platform}
              >
                <div className="h-full rounded-xl bg-[#F7F1EA] overflow-hidden shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[9/14] bg-rhino-100">
                    {video.thumbnail ? (
                      <Image
                        className="h-full w-full object-cover"
                        src={video.thumbnail.src}
                        alt={video.thumbnail.alt || video.title}
                        width={video.thumbnail.width ?? 360}
                        height={video.thumbnail.height ?? 560}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-medium text-rhino-300">
                        Add a thumbnail in Payload
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-purple-500">
                      {video.platformLabel}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="mb-3 font-heading text-xl font-semibold text-rhino-600">
                      {video.title}
                    </h2>
                    {video.description ? (
                      <p className="mb-5 line-clamp-3 text-sm text-rhino-400">
                        {video.description}
                      </p>
                    ) : null}
                    <a
                      className="inline-flex h-10 items-center justify-center rounded-sm bg-purple-500 px-4 text-sm font-medium text-white transition duration-200 hover:bg-purple-600 clef-button-primary"
                      href={video.videoUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open video
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSectionInstagramPhotos5;

