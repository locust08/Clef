import Footer from '../layout/Footer';
import type { FooterContent } from '../../lib/cms';

type IndexSectionFooters6Props = {
  content?: FooterContent;
};

const IndexSectionFooters6: React.FC<IndexSectionFooters6Props> = ({
  content,
}) => <Footer content={content} />;

export default IndexSectionFooters6;

