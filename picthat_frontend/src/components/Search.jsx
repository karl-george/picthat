import { useState } from 'react';

import Spinner from './Spinner';

const Search = ({ searchTerm, setSearchTerm, user }) => {
  const [loading, setLoading] = useState(true);

  return <div>{loading && <Spinner msg='Searching for posts' />}</div>;
};

export default Search;
