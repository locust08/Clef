import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import SearchSectionCustomComponents1 from '../components/custom-components/SearchSectionCustomComponents1';
import ProductGrid from '../components/product/ProductGrid';
import {
  searchProducts,
  type StorefrontProduct,
} from '../lib/medusa-products';
import { setNoStore } from '../lib/category-page';

type SearchProps = {
  query: string;
  products: StorefrontProduct[];
  count: number;
  medusaError: string | null;
};

const Search: React.FC<SearchProps> = ({
  query,
  products,
  count,
  medusaError,
}) => {
  const [searchValue, setSearchValue] = React.useState(query);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmed = searchValue.trim();

      if (trimmed && trimmed !== query) {
        window.history.replaceState(null, '', `/search?q=${encodeURIComponent(trimmed)}`);
      }
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query, searchValue]);

  return (
    <>
      <Head>
        <title>{query ? `Search ${query}` : 'Search'} | CLEF</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/shuffle-for-tailwind.png"
        />
      </Head>
      <SearchSectionCustomComponents1 />
      <section className="pt-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="clef-page-heading font-heading text-2xl font-semibold">
                {query ? `Found ${count} result${count === 1 ? '' : 's'} for` : 'Search CLEF'}
              </h1>
              <p className="text-slate-400">
                {query || 'Skincare, personal care and fragrances'}
              </p>
            </div>
            <form action="/search" className="flex w-full max-w-md gap-2">
              <input
                className="min-w-0 flex-1 rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                name="q"
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search products"
                type="search"
                value={searchValue}
              />
              {searchValue && (
                <button
                  className="rounded-sm border border-gray-200 px-4 py-3 text-sm text-rhino-500 hover:bg-gray-100 clef-button-secondary"
                  onClick={() => setSearchValue('')}
                  type="button"
                >
                  Clear
                </button>
              )}
              <button
                className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white hover:bg-purple-600 clef-button-primary"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          {medusaError ? (
            <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
              <h2 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
                Search is unavailable
              </h2>
              <p className="text-sm text-rhino-400">{medusaError}</p>
            </div>
          ) : query ? (
            <ProductGrid
              emptyMessage="No products matched your search."
              products={products}
            />
          ) : (
            <div className="rounded-xl border border-coolGray-200 bg-white p-8 text-center">
              <h2 className="mb-2 font-heading text-2xl font-semibold text-rhino-700">
                Start with a product name, handle, or category.
              </h2>
              <p className="text-sm text-rhino-400">
                Press Enter to open the full results page.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context,
) => {
  setNoStore(context);
  const queryParam = context.query.q;
  const query = (Array.isArray(queryParam) ? queryParam[0] : queryParam ?? '').trim();

  if (!query) {
    return {
      props: {
        count: 0,
        medusaError: null,
        products: [],
        query,
      },
    };
  }

  try {
    const result = await searchProducts(query);

    return {
      props: {
        count: result.count,
        medusaError: null,
        products: result.products,
        query,
      },
    };
  } catch (error) {
    return {
      props: {
        count: 0,
        medusaError:
          error instanceof Error
            ? error.message
            : 'Unable to search products from Medusa.',
        products: [],
        query,
      },
    };
  }
};

export default Search;
