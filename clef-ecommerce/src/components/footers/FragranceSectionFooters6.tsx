import Footer from '../layout/Footer';
import type { FooterContent } from '../../lib/cms';

type FragranceSectionFooters6Props = {
  content?: FooterContent;
};

const FragranceSectionFooters6: React.FC<FragranceSectionFooters6Props> = ({
  content,
}) => <Footer content={content} />;

export default FragranceSectionFooters6;

