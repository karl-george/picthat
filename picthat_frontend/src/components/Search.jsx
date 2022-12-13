import { useState, useEffect } from 'react';
import { client } from '../client';
import { postsQuery, searchQuery } from '../utils/queries';

import Spinner from './Spinner';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // If user has entered a search string populate with relevant posts
    // else just show standard posts
    if (searchTerm) {
      setLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(postsQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return <div>{loading && <Spinner msg='Searching for posts' />}</div>;
};

export default Search;
