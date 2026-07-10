import type { GetServerSideProps } from 'next';
import ByHandlePage, {
  type ByHandlePageProps,
} from '../components/templates/ByHandlePage';
import { getByHandlePageProps } from '../lib/category-page';

export const getServerSideProps: GetServerSideProps<ByHandlePageProps> = async (
  context,
) => getByHandlePageProps('facial-mask', context);

export default ByHandlePage;
