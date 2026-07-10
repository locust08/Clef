import Link from 'next/link';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';

type HeaderProps = {
  isLoggedIn?: boolean;
  onCartClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, onCartClick }) => (
  <header className="relative z-10 bg-white">
    <nav className="flex items-center justify-between gap-4 px-6 py-4">
      <Link className="font-heading text-2xl font-semibold text-rhino-700 clef-link-highlight" href="/">
        CLEF
      </Link>
      <div className="hidden lg:flex items-center gap-8">
        <Link className="font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link" href="/shop/skincare">Skincare</Link>
        <Link className="font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link" href="/shop/personal-care">Personal Care</Link>
        <Link className="font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link" href="/shop/fragrance">Fragrances</Link>
        <Link className="font-medium text-rhino-700 hover:text-rhino-400 clef-nav-link" href="/clef-edit">CLEF Edit</Link>
      </div>
      <div className="hidden xl:block">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Link className="text-rhino-600 hover:text-purple-500 clef-link-highlight" href={isLoggedIn ? '/account' : '/login'}>
          Account
        </Link>
        <button className="text-rhino-600 hover:text-purple-500 clef-icon-button" onClick={onCartClick} type="button">
          Cart
        </button>
      </div>
    </nav>
  </header>
);

export default Header;
