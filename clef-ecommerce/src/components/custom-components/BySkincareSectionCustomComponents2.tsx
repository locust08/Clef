import Footer from '../layout/Footer';
import type { FooterContent } from '../../lib/cms';

type BySkincareSectionCustomComponents2Props = {
  footerContent?: FooterContent;
};

const BySkincareSectionCustomComponents2: React.FC<
  BySkincareSectionCustomComponents2Props
> = ({ footerContent }) => <Footer content={footerContent} />;

export default BySkincareSectionCustomComponents2;

