const LanguageSwitcher: React.FC = () => (
  <select className="rounded-sm border border-coolGray-200 bg-white px-3 py-2 text-sm text-rhino-600" defaultValue="en">
    <option value="en">EN</option>
    <option value="ms">MS</option>
  </select>
);

export default LanguageSwitcher;
