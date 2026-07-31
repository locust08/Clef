import React from 'react';
import Head from 'next/head';
import FavouriteSectionCustomComponents2 from '../components/custom-components/FavouriteSectionCustomComponents2';
import FavouriteList from '../components/account/FavouriteList';
import FavouriteSectionFooters3 from '../components/footers/FavouriteSectionFooters3';

const Favourite: React.FC = () => (
  <>
    <Head>
      <title>Favourites | CLEF</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/shuffle-for-tailwind.png"
      />
    </Head>
    <FavouriteSectionCustomComponents2 />
    <FavouriteList />
    <FavouriteSectionFooters3 />
  </>
);

export default Favourite;
