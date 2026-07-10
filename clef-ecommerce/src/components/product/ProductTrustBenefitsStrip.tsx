import React from 'react';

type ProductTrustBenefit = {
  title: string;
  description: string;
  iconPath: string;
};

type ProductTrustBenefitsStripProps = {
  className?: string;
};

const productTrustBenefits: ProductTrustBenefit[] = [
  {
    title: 'Curated For Daily Care',
    description: 'Skincare, body care, and scent essentials',
    iconPath:
      'M12 2.5L14.7 8.1L20.8 9L16.4 13.3L17.4 19.4L12 16.5L6.6 19.4L7.6 13.3L3.2 9L9.3 8.1L12 2.5Z',
  },
  {
    title: 'Gentle Everyday Focus',
    description: 'Comfort-first products for your routine',
    iconPath:
      'M12 21.5C9.8 19.4 7.9 17.6 6.5 16C5.1 14.4 4.4 12.8 4.4 11.1C4.4 8.4 6.3 6.3 8.8 6.3C10.2 6.3 11.4 7 12 8.1C12.6 7 13.8 6.3 15.2 6.3C17.7 6.3 19.6 8.4 19.6 11.1C19.6 12.8 18.9 14.4 17.5 16C16.1 17.6 14.2 19.4 12 21.5Z',
  },
  {
    title: 'Clear Product Guidance',
    description: 'Ingredients and usage made easier',
    iconPath:
      'M6 3.5H18C18.6 3.5 19 3.9 19 4.5V19.5C19 20.1 18.6 20.5 18 20.5H6C5.4 20.5 5 20.1 5 19.5V4.5C5 3.9 5.4 3.5 6 3.5ZM8 8H16M8 12H16M8 16H13',
  },
  {
    title: 'Support Before You Buy',
    description: 'Help choosing the right CLEF routine',
    iconPath:
      'M4 13C4 8.6 7.6 5 12 5C16.4 5 20 8.6 20 13V18C20 18.6 19.6 19 19 19H17C15.9 19 15 18.1 15 17V15C15 13.9 15.9 13 17 13H18C18 9.7 15.3 7 12 7C8.7 7 6 9.7 6 13H7C8.1 13 9 13.9 9 15V17C9 18.1 8.1 19 7 19H5C4.4 19 4 18.6 4 18V13Z',
  },
];

const ProductTrustBenefitsStrip: React.FC<ProductTrustBenefitsStripProps> = ({
  className = '',
}) => (
  <div className={`container mx-auto px-4 ${className}`.trim()}>
    <div className="flex items-center flex-wrap -mx-4 pb-6">
      {productTrustBenefits.map((benefit) => (
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4" key={benefit.title}>
          <div className="flex items-center lg:justify-center gap-4">
            <div className="flex-shrink-0 bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={benefit.iconPath}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <div>
              <p className="text-rhino-500 font-semibold">{benefit.title}</p>
              <p className="text-rhino-400 text-sm font-medium">
                {benefit.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductTrustBenefitsStrip;
