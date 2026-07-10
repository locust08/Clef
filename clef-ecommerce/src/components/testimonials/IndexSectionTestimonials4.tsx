import React from 'react';
import {
  DEFAULT_HOMEPAGE_CONTENT,
  type CustomerReviewContent,
} from '../../lib/cms';

type IndexSectionTestimonials4Props = {
  reviews?: CustomerReviewContent[];
};

const ArrowLeftIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M8.49995 12.8L14.2 18.4C14.6 18.8 15.2 18.8 15.6 18.4C16 18 16 17.4 15.6 17L10.7 12L15.6 7.00005C16 6.60005 16 6.00005 15.6 5.60005C15.4 5.40005 15.2 5.30005 14.9 5.30005C14.6 5.30005 14.4 5.40005 14.2 5.60005L8.49995 11.2C8.09995 11.7 8.09995 12.3 8.49995 12.8Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.54 11.29L9.87998 5.64004C9.78702 5.54631 9.67642 5.47191 9.55456 5.42115C9.4327 5.37038 9.30199 5.34424 9.16998 5.34424C9.03797 5.34424 8.90726 5.37038 8.78541 5.42115C8.66355 5.47191 8.55294 5.54631 8.45998 5.64004C8.27373 5.8274 8.16919 6.08085 8.16919 6.34504C8.16919 6.60922 8.27373 6.86267 8.45998 7.05004L13.41 12.05L8.45998 17C8.27373 17.1874 8.16919 17.4409 8.16919 17.705C8.16919 17.9692 8.27373 18.2227 8.45998 18.41C8.5526 18.5045 8.66304 18.5797 8.78492 18.6312C8.90679 18.6827 9.03767 18.7095 9.16998 18.71C9.30229 18.7095 9.43317 18.6827 9.55505 18.6312C9.67692 18.5797 9.78737 18.5045 9.87998 18.41L15.54 12.76C15.6415 12.6664 15.7225 12.5527 15.7779 12.4262C15.8333 12.2997 15.8619 12.1631 15.8619 12.025C15.8619 11.8869 15.8333 11.7503 15.7779 11.6238C15.7225 11.4973 15.6415 11.3837 15.54 11.29Z"
      fill="currentColor"
    />
  </svg>
);

const ReviewSlide: React.FC<{ review: CustomerReviewContent }> = ({
  review,
}) => (
  <div className="flex-shrink-0 w-full p-5">
    <div className="sm:flex">
      <div className="mb-8 sm:mb-0 sm:mr-12 lg:mr-24">
        <div className="w-20 h-20 relative p-1">
          <div className="absolute w-1/2 h-1/2 right-0 top-0 bg-purple-100 rounded-tr-full" />
          <img
            className="rounded-full z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 object-cover"
            src={review.avatar?.src ?? '/coleos-assets/testimonials/avatar1.png'}
            alt={review.avatar?.alt ?? review.name}
          />
          <div className="absolute w-1/2 h-1/2 left-0 bottom-0 bg-purple-100 rounded-bl-full" />
        </div>
        <h2 className="text-rhino-700 text-2xl font-semibold mb-1 whitespace-nowrap font-heading">
          {review.name}
        </h2>
        <p className="text-lg text-rhino-300">{review.role}</p>
      </div>
      <div className="max-w-md">
        <p className="flex-1 text-lg leading-7 text-rhino-300">
          {review.review}
        </p>
      </div>
    </div>
  </div>
);

const IndexSectionTestimonials4: React.FC<IndexSectionTestimonials4Props> = ({
  reviews = DEFAULT_HOMEPAGE_CONTENT.customerReviews,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const safeReviews = reviews.length
    ? reviews
    : DEFAULT_HOMEPAGE_CONTENT.customerReviews;

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? safeReviews.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === safeReviews.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="px-4 container mx-auto">
        <div className="py-16">
          <div className="flex items-center justify-between gap-8 lg:gap-32">
            <button
              aria-label="Show previous customer review"
              className="hidden md:flex flex-shrink-0 rounded-full w-16 h-16 border-2 border-purple-500 items-center justify-center text-rhino-500 hover:bg-purple-500 hover:text-white transition duration-200 active:scale-95 clef-button-secondary"
              onClick={goToPrevious}
              type="button"
            >
              <ArrowLeftIcon />
            </button>
            <div className="max-w-4xl w-full mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out -m-5"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {safeReviews.map((review) => (
                    <ReviewSlide review={review} key={review.name} />
                  ))}
                </div>
              </div>
            </div>
            <button
              aria-label="Show next customer review"
              className="hidden md:flex flex-shrink-0 rounded-full w-16 h-16 border-2 border-purple-500 items-center justify-center text-rhino-500 hover:bg-purple-500 hover:text-white transition duration-200 active:scale-95 clef-button-secondary"
              onClick={goToNext}
              type="button"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <div className="md:hidden mt-10 text-center">
            <button
              aria-label="Show previous customer review"
              className="inline-flex rounded-full w-16 h-16 mr-4 border-2 border-purple-500 items-center justify-center text-rhino-500 hover:bg-purple-500 hover:text-white transition duration-200 active:scale-95 clef-button-secondary"
              onClick={goToPrevious}
              type="button"
            >
              <ArrowLeftIcon />
            </button>
            <button
              aria-label="Show next customer review"
              className="inline-flex rounded-full w-16 h-16 border-2 border-purple-500 items-center justify-center text-rhino-500 hover:bg-purple-500 hover:text-white transition duration-200 active:scale-95 clef-button-secondary"
              onClick={goToNext}
              type="button"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSectionTestimonials4;
