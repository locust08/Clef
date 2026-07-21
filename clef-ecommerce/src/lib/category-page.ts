import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  type CategoryConfig,
  type SubcategoryConfig,
  categoryConfig,
  getCategoryConfig,
  getSubcategoryConfig,
} from '../data/category-config';
import {
  getPersonalCareHeaderProducts,
  getProductsByCategoryHandle,
  getSkincareHeaderProducts,
  type StorefrontProduct,
} from './medusa-products';
import {
  getAllProductsPageContent,
  getCategoryPageContent,
  getFooterContent,
  type AllProductsPageContent,
  type CategoryPageContent,
  type FooterContent,
} from './cms';

export type CategoryPageProductsProps = {
  categoryContent: AllProductsPageContent;
  footerContent: FooterContent;
  products: StorefrontProduct[];
  headerProducts?: StorefrontProduct[];
  medusaError: string | null;
};

export type SubcategoryPageProductsProps = {
  categoryConfig: CategoryConfig;
  categoryContent: CategoryPageContent;
  footerContent: FooterContent;
  subcategoryConfig: SubcategoryConfig;
  products: StorefrontProduct[];
  medusaError: string | null;
};

export type ByHandlePageProps =
  | (CategoryPageProductsProps & {
      handle: string;
      pageType: 'category';
    })
  | (SubcategoryPageProductsProps & {
      handle: string;
      pageType: 'subcategory';
    });

export const parentCategoryHandles = Object.keys(categoryConfig);

export const findParentCategoryForHandle = (handle: string) => {
  for (const config of Object.values(categoryConfig)) {
    if (config.subcategories.some((subcategory) => subcategory.slug === handle)) {
      return config;
    }
  }

  return null;
};

export const setNoStore = (context: GetServerSidePropsContext) => {
  context.res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  );
};

export const getCategoryProductsProps = async (
  handle: string,
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<CategoryPageProductsProps>> => {
  setNoStore(context);

  if (!getCategoryConfig(handle)) {
    return { notFound: true };
  }

  const [categoryContent, footerContent] = await Promise.all([
    getAllProductsPageContent(handle as 'skincare' | 'personal-care' | 'fragrance'),
    getFooterContent(),
  ]);

  try {
    const [products, headerProducts] = await Promise.all([
      getProductsByCategoryHandle(handle, {
        includeDescendants: true,
      }),
      handle === 'skincare'
        ? getSkincareHeaderProducts()
        : handle === 'personal-care'
          ? getPersonalCareHeaderProducts()
          : Promise.resolve([]),
    ]);

    return {
      props: {
        categoryContent,
        footerContent,
        products,
        headerProducts,
        medusaError: null,
      },
    };
  } catch (error) {
    return {
      props: {
        categoryContent,
        footerContent,
        products: [],
        headerProducts: [],
        medusaError:
          error instanceof Error
            ? error.message
            : 'Unable to load products from Medusa.',
      },
    };
  }
};

export const getSubcategoryProductsProps = async (
  category: string,
  subcategory: string,
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<SubcategoryPageProductsProps>> => {
  setNoStore(context);

  const categoryConfig = getCategoryConfig(category);
  const subcategoryConfig = getSubcategoryConfig(category, subcategory);

  if (!categoryConfig || !subcategoryConfig) {
    return { notFound: true };
  }

  const [categoryContent, footerContent] = await Promise.all([
    getCategoryPageContent(subcategory),
    getFooterContent(),
  ]);

  try {
    const products = await getProductsByCategoryHandle(subcategory);

    return {
      props: {
        categoryConfig,
        categoryContent,
        footerContent,
        subcategoryConfig,
        products,
        medusaError: null,
      },
    };
  } catch (error) {
    return {
      props: {
        categoryConfig,
        categoryContent,
        footerContent,
        subcategoryConfig,
        products: [],
        medusaError:
          error instanceof Error
            ? error.message
            : 'Unable to load products from Medusa.',
      },
    };
  }
};

export const getByHandleProductsProps = async (
  handle: string,
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<
    CategoryPageProductsProps | SubcategoryPageProductsProps
  >
> => {
  const parentConfig = getCategoryConfig(handle);

  if (parentConfig) {
    return getCategoryProductsProps(handle, context);
  }

  const childParentConfig = findParentCategoryForHandle(handle);

  if (!childParentConfig) {
    return { notFound: true };
  }

  return getSubcategoryProductsProps(childParentConfig.slug, handle, context);
};

export const getByHandlePageProps = async (
  handle: string,
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ByHandlePageProps>> => {
  const result = await getByHandleProductsProps(handle, context);

  if ('notFound' in result || 'redirect' in result) {
    return result;
  }

  const pageType = getCategoryConfig(handle) ? 'category' : 'subcategory';

  return {
    props: {
      ...result.props,
      handle,
      pageType,
    } as ByHandlePageProps,
  };
};

