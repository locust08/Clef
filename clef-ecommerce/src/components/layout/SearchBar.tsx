const SearchBar: React.FC = () => (
  <form action="/search" className="flex w-full max-w-md items-center gap-2">
    <input
      className="w-full rounded-sm border border-coolGray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
      name="q"
      placeholder="Search CLEF"
      type="search"
    />
    <button className="rounded-sm bg-purple-500 px-4 py-3 text-sm font-medium text-white hover:bg-purple-600 clef-button-primary" type="submit">
      Search
    </button>
  </form>
);

export default SearchBar;
